import * as React from 'jsx-dom'

import adapter from '@/adapter'

import { createEditor } from '@/editor/codemirror'
import type { PageData } from '@/shared/type'
import { getGlobalData } from '@/utils/data'
import { debounce, throttle } from '@/utils/debounce'
import { getDocAssets, getLocalUploadImages, travelDoc } from '@/utils/doc'
import { useAttrRef } from '@/utils/dom'
import { createSaver } from '@/utils/saver'
import {
  toFilename,
  toUniqueFilename,
  type JSONContent,
} from '@/utils/transform'
import config from 'urodele.config'
import { useDialog } from '../Dialog'
import toast from '../Toast'

const { readPageByPath, writePage, deletePageByPath } = adapter

export const mount = async (selector: string, operationSelector: string) => {
  const root = document.querySelector<HTMLElement>(selector)
  const opRoot = document.querySelector<HTMLElement>(operationSelector)

  if (!root || !opRoot) return

  const url = new URL(location.href)
  const isCreate = url.searchParams.has('new')
  const pagePath = url.searchParams.get('path') ?? undefined

  const globalData = await getGlobalData()

  const saver = createSaver()

  const { editor, initial } = await (async () => {
    const saved = await saver.read(pagePath)
    const { data: savedPageData } =
      saved && typeof saved === 'object' && 'data' in saved
        ? await transformSaved(saved as SavedData)
        : { data: undefined }

    const pageDat = await (async () => {
      if (savedPageData) {
        return savedPageData as PageData
      }
      if (pagePath) {
        return readPageByPath(pagePath)
      }
    })()

    // 创建图片上传函数
    const uploadImage = async (file: File): Promise<string> => {
      // 创建本地 blob URL 用于预览
      const blobUrl = URL.createObjectURL(file)
      return blobUrl
    }

    const editor = createEditor(root, pageDat?.content ?? '', uploadImage)

    // 大纲面板逻辑
    const outlineList = document.querySelector('.outline-list') as HTMLElement

    const extractHeadings = (markdown: string) => {
      const lines = markdown.split('\n')
      const headings: Array<{ level: number; text: string; id: string }> = []
      let idCounter = 0

      lines.forEach((line) => {
        const match = line.match(/^(#{1,6})\s+(.+)$/)
        if (match) {
          const level = match[1].length
          const text = match[2].trim()
          const id = `heading-${idCounter++}`
          headings.push({ level, text, id })
        }
      })

      return headings
    }

    const updateOutline = (markdown: string) => {
      if (!outlineList) return

      const headings = extractHeadings(markdown)
      outlineList.innerHTML = ''

      if (headings.length === 0) {
        const emptyDiv = document.createElement('div')
        emptyDiv.className = 'text-sm'
        emptyDiv.style.color = 'var(--color-t-l)'
        emptyDiv.textContent = '暂无标题'
        outlineList.appendChild(emptyDiv)
      } else {
        headings.forEach((heading) => {
          const marginLeft = (heading.level - 1) * 12
          const link = document.createElement('div')
          link.className = 'outline-item text-sm py-1 cursor-pointer'
          link.style.cssText = `margin-left: ${marginLeft}px; color: var(--color-t-l); opacity: 0.7; transition: opacity 0.2s;`
          link.textContent = heading.text

          link.onmouseenter = () => {
            link.style.opacity = '1'
          }
          link.onmouseleave = () => {
            link.style.opacity = '0.7'
          }

          outlineList.appendChild(link)
        })
      }
    }

    // 标签面板逻辑
    const tagsList = document.querySelector('.tags-list') as HTMLElement

    const extractHashtags = (markdown: string): string[] => {
      // 移除代码块（```...```）和行内代码（`...`）
      const cleanMarkdown = markdown
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]+`/g, '')

      const tagRegex = /#([^\s#]+)/g
      const matches = cleanMarkdown.matchAll(tagRegex)
      const tags = new Set<string>()

      for (const match of matches) {
        const tag = match[1]
        tags.add(tag)
        if (tag.includes('/')) {
          const parts = tag.split('/')
          for (let i = 0; i < parts.length - 1; i++) {
            tags.add(parts.slice(0, i + 1).join('/'))
          }
        }
      }

      return Array.from(tags).sort()
    }

    const updateTags = (markdown: string) => {
      if (!tagsList) return

      const tags = extractHashtags(markdown)
      tagsList.innerHTML = ''

      if (tags.length === 0) {
        const emptyDiv = document.createElement('div')
        emptyDiv.className = 'text-sm'
        emptyDiv.style.color = 'var(--color-t-l)'
        emptyDiv.textContent = '暂无标签'
        tagsList.appendChild(emptyDiv)
      } else {
        tags.forEach((tag) => {
          const tagEl = document.createElement('div')
          tagEl.className = 'tag-item flex text-sm  rounded'
          tagEl.style.cssText =
            'color: var(--color-t-l); cursor: default; transition: background-color 0.2s;'
          tagEl.onmouseenter = () => {
            tagEl.style.backgroundColor = 'var(--color-bg-l)'
          }
          tagEl.onmouseleave = () => {
            tagEl.style.backgroundColor = ''
          }

          const span = document.createElement('span')
          span.style.cssText = 'color: var(--color-primary);'
          span.textContent = '#'

          const text = document.createTextNode(tag)

          tagEl.appendChild(span)
          tagEl.appendChild(text)
          tagsList.appendChild(tagEl)
        })
      }
    }

    // 初始化大纲和标签
    updateOutline(pageDat?.content ?? '')
    updateTags(pageDat?.content ?? '')

    // 监听编辑器更新，实时更新标签和大纲
    editor.on(
      'update',
      throttle(() => {
        const markdown = editor.getValue()
        updateOutline(markdown)
        updateTags(markdown)
      }, 200),
    )

    // 移除 loading 状态
    document
      .querySelector('.editor-container')
      ?.removeAttribute('data-modal-loading')

    return {
      editor,
      initial: pageDat,
    }
  })()

  const getCurrentDoc = async () => {
    // 直接获取 Markdown 文本内容
    const markdownContent = editor.getValue()
    const { assets } = await getLocalUploadImages(editor)

    // 标题获取优先级：original title > markdown h1 > filename
    let title = initial?.title
    if (!title) {
      const titleMatch = markdownContent.match(/^#\s+(.+)$/m)
      title = titleMatch ? titleMatch[1] : undefined
    }
    if (!title && pagePath) {
      // 从文件路径提取文件名（不含扩展名）
      title = pagePath.replace(/\.md$/, '').split('/').pop() || 'Untitled'
    }
    if (!title) {
      title = 'Untitled'
    }

    const path = (() => {
      if (!isCreate) return pagePath!
      if (globalData.some((v) => v.title === title)) {
        return toUniqueFilename(title)
      }
      return toFilename(title)
    })()

    const data: any = {
      content: markdownContent,
      title: title,
      tags: [],
      createTime: initial?.createTime ?? Date.now(),
      draft: false,
    }

    // 只添加有值的可选字段
    if (initial?.category !== undefined && initial?.category !== null) {
      data.category = initial.category
    }

    return {
      path,
      content: markdownContent,
      data,
      assets,
    }
  }

  const Save = () => {
    const [saveButtonRef, setSaveStatus] = useAttrRef(
      { disabled: false, 'data-loading': false },
      true,
    )

    const toSave = async (draft = false) => {
      setSaveStatus((v) => {
        v.blur()
        return { disabled: true, 'data-loading': true }
      })
      try {
        const { path, data, assets, content } = await getCurrentDoc()

        // 将本地上传的文件路径替换为博客站点路径
        let processedContent = content
        assets.forEach((asset) => {
          // 替换 Markdown 中的图片链接
          processedContent = processedContent.replace(
            new RegExp(asset.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
            `/post-assets/${asset.file.name}`,
          )
        })

        await writePage(
          path,
          { ...data, content: processedContent, draft },
          assets,
        )
        toast(`${draft ? 'Save' : 'Publish'} success`)
        await saver.clean(pagePath)
        if (isCreate) {
          location.replace(`/edit?path=${path}`)
        }
      } catch (err) {
        toast(`${draft ? 'Save' : 'Publish'} error: ${err}`, 'error')
        throw err
      } finally {
        setSaveStatus({ disabled: false, 'data-loading': false })
      }
    }

    const saveButton = (
      <div
        class="group relative flex items-center gap-1"
        tabIndex={-1}
      >
        <button
          ref={saveButtonRef}
          class="text-button"
          aria-label="to save"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
        <button
          class="text-button"
          aria-label="toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-4 h-4"
          >
            <path
              fill-rule="evenodd"
              d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div
          class="absolute z-50 top-full right-0 mt-1 transition-all transition-delay-[0.2s] whitespace-nowrap opacity-0 translate-y--2 pointer-events-none group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto
        flex flex-col gap-2 p-2 rounded bg-modal shadow text-sm"
        >
          <button
            ref={saveButtonRef}
            class="buttoned bg-blue-200 dark:bg-blue"
            onClick={() => toSave()}
          >
            <div>Publish</div>
          </button>
          <button
            ref={saveButtonRef}
            class="buttoned bg-yellow-200 dark:bg-yellow"
            onClick={() => toSave(true)}
          >
            Save as draft
          </button>
        </div>
      </div>
    )

    return saveButton
  }

  const AutoSaveIndicator = () => {
    const localSaverRef = React.createRef()
    let changeSaved = true
    const setChangeSaved = (v: boolean) => {
      changeSaved = v
      ;(localSaverRef.current as HTMLElement).replaceChildren(render())
    }
    // auto save
    const saveToLocal = debounce(async () => {
      const { data, assets, content } = await getCurrentDoc()
      await saver.save({ data, assets, content }, pagePath)
      setChangeSaved(true)
    })
    const toClearLocalSaved = async () => {
      await saver.clean(pagePath)
      location.reload()
    }
    const onUpdate = () => {
      setChangeSaved(false)
      saveToLocal()
    }
    editor.on('update', onUpdate)

    const render = () => (
      <div
        class="group relative text-lg"
        tabIndex={-1}
      >
        <button
          class={['text-button', changeSaved ? 'text-green-500' : ''].join(' ')}
        >
          {changeSaved ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clip-rule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="w-5 h-5 animate-spin"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                fill="none"
                opacity="0.25"
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                opacity="0.75"
              />
            </svg>
          )}
        </button>
        <div class="absolute text-sm top-full right-0 gap-2 p-2 mt-1 z-50 bg-modal flex flex-col justify-center w-[200px] shadow rounded transition-all transition-delay-[0.2s] whitespace-nowrap opacity-0 translate-y--2 pointer-events-none group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
          {changeSaved ? (
            <div class="text-center">Changes saved</div>
          ) : (
            <div class="text-center">Saving Changes to local</div>
          )}
          <button
            class="buttoned bg-red text-xs"
            onClick={toClearLocalSaved}
          >
            Clear
          </button>
          <div class="text-xs text-red text-center">
            saved doc will be cleared!
          </div>
        </div>
      </div>
    )

    return (
      <div
        ref={localSaverRef}
        class=""
      >
        {render()}
      </div>
    )
  }

  const RawButton = () => {
    return (
      <a
        class="text-button text-lg"
        href={`https://github.com/${config.github.login}/${
          config.github.repo
        }/blob/main/posts/${pagePath?.replace(/\/$/, '')}.json`}
        target="_blank"
        aria-label="goto raw file"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
          <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
        </svg>
      </a>
    )
  }

  const DeleteButton = () => {
    const checkRef = React.useRef<HTMLInputElement>(null)
    const [setRef, setAttar] = useAttrRef({
      'data-loading': false,
      disabled: false,
    })
    const confirmDelete = async () => {
      if (!pagePath) return
      const recursive = Boolean(checkRef.current?.checked)
      const assets = getDocAssets(editor)
      try {
        setAttar({ 'data-loading': true, disabled: true })
        await deletePageByPath(pagePath, recursive ? assets : [])
        await toast('Delete success!')
        location.replace('/')
      } catch (error) {
        toast(`delete failed: ${error}`)
      } finally {
        setAttar({ 'data-loading': false, disabled: false })
      }
    }
    const { show, close } = useDialog(() => {
      const assets = getDocAssets(editor)
      return (
        <div class="flex-1 flex flex-col p-4 gap-2">
          <div class="font-bold">Are you sure to delete this post?</div>
          <div class="text-sm flex flex-col">
            <label>
              <input
                type="checkbox"
                ref={checkRef}
                checked
              />
              <span class="px-2">delete related assets</span>
            </label>
            <span class="text-xs opacity-60">
              Make sure no other posts are using these assets
            </span>
            <ul class="flex flex-col text-xs pt-2">
              {assets.map((asset) => (
                <a
                  target="_blank"
                  href={asset}
                >
                  {asset}
                </a>
              ))}
            </ul>
          </div>
          <div class="flex-1"></div>
          <div class="flex gap-2 justify-end text-sm">
            <button
              class="buttoned"
              onClick={() => close()}
            >
              Cancel
            </button>
            <button
              ref={setRef}
              class="buttoned bg-red"
              onClick={() => confirmDelete()}
            >
              Confirm
            </button>
          </div>
        </div>
      )
    })
    const toDelete = () => {
      show()
    }
    return (
      <button
        title="delete"
        class="text-red"
        onClick={toDelete}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    )
  }
  opRoot.appendChild(AutoSaveIndicator())
  if (!isCreate) {
    opRoot.appendChild(DeleteButton())
  }
  opRoot.appendChild(RawButton())
  opRoot.appendChild(Save())
}

interface SavedData {
  data: Partial<PageData>
  assets: Array<{ url: string; file: File }>
  content: JSONContent
}

const transformSaved = async (saved: SavedData) => {
  const { data, assets, content } = saved

  // 如果 content 是字符串（Markdown），直接使用
  if (typeof content === 'string') {
    // 处理图片链接，将保存的本地路径替换为 blob URL
    let processedContent = content
    assets.forEach((asset) => {
      const blobUrl = URL.createObjectURL(asset.file)
      processedContent = processedContent.replace(
        new RegExp(asset.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        blobUrl,
      )
    })
    data.content = processedContent
  } else {
    // 兼容旧的 JSON 格式（如果存在）
    travelDoc(content, (node) => {
      if (node.type === 'image') {
        const img = assets.find(
          (asset) => asset.url === (node.attrs?.src as string),
        )
        if (img && node.attrs) {
          const blobUrl = URL.createObjectURL(img.file)
          node.attrs.src = blobUrl
        }
      }
    })
    data.content = JSON.stringify(content)
  }

  return {
    data,
    assets,
    content,
  }
}
