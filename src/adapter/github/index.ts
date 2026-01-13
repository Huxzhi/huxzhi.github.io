import config from '@/../urodele.config'
import { getLocalUser } from '@/hooks/useStorage'
import { parseFrontmatter } from '@/utils/yaml.mjs'
import { Octokit } from 'octokit'
import type { DeletePageByPath, ReadPageByPath, WritePage } from '../helper'

const { repo: REPO, login: OWNER } = config.github

let _oc: Octokit | undefined
const getOc = () => {
  if (_oc) return _oc
  const token = getLocalUser()?.token
  // if (!token) return undefined;
  const octokit = new Octokit({ auth: token })
  return octokit
}

export const readPageByPath: ReadPageByPath = async (_id) => {
  const id = _id.replace(/\/$/, '')
  const path = `src/blog/${id}.md`
  const octokit = getOc()
  const { data } = await octokit.rest.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: path,
  })

  // Decode base64 content (browser-compatible way)
  const fileData = data as { content: string; encoding: string }
  const base64Content = fileData.content.replace(/\s/g, '')

  // Convert base64 to UTF-8 string (browser-compatible)
  const binaryString = window.atob(base64Content)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  const markdownContent = new TextDecoder('utf-8').decode(bytes)

  // Parse frontmatter from Markdown (browser-compatible)
  const parsed = parseFrontmatter(markdownContent)
  const frontmatter = parsed.data

  // Parse time from new format (created/updated strings) or old format (createTime/updateTime numbers)
  const parseTime = (timeStr?: string, fallbackTimestamp?: number): number => {
    if (timeStr) {
      const parsed = new Date(timeStr).getTime()
      if (!isNaN(parsed)) return parsed
    }
    return fallbackTimestamp || Date.now()
  }

  return {
    content: markdownContent,
    title: frontmatter.title || 'Untitled',
    tags: frontmatter.tags || [],
    createTime: parseTime(frontmatter.created, frontmatter.createTime),
    updateTime: parseTime(frontmatter.updated, frontmatter.updateTime),
    draft: frontmatter.draft || false,
    category: frontmatter.category,
    id,
    path,
  }
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64Data = (reader.result as string).split(',')[1] // 移除 Data URI 的前缀
      resolve(base64Data)
    }
    reader.onerror = (error) => reject(error)
  })
}

export const writePage: WritePage = async (_path, data, assets) => {
  const path = _path.replace(/\/$/, '')
  const octokit = getOc()
  const { data: user } = await octokit.rest.users.getAuthenticated()
  const userName = user.login
  const main = await octokit.rest.git.getRef({
    owner: userName,
    repo: REPO,
    ref: 'heads/main',
  })
  console.log(main, 'main')

  // data.content already contains full Markdown with frontmatter from the editor
  const textFile = new File(
    [new Blob([data.content], { type: 'text/markdown' })],
    path.replace(/^\//, ''),
  )
  const tree = await Promise.all(
    [
      ...assets.map(({ file }) => ({
        path: `public/post-assets/${file.name}`,
        file,
      })),
      {
        path: `src/blog/${path}.md`,
        file: textFile,
      },
    ].map(async ({ file, path }) => {
      const fileURI =
        typeof file === 'string' ? btoa(file) : await fileToBase64(file)
      const blob = await octokit.rest.git.createBlob({
        owner: userName,
        repo: REPO,
        content: fileURI,
        encoding: 'base64',
      })
      console.log(blob, 'blob')
      return {
        path,
        sha: blob.data.sha,
        mode: '100644' as const,
        type: 'blob' as const,
      }
    }),
  )
  const newTree = await octokit.rest.git.createTree({
    owner: userName,
    repo: REPO,
    tree,
    base_tree: main.data.object.sha,
  })
  console.log(newTree, 'new tree')

  const commit = await octokit.rest.git.createCommit({
    owner: userName,
    repo: REPO,
    message: `update by urodele`,
    tree: newTree.data.sha,
    parents: [main.data.object.sha],
  })

  console.log(commit, 'commit')
  const res = await octokit.rest.git.updateRef({
    owner: userName,
    repo: REPO,
    ref: main.data.ref.replace(/^refs\//, ''),
    sha: commit.data.sha,
  })
  console.log(res, 'res')
}

export const deletePageByPath: DeletePageByPath = async (_path, assets) => {
  console.log(_path, assets)
  const path = _path.replace(/\/$/, '')
  const octokit = getOc()
  const { data: user } = await octokit.rest.users.getAuthenticated()
  const userName = user.login
  const main = await octokit.rest.git.getRef({
    owner: userName,
    repo: REPO,
    ref: 'heads/main',
  })
  const tree = [
    ...assets.map((p) => ({
      path: p.replace('/post-assets', 'public/post-assets'),
      mode: '100644' as const,
      sha: null,
    })),
    {
      path: `src/blog/${path}.md`,
      mode: '100644' as const,
      sha: null,
    },
  ]
  const newTree = await octokit.rest.git.createTree({
    owner: userName,
    repo: REPO,
    base_tree: main.data.object.sha,
    tree: tree,
  })
  console.log(newTree, 'new tree')

  const commit = await octokit.rest.git.createCommit({
    owner: userName,
    repo: REPO,
    message: `deleted by urodele`,
    tree: newTree.data.sha,
    parents: [main.data.object.sha],
  })

  console.log(commit, 'commit')
  const res = await octokit.rest.git.updateRef({
    owner: userName,
    repo: REPO,
    ref: main.data.ref.replace(/^refs\//, ''),
    sha: commit.data.sha,
  })
  console.log(res, 'res')
}
