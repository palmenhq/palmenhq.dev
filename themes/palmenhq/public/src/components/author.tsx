import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.img`
  width: 2em;
  border-radius: 999px;
`

const Name = styled.div`
  padding-left: 1rem;
`

export const Author = () => {
  return (
    <Container>
      <Avatar src="/images/johan-palmfjord.jpg" />
      <Name>by Johan Palmfjord</Name>
    </Container>
  )
}
