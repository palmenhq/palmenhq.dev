export type HexoTag = {
  name: string
  slug: string
  path: string
  permalink: string
  length: number
}

export type HexoPost = {
  title: string
  date: string
  content: string
  excerpt: string
  slug: string
  published: boolean
  path: string
  tags: HexoTag[]
}

export type HexoState = {
  content: string
  title: string
  date: string

  slug: string
  permalink: string
  layout: 'post' | 'page' | 'tag'

  toc: string

  isArchive: boolean
  isTag: boolean

  posts: HexoPost[]
  tags: HexoTag[]
}
