import { HexoState } from './utils/hexo-state'
import { Post } from './layout_/post'
import { Layout } from './layout_/layout'
import { Archive } from './layout_/archive'
import { About } from './layout_/about'
import { Start } from './layout_/start'

export const App: React.FC<{ state: HexoState }> = ({ state }) => {
  if (state.layout === 'start') {
    return <Start posts={state.posts} />
  }
  return (
    <Layout state={state}>
      {state.layout === 'post' && <Post state={state} />}
      {state.layout === 'about' && <About state={state} />}
      {state.isArchive && <Archive title={state.title} posts={state.posts} />}
      {state.isTag && <Archive title={state.title} posts={state.posts} />}
    </Layout>
  )
}
