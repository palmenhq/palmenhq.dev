export type HexoState = {
  content: string
  title: string
  date: string

  slug: string
  permalink: string
  layout: 'post' | 'page' | 'tag' | 'archive'

  toc: string
}
