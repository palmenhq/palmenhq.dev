import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

export const Burger = styled.button<{ isOpen: boolean; isClosing: boolean }>`
  position: relative;
  color: ${(p) => (p.isOpen && !p.isClosing ? 'transparent' : 'var(--foreground)')};
  font: inherit;
  font-size: 0.9em;
  padding: 0;
  line-height: 2;
  transition: color 300ms, background-color 300ms, transform 300ms, top 300ms, bottom 300ms;
  background: transparent;
  border: 0;

  ::before,
  ::after {
    position: absolute;
    left: 0;
    right: 0;
    content: ' ';
    width: 100%;
    height: 3px;
    background-color: var(--foreground);
    transition: background-color 300ms, transform 300ms, top 300ms, bottom 300ms;

    ${(p) =>
      p.isOpen &&
      !p.isClosing &&
      css`
        width: calc(100% - 1.5px);
      `}
  }

  ::before {
    top: 0;
    ${(p) =>
      p.isOpen &&
      !p.isClosing &&
      css`
        top: 50%;
        transform: translateY(-1.5px) rotate(45deg);
        background-color: var(--primary);
      `};
  }
  ::after {
    bottom: 0;
    ${(p) =>
      p.isOpen &&
      !p.isClosing &&
      css`
        bottom: 50%;
        transform: translateY(1.5px) rotate(-45deg);
        background-color: var(--primary);
      `};
  }
`
