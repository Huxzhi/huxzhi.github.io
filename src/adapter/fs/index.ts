import type { DeletePageByPath, ReadPageByPath, WritePage } from '../helper'

const PREFIX = location.origin

export const readPageByPath: ReadPageByPath = async (path) => {
  // Fetch from API endpoint which reads src/blog/${path}.md and returns PageData as JSON
  const json = await (await fetch(`${PREFIX}/api/post/${path}`)).json()
  return json
}

export const writePage: WritePage = async (path, data, assets) => {
  const form = new FormData()
  assets.forEach((asset, i) => {
    if (i === 0) {
      form.set('assets', asset.file)
    } else form.append('assets', asset.file)
  })
  // content 现在是纯 Markdown 字符串，不需要解析
  const rawString = JSON.stringify({
    ...data,
    updateTime: Date.now(),
    content: data.content,
  })
  const strFile = new File(
    [new Blob([rawString], { type: 'text/plain' })],
    'content.json',
  )
  form.append('content', strFile)
  await fetch(`${PREFIX}/api/post/${path}`, { method: 'POST', body: form })
}

export const deletePageByPath: DeletePageByPath = async (path, assets) => {
  await fetch(`${PREFIX}/api/post/${path}`, {
    method: 'DELETE',
    body: JSON.stringify({ path, assets }),
    headers: {
      'content-type': 'application/json',
    },
  })
}
