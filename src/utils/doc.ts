import type { CodeMirrorEditor } from '@/editor/codemirror'
import { splitFilename, toUniqueFilename } from '../utils/transform'

export interface JSONContent {
  type: string
  content?: JSONContent[]
  attrs?: Record<string, any>
  text?: string
  marks?: Array<{ type: string; attrs?: Record<string, any> }>
}

export const travelDoc = (
  doc: JSONContent,
  walker: (v: JSONContent) => void,
) => {
  walker(doc)
  // doc.content?.forEach((d, i, arr) => walker(arr[i]));
  for (const d of doc.content ?? []) {
    walker(d)
  }
}

export const filterRepeat = <T, K extends keyof T>(arr: T[], id: K) => {
  const r: any[] = []
  return arr.filter((v) => !r.includes(v[id]))
}

export const getLocalUploadImages = async (editor: CodeMirrorEditor) => {
  const editorJSON = editor.getJSON()
  const images: { name: string; url: string }[] = []
  editor.state.doc.content.forEach((node) => {
    if (node.type.name === 'image') {
      const url = node.attrs?.src as string
      if (url && url.startsWith('blob:')) {
        images.push({ url: node.attrs?.src || '', name: node.attrs?.alt || '' })
      }
    }
  })

  const filtered = filterRepeat(images, 'url')
  const assets = await Promise.all(
    filtered.map(async (v) => {
      const blob = await (await fetch(v.url)).blob()
      const { name, extension } = splitFilename(v.name)
      const file = new File(
        [blob],
        [toUniqueFilename(name), extension].join('.'),
      )
      return { ...v, file }
    }),
  )

  return { assets, editorJSON }
}

export const getDocAssets = (editor: CodeMirrorEditor) => {
  const assets: string[] = []
  editor.state.doc.content.forEach((node) => {
    if (node.type.name === 'image') {
      const url = node.attrs?.src as string
      if (url && url.startsWith('/post-assets')) {
        assets.push(url)
      }
    }
  })
  return [...new Set(assets)]
}
