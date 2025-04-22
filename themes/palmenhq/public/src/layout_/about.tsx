import { HexoState } from '../utils/hexo-state'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const ContentContainer = styled.div``
const ImageContainer = styled.div`
  float: right;
`
const Img = styled.img`
  max-width: 8rem;
  width: 100%;
  border-radius: 1000px;
  margin: 1rem;
  margin-right: 0;
`

export const About: React.FC<{ state: HexoState }> = ({ state }) => {
  return (
    <Container>
      <h1>{state.title}</h1>
      <ContentContainer>
        <ImageContainer>
          <Img src="/images/johan-palmfjord-2025.jpg" alt="Johan Palmen Palmfjord" />
        </ImageContainer>

        <div dangerouslySetInnerHTML={{ __html: state.content }}></div>
      </ContentContainer>
    </Container>
  )
}
