import styled from '@emotion/styled'
import { HexoTag } from '../utils/hexo-state'

export const TagCloud = styled.div``
export const TagLink = styled.a`
  display: inline-block;
  text-decoration: none;
  color: var(--muted);
  padding-bottom: 0.5rem;
  padding-right: 0.5rem;
`

export const Tag: React.FC<{ tag: HexoTag }> = ({ tag }) => (
  <TagLink href={'/' + tag.path}>
    {tag.name} ({tag.length})
  </TagLink>
)
