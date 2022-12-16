import { HexoState } from './utils/hexo-state'
import { Post } from './layout_/post'
import { Layout } from './layout_/layout'

export const App: React.FC<{ state: HexoState }> = ({ state }) => {
  return <Layout state={state}>{state.layout === 'post' && <Post state={state} />}</Layout>
}
