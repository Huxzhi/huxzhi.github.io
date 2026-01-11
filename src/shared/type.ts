export type PageData = {
  path: string
  id: string
  content: string
  tags: string[]
  title: string
  createTime: number
  updateTime: number
  draft: boolean
  category?: string
  cover?: {
    src: string
    alt?: string
  }
}

export type PageDetail = Omit<PageData, 'path' | 'id'> & {
  intro: string
  html: string
}

export type ShortPageData = Omit<PageData, 'content'> & { intro: string }
