import { useCallback, useEffect, useRef, useState } from 'react'
import { Burger } from './burger'
import styled from '@emotion/styled'
import { mediaDesktopSmUp } from '../utils/media'
import { keyframes } from '@emotion/react'
import { EmailIcon, GithubIcon, LinkedinIcon } from './icons'
import { githubHref, linkedinHref } from '../utils/content'

const AsideContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  background: var(--background-contrast-soft);
  border-bottom: var(--border);
  z-index: 999;
  box-shadow: 5px 0 20px rgba(0, 0, 0, 0.3);

  ${mediaDesktopSmUp`
    position: static;
    width: 30vw;
    border-bottom: 0;
    max-width: 20rem;
    box-shadow: none;
  `}
`
const AsideInner = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  padding: 1rem 2rem;
  flex-direction: column;
  ${mediaDesktopSmUp`
    height: 100vh;
    justify-content: space-between;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  `}
`

const TopRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;

  ${mediaDesktopSmUp`
    justify-content: flex-start;
  `}
`

const LogoContainer = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: var(--primary);

  ${mediaDesktopSmUp`
    width: 100%;
    padding-bottom: 5rem;
    justify-content: center;
  `}
`
const Logo = styled.img`
  width: 2rem;
`
const LogoText = styled.span`
  display: none;

  ${mediaDesktopSmUp`
    display: block;
    padding-left: 1rem;
    font-size: 1.5rem;
  `}
`

const TocHeadline = styled.div`
  display: none;

  ${mediaDesktopSmUp`
    display: block;
    font-size: 1.5rem;
    border-bottom: var(--border);
  `}
`

const BurgerContainer = styled.div`
  display: flex;
  align-items: center;

  ${mediaDesktopSmUp`
    display: none;
  `}
`

const fadeSlideIn = keyframes`
  from {
    opacity: 0; 
    max-height: 0;
    padding-top: 0;
  }
  to { 
    opacity: 1; 
    max-height: 500px;
    padding-top: 1.5rem;
  }
`
const fadeSlideOut = keyframes`
  from {
    opacity: 1; 
    max-height: 500px;
    padding-top: 1.5rem;
  }
  to { 
    opacity: 0; 
    max-height: 0;
    padding-top: 0;
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const MenuItem = styled.li``

const Menu = styled.nav<{ isOpen: boolean; isClosing: boolean }>`
  opacity: 0;
  max-height: 0;
  overflow-y: hidden;
  animation: ${(p) => (p.isOpen ? fadeSlideIn : p.isClosing ? fadeSlideOut : 'none')} 300ms forwards;

  ${mediaDesktopSmUp`
    opacity: 1;
    max-height: none;
    padding-top: 0;
    animation: none;
    padding-bottom: 5rem;
  `}

  ul,
  ol {
    display: block;
    margin: 0;
    list-style: none;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  .toc-number {
    display: none;
  }

  .toc-child {
    padding-left: 0.75rem;
    font-size: 0.9em;
  }

  .toc-item,
  ${MenuItem} {
    padding-top: 0.5em;
  }
`
const MenuLink = styled.a`
  text-decoration: none;
`

const Overlay = styled.div<{ isOpen: boolean; isClosing: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  animation: ${(p) => (p.isOpen ? fadeIn : fadeOut)} 300ms forwards;
  background: rgba(0, 0, 0, 0.5);

  ${mediaDesktopSmUp`
    display: none;
  `}
`

const Socials = styled.div`
  padding-bottom: 2rem;
  display: none;
  ${mediaDesktopSmUp`
    display: block;
  `}
`

export const Aside: React.FC<{ toc: string }> = ({ toc }) => {
  const tocMenu = useRef<HTMLDivElement>()
  const tocButton = useRef<HTMLDivElement>()
  const menuMenu = useRef<HTMLDivElement>()
  const menuButton = useRef<HTMLDivElement>()
  const [isTocOpen, setIsTocOpen] = useState(false)
  const [isTocClosing, setIsTocClosing] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuClosing, setIsMenuClosing] = useState(false)

  const closeToc = useCallback(() => {
    setIsTocClosing(true)
  }, [setIsTocClosing])
  const openToc = useCallback(() => {
    setIsTocOpen(true)
  }, [setIsTocOpen])
  const closeMenu = useCallback(() => {
    setIsMenuClosing(true)
  }, [setIsMenuClosing])
  const openMenu = useCallback(() => {
    setIsMenuOpen(true)
  }, [setIsMenuOpen])

  useEffect(() => {
    if (!isTocClosing) {
      return
    }
    if (isMenuOpen) {
      closeMenu()
    }
    setIsTocOpen(false)
    const t = setTimeout(() => {
      setIsTocClosing(false)
    }, 300)
    return () => clearTimeout(t)
  }, [isTocOpen, isMenuOpen, isTocClosing, closeMenu, setIsTocClosing])
  useEffect(() => {
    if (!isMenuClosing) {
      return
    }
    if (isTocOpen) {
      closeToc()
    }
    setIsMenuOpen(false)
    const t = setTimeout(() => {
      setIsMenuClosing(false)
    }, 300)
    return () => clearTimeout(t)
  }, [isMenuOpen, isTocOpen, isMenuClosing, closeToc, setIsMenuClosing])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }
    const clickHandler = (e: MouseEvent) => {
      if (e.target && e.target instanceof HTMLElement) {
        if (menuMenu.current && e.target !== menuMenu.current && menuMenu.current.contains(e.target)) {
          // pass
        } else if (menuButton.current && e.target !== menuButton.current && menuButton.current.contains(e.target)) {
          // pass
        } else {
          e.preventDefault()
          closeMenu()
        }
      }
    }

    document.addEventListener('click', clickHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [isMenuOpen, isTocOpen, closeMenu])

  useEffect(() => {
    if (!isTocOpen) {
      return
    }
    const clickHandler = (e: MouseEvent) => {
      if (e.target && e.target instanceof HTMLElement) {
        if (tocMenu.current && e.target !== tocMenu.current && tocMenu.current.contains(e.target)) {
          // pass
        } else if (tocButton.current && e.target !== tocButton.current && tocButton.current.contains(e.target)) {
          // pass
        } else {
          e.preventDefault()
          closeToc()
        }
      }
    }

    document.addEventListener('click', clickHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [isMenuOpen, isTocOpen, closeToc])

  return (
    <>
      <AsideContainer>
        <AsideInner>
          <div>
            <TopRow>
              <LogoContainer href="/">
                <Logo src="/images/logo.png" alt="" />
                <LogoText>palmenhq</LogoText>
              </LogoContainer>

              {toc.length > 0 && (
                <BurgerContainer ref={tocButton}>
                  <Burger
                    isOpen={isTocOpen}
                    isClosing={isTocClosing}
                    onClick={() => {
                      if (isTocOpen) {
                        closeToc()
                      } else {
                        openToc()
                      }
                    }}
                  >
                    TOC
                  </Burger>
                </BurgerContainer>
              )}

              <BurgerContainer ref={menuButton}>
                <Burger
                  isOpen={isMenuOpen}
                  isClosing={isMenuClosing}
                  onClick={() => {
                    if (isMenuOpen) {
                      closeMenu()
                    } else {
                      openMenu()
                    }
                  }}
                >
                  Menu
                </Burger>
              </BurgerContainer>
            </TopRow>

            <Menu isOpen={isMenuOpen} isClosing={isMenuClosing} ref={menuMenu} aria-hidden={!isMenuOpen}>
              <ul>
                <MenuItem>
                  <MenuLink href="/">Start</MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink href="/about/">About Palmen</MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink href="/annotated/">@Annotated blog</MenuLink>
                </MenuItem>
              </ul>
            </Menu>

            {toc.length > 0 && (
              <>
                <TocHeadline>ToC</TocHeadline>
                <Menu
                  isOpen={isTocOpen}
                  isClosing={isTocClosing}
                  dangerouslySetInnerHTML={{ __html: toc }}
                  onClick={() => {
                    closeToc()
                  }}
                  ref={tocMenu}
                  aria-hidden={!isTocOpen}
                />
              </>
            )}
          </div>

          <Socials>
            Find me on{' '}
            <a href={linkedinHref} target="_blank" title="Johan Palmfjord">
              <LinkedinIcon />
            </a>
            ,{' '}
            <a href={githubHref} target="_blank" title="palmenhq">
              <GithubIcon />
            </a>
            , and{' '}
            <a href="mailto:johan@palmenhq.dev" title="johan@palmenhq.dev">
              <EmailIcon />
            </a>
          </Socials>
        </AsideInner>
      </AsideContainer>
      {(isMenuOpen || isTocOpen || isMenuClosing || isTocClosing) && (
        <Overlay isOpen={isMenuOpen || isTocOpen} isClosing={isMenuClosing || isTocClosing} />
      )}
    </>
  )
}
