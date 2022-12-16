import { HexoPost } from '../utils/hexo-state'
import styled from '@emotion/styled'
import { useMemo } from 'react'
import { Tag, TagCloud } from '../components/tags'

const PageTitle = styled.h1`
  padding-bottom: 3rem;
`

const ArticleContainer = styled.div`
  padding-bottom: 1rem;
`

const Title = styled.a`
  display: inline-block;
  font-size: 1.25rem;
  padding-bottom: 0.5rem;
`

const Date = styled.div`
  font-size: 0.75rem;
  padding-bottom: 0.25rem;
  color: var(--dark-text);
`
const Excerpt = styled.p`
  color: var(--dark-text);
`

const Article: React.FC<{ post: HexoPost }> = ({ post }) => {
  const excerpt = useMemo(() => post.excerpt || createExcerpt(post.content), [post.excerpt, post.content])
  return (
    <ArticleContainer>
      <Title href={post.path}>{post.title}</Title>
      <Date>{post.date}</Date>
      <TagCloud>
        {post.tags.map((tag) => (
          <Tag tag={tag} />
        ))}
      </TagCloud>
      <Excerpt>{excerpt}</Excerpt>
    </ArticleContainer>
  )
}

export const Archive: React.FC<{ title: string; posts: ReadonlyArray<HexoPost> }> = ({ title, posts }) => {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      {posts.map((post) => (
        <Article post={post} />
      ))}
    </>
  )
}

const createExcerpt = (htmlContent: string) => {
  const tmp = document.createElement('div')
  tmp.innerHTML = htmlContent
  return tmp.textContent.slice(0, 180).trim() + (tmp.textContent.length > 200 ? '...' : '')
}
