import { HexoState } from './hexo-state'

export const Post: React.FC<{ state: HexoState }> = ({ state }) => {
  return (
    <>
      <h1>{state.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: state.content }} />
    </>
  )
}
