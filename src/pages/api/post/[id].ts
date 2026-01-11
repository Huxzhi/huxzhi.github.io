import { getPostById, toPageData } from '@/adapter/content'
import { composeFrontmatter, parseFrontmatter } from '@/utils/yaml'
import type { APIRoute, GetStaticPaths } from 'astro'
import { unlink, writeFile } from 'fs/promises'
import { getPageList } from './list'

export const GET: APIRoute = async ({ params }) => {
  const id = params.id
  if (id == undefined) return new Response(JSON.stringify({}), { status: 200 })

  const entry = await getPostById(id)
  if (!entry) {
    return new Response(JSON.stringify({ error: 'Post not found' }), {
      status: 404,
    })
  }

  // 返回编辑器需要的格式
  const pageData = toPageData(entry)
  console.log(
    'GET /api/post/[id] - content preview:',
    pageData.content?.substring(0, 100),
  )
  return new Response(JSON.stringify(pageData), { status: 200 })
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

  // contentData.content 现在可能包含完整的 Markdown（含 frontmatter）
  const markdownContent = contentData.content || ''

  // 尝试解析 Markdown 中的 frontmatter
  const parsed = parseFrontmatter(markdownContent)

  // 格式化时间为 YYYY-MM-DDTHH:mm 格式
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  // 合并 frontmatter：优先使用 Markdown 中的，其次使用 contentData 中的
  const frontmatter: Record<string, any> = {
    title: parsed.data.title || contentData.title || 'Untitled',
    tags: Array.isArray(parsed.data.tags)
      ? parsed.data.tags
      : Array.isArray(contentData.tags)
      ? contentData.tags
      : [],
    created: formatTime(
      parsed.data.createTime || contentData.createTime || Date.now(),
    ),
    updated: formatTime(Date.now()),
    draft:
      parsed.data.draft !== undefined
        ? parsed.data.draft
        : contentData.draft === true,
  }

  // 只添加有值的可选字段
  const category =
    parsed.data.category !== undefined
      ? parsed.data.category
      : contentData.category
  if (category !== undefined && category !== null) {
    frontmatter.category = category
  }

  const cover = parsed.data.cover || contentData.cover
  if (cover) {
    frontmatter.cover = cover
  }

  // 使用解析后的 body（不含 frontmatter 的部分）
  const markdown = composeFrontmatter(frontmatter, parsed.content)

  // 保存为 .md 文件
  await writeFile(`./docs/posts/${id}.md`, markdown, {
    encoding: 'utf-8',
  })

  return new Response(JSON.stringify({ code: 0 }), { status: 200 })
}

export const DELETE: APIRoute = async (ctx) => {
  const { path: id, assets } = (await ctx.request.json()) as {
    path: string
    assets: string[]
  }
  const pagePath = `./docs/posts/${id}.md`
  const assetsPaths = assets.map((p) =>
    p.replace(`/post-assets`, './public/post-assets'),
  )
  await Promise.all([pagePath, ...assetsPaths].map((p) => unlink(p)))
  return new Response(JSON.stringify({ code: 0 }), { status: 200 })
}
