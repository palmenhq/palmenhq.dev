import { HexoState } from './utils/hexo-state'
import { Post } from './layout_/post'
import { Layout } from './layout_/layout'
import { Archive } from './layout_/archive'

export const App: React.FC<{ state: HexoState }> = ({ state }) => {
  return (
    <Layout state={state}>
      {state.layout === 'post' && <Post state={state} />}
      {state.isArchive && <Archive title={state.title} posts={state.posts} />}
      {state.isTag && <Archive title={state.title} posts={state.posts} />}
    </Layout>
  )
}
