import { HexoState } from '../utils/hexo-state'
import styled from '@emotion/styled'
import { Author } from '../components/author'

const Content = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding-top: 7rem;
    margin-top: -7rem;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const MetaData = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1rem;
`

const Date = styled.div`
  padding-top: 1rem;
  color: var(--muted);
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

      <Content dangerouslySetInnerHTML={{ __html: state.content }} />
    </>
  )
}
