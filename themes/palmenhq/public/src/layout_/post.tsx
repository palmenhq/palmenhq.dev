import { HexoState } from '../utils/hexo-state'
import styled from '@emotion/styled'
import { Author } from '../components/author'
import { mediaDesktopLgUp } from '../utils/media'
import { Tag, TagCloud } from '../components/tags'

const Content = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding-top: 8rem;
    margin-top: -6rem;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaDesktopLgUp`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  `}
`

const MetaData = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1rem;
`

const Date = styled.div`
  color: var(--muted);

  ${mediaDesktopLgUp`
    padding-top: 1rem;
  `}
`

export const Post: React.FC<{ state: HexoState }> = ({ state }) => {
  return (
    <>
      <Header>
        <h1>{state.title}</h1>
        <div>
          <MetaData>
            <Date>{state.date}</Date>
          </MetaData>
          <MetaData>
            <Author />
          </MetaData>
        </div>
      </Header>

      <TagCloud>
        {state.tags.map((tag) => (
          <Tag key={tag.slug} tag={tag} />
        ))}
      </TagCloud>

      <Content dangerouslySetInnerHTML={{ __html: state.content }} />
    </>
  )
}
