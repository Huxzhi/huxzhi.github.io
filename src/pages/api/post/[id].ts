import type { APIRoute, GetStaticPaths } from 'astro'
import { getEntry } from 'astro:content'
import { unlink, writeFile } from 'fs/promises'
import matter from 'gray-matter'
import { getPageList } from './list'

export const GET: APIRoute = async ({ params }) => {
  const id = params.id
  if (id == undefined) return new Response(JSON.stringify({}), { status: 200 })

  const entry = await getEntry('posts', id)
  if (!entry) {
    return new Response(JSON.stringify({ error: 'Post not found' }), {
      status: 404,
    })
  }

  // 返回编辑器需要的格式
  return new Response(
    JSON.stringify({
      content: entry.body,
      tags: entry.data.tags,
      title: entry.data.title,
      createTime: entry.data.createTime,
      updateTime: entry.data.updateTime,
      draft: entry.data.draft,
      category: entry.data.category,
      id: id,
      path: id,
    }),
    { status: 200 },
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPageList(false)
  return posts.map((p) => ({
    params: {
      id: p.id,
    },
  }))
}

export const POST: APIRoute = async (ctx) => {
  const form = await ctx.request.formData()
  const id = ctx.params.id

  // 保存上传的资源文件
  await Promise.all(
    form
      .getAll('assets')
      ?.flat()
      .map(async (v) => {
        const file = v as File
        return writeFile(
          `./public/post-assets/${file.name}`,
          Buffer.from(await file.arrayBuffer()),
        )
      }),
  )

  const content = form.get('content')
  let contentData: any

  if (typeof content === 'string') {
    contentData = JSON.parse(content)
  } else if (content instanceof File) {
    const text = await content.text()
    contentData = JSON.parse(text)
  }

  // 构建 Markdown 文件内容
  const frontmatter = {
    title: contentData.title,
    tags: contentData.tags || [],
    ...(contentData.category && { category: contentData.category }),
    createTime: contentData.createTime || Date.now(),
    updateTime: Date.now(),
    draft: contentData.draft || false,
  }

  // 使用 gray-matter 格式化
  const markdown = matter.stringify(contentData.content || '', frontmatter)

  // 保存为 .md 文件
  await writeFile(`./src/content/posts/${id}.md`, markdown, {
    encoding: 'utf-8',
  })

  return new Response(JSON.stringify({ code: 0 }), { status: 200 })
}

export const DELETE: APIRoute = async (ctx) => {
  const { path: id, assets } = (await ctx.request.json()) as {
    path: string
    assets: string[]
  }
  const pagePath = `./src/content/posts/${id}.md`
  const assetsPaths = assets.map((p) =>
    p.replace(`/post-assets`, './public/post-assets'),
  )
  await Promise.all([pagePath, ...assetsPaths].map((p) => unlink(p)))
  return new Response(JSON.stringify({ code: 0 }), { status: 200 })
}
