import { css } from '@emotion/react'
import { CSSInterpolation } from '@emotion/serialize'

export const mediaTabletUp = (template: TemplateStringsArray, ...args: Array<CSSInterpolation>) => css`
  @media (min-width: 481px) {
    ${css(template, ...args)}
  }
`

export const mediaDesktopSmUp = (template: TemplateStringsArray, ...args: Array<CSSInterpolation>) => css`
  @media (min-width: 768px) {
    ${css(template, ...args)}
  }
`
