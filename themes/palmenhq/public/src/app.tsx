import { HexoState } from './hexo-state'
import { Post } from './post'

export const App: React.FC<{ state: HexoState }> = ({ state }) => {
  return (
    <>
      {state.layout === 'post' && <Post state={state} />}
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  )
}
