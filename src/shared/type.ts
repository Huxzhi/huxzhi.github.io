export type PageData = {
  path: string
  content: string
  tags: string[]
  title: string
  created: string
  updated: string
  draft: boolean
  category?: string
  cover?: {
    src: string
    alt?: string
  }
}

export type PageDetail = Omit<PageData, 'path'> & {
  intro: string
  html: string
}

export type ShortPageData = Omit<PageData, 'content'> & { intro: string }
