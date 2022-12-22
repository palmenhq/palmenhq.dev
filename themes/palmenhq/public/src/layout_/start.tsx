import styled from '@emotion/styled'
import { useCallback, useEffect, useState } from 'react'
import { Aside } from '../components/aside'
import { HexoPost } from '../utils/hexo-state'
import { githubHref, linkedinHref } from '../utils/content'

const Container = styled.div`
  display: flex;
  width: 100%;
`

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 8rem 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  background: var(--background-contrast);
`

const TerminalWindow = styled.form`
  display: flex;
  white-space: pre;
  width: 100%;
  max-width: 60rem;
  padding: 1rem;
  min-height: 50vh;
`
const Prompt = styled.input`
  font: inherit;
  background: transparent;
  color: inherit;
  border: 0;
  padding: 0;

  &:focus,
  &:active {
    outline: none;
  }

  ::placeholder {
    color: var(--muted);
  }
`

const Label = styled.label`
  white-space: normal;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li::before {
    content: '- ';
  }
`

const Error = styled.span`
  color: var(--danger);
`

const goUsage = 'Usage: go <linkedin | github | blog>'

export const Start: React.FC<{ posts: ReadonlyArray<HexoPost> }> = ({ posts }) => {
  const [promptValue, setPromptValue] = useState('')
  const [isPromptVisible, setIsPromptVisible] = useState(false)
  const [lines, setLines] = useState<React.ReactNode[]>([])
  const addLine = useCallback((newLine: React.ReactNode) => setLines((l) => [...l, newLine]), [setLines])

  useEffect(() => {
    const t = setTimeout(() => setIsPromptVisible(true), 3000)
    return () => clearTimeout(t)
  }, [setIsPromptVisible])

  const handleCommand = useCallback(createHandleCommand(addLine, posts), [addLine, posts])

  return (
    <Container>
      <Aside toc={''} />
      <InnerContainer>
        <TerminalWindow
          onSubmit={(e) => {
            e.preventDefault()
            setLines((l) => [...l, '$ ' + promptValue])
            handleCommand(promptValue)
            setPromptValue('')
          }}
        >
          <Label>
            <AnimatedPhrase>booting website...</AnimatedPhrase>
            <AnimatedPhrase animation={500} delay={1000}>
              welcome to Palmen's website 👋
            </AnimatedPhrase>
            <AnimatedPhrase animation={500} delay={2500}>
              select command: <span onClick={() => {}}>go</span>, about, ls-blog
            </AnimatedPhrase>
            {lines.map((command, i) => (
              <div key={i}>{command}</div>
            ))}
            {isPromptVisible && (
              <div>
                ${' '}
                <Prompt
                  autoFocus
                  value={promptValue}
                  onChange={(e) => setPromptValue(e.currentTarget.value)}
                  placeholder="Type command here..."
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="none"
                />
              </div>
            )}
          </Label>
        </TerminalWindow>
      </InnerContainer>
    </Container>
  )
}

const createHandleCommand =
  (addLine: (newLine: React.ReactNode) => void, posts: ReadonlyArray<HexoPost>) => (command: string) => {
    const [actualCommand, subCommand] = command.toLowerCase().split(' ')
    switch (actualCommand) {
      case 'go':
        if (!subCommand) {
          addLine(goUsage)
          return
        }

        switch (subCommand) {
          case 'linkedin':
            addLine(
              <>
                Find me on{' '}
                <a href={linkedinHref} target="_blank">
                  Linkedin
                </a>
              </>,
            )
            return
          case 'github':
            addLine(
              <>
                Visit my Github account at{' '}
                <a href={githubHref} target="_blank">
                  {githubHref}
                </a>
              </>,
            )
            return
          case 'blog':
            window.location.pathname = '/annotated/'
            return
          default:
            addLine(
              <>
                <div>Unknown go command "{subCommand}"</div>
                <div>{goUsage}</div>
              </>,
            )
            return
        }
      case 'ls-blog':
        addLine(
          <List>
            {posts.map((post) => (
              <li key={post.path}>
                <a href={post.path}>{post.title}</a>
              </li>
            ))}
          </List>,
        )
        return
      case 'about':
        addLine(
          <>
            Hello, I’m Johan “Palmen” Palmfjord 👋 I like code and techno. However, this website is mostly about code
            and things related.
            <br />
            Read more about me on the <a href="/about/">about page</a>.
          </>,
        )
        return
      default:
        addLine(<Error>Unknown command {actualCommand}</Error>)
        return
    }
  }

const AnimatedPhrase: React.FC<{ delay?: number; animation?: number; children: React.ReactNode }> = ({
  delay = 0,
  animation = 0,
  children,
}) => {
  const [charCount, setCharCount] = useState(0)
  const triggerNextChar = useCallback(
    (nextCharCount: number) => {
      setTimeout(() => {
        setCharCount(nextCharCount)
        if (nextCharCount < children.length) {
          triggerNextChar(nextCharCount + 1)
        }
      }, Math.floor(animation / children.length))
    },
    [children],
  )

  useEffect(() => {
    const t = setTimeout(() => {
      triggerNextChar(1)
    }, delay)

    return () => clearTimeout(t)
  }, [])
  return <div>{children.slice(0, charCount)}</div>
}
