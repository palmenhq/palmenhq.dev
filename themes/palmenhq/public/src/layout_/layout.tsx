import styled from '@emotion/styled'
import { mediaDesktopSmUp, mediaTabletUp } from '../utils/media'
import { Aside } from '../components/aside'
import { HexoState } from '../utils/hexo-state'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;

  ${mediaTabletUp`
    flex-direction: row;
  `}
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8rem 1rem;
  width: 100%;

  ${mediaDesktopSmUp`
    max-width: 60rem;
    padding-top: 4rem;
  `}
`

export const Layout: React.FC<{ state: HexoState; children: React.ReactNode }> = ({ state, children }) => {
  return (
    <Container>
      <Aside toc={state.toc} />
      <Main>{children}</Main>
      <div></div>
    </Container>
  )
}
