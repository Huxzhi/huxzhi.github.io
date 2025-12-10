import { TAG_PIN, formatTagDisplay } from '@/shared/tag'
import { getGlobalData } from '@/utils/data'
import * as React from 'jsx-dom'

export const createTagEditor = async (root: HTMLElement, initial: string[]) => {
  const data = await getGlobalData()
  const allTags = [
    ...new Set([...data.map((p) => p.tags).flat(), TAG_PIN]),
  ].sort()
  const modelValue: string[] = [...initial]

  const changeListeners: any[] = []
  const render = () => {
    const tagEditor = React.createRef()
    const tagsListWrapper = React.createRef()
    const createTag = (tag: string) => (
      <div
        key={tag}
        class="rounded px-3 py-1 cursor-pointer relative group transition-all duration-250"
        style="background: linear-gradient(90deg, rgba(229, 231, 235, 0) 50%, rgb(248 113 113) 50%, rgb(248 113 113) 100%); background-position: 0%; background-size: 200%;"
        onmouseenter="this.style.backgroundPosition='100%'; this.style.color='white'"
        onmouseleave="this.style.backgroundPosition='0%'; this.style.color=''"
      >
        <button
          class="opacity-0 transition-delay-[0.25s] group-hover:opacity-100 absolute bg-red top-0 right-0 w-3 h-3 rounded-full flex items-center justify-center"
          onClick={() => toRemove(tag)}
        >
          <div class="i-ri:close-line text-white"></div>
        </button>
        #{formatTagDisplay(tag)}
      </div>
    )
    const tagList = () => modelValue.map(createTag)

    const tagsSelectionListWrapper = React.createRef()
    const tagSelectionList = () => {
      const otherTags = allTags.filter((t) => !modelValue.includes(t))
      return otherTags.map((tag) => (
        <button
          key={tag}
          class="text-button text-gray hover:text-text"
          onClick={() => toAddTag(tag)}
        >
          #{formatTagDisplay(tag)}
        </button>
      ))
    }
    const tagInput = React.createRef()

    const toRemove = (t: string) => {
      modelValue.splice(
        modelValue.findIndex((v) => v === t),
        1,
      )
      ;(tagsListWrapper.current as HTMLElement)?.replaceChildren(...tagList())
      ;(tagsSelectionListWrapper.current as HTMLElement)?.replaceChildren(
        ...tagSelectionList(),
      )
      changeListeners.forEach((f) => f())
    }
    const toAddTag = (v?: string) => {
      const newV = v ?? tagInput.current.value
      if (!newV) return
      if (modelValue.includes(newV)) return
      if (tagInput.current.value) {
        tagInput.current.value = ''
        tagEditor.current.blur()
      }
      modelValue.push(newV)
      ;(tagsListWrapper.current as HTMLElement)?.replaceChildren(...tagList())
      ;(tagsSelectionListWrapper.current as HTMLElement)?.replaceChildren(
        ...tagSelectionList(),
      )
      changeListeners.forEach((f) => f())
    }

    return (
      <div
        ref={tagEditor}
        class="flex text-sm px-[28px] gap-2 w-full max-w-[720px]"
      >
        <div
          ref={tagsListWrapper}
          class="flex gap-2"
        >
          {tagList()}
        </div>
        <div class="relative group">
          <button class="rounded text-gray hover:bg-gray-200 px-2 py-1 cursor-pointer">
            #Add a Tag
          </button>
          <div class="absolute z-[50] hidden group-focus-within:block">
            <div class="flex flex-col bg-modal shadow-md rounded p-2 gap-2 text-sm">
              <div class="flex items-center justify-center gap-2">
                <input
                  ref={tagInput}
                  type="text"
                  class="border px-2 py-1 rounded outline-none border-blue w-[180px] text-xs bg-transparent"
                  placeholder="e.g. 前端/JavaScript"
                />
                <button
                  class="text-button text-blue"
                  onClick={() => toAddTag()}
                >
                  Add
                </button>
              </div>
              <div
                ref={tagsSelectionListWrapper}
                class="flex flex-col"
              >
                {tagSelectionList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  root.appendChild(render())
  return {
    getValue: () => modelValue,
    onChange: (fn: any) => {
      changeListeners.push(fn)
      return () =>
        changeListeners.splice(
          changeListeners.findIndex((f) => f === fn),
          1,
        )
    },
  }
}
