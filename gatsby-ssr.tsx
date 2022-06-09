import React from "react"
import type { GatsbySSR } from "gatsby"

export { wrapPageElement, wrapRootElement } from "./gatsby-shared"

export const onRenderBody: GatsbySSR[`onRenderBody`] = ({
  setHeadComponents,
  setPreBodyComponents
}): void => {
  /**
   * Enable debug mode via Partytown's vanilla config. Change to `debug: true` to enable.
   * @see {@link https://partytown.builder.io/configuration#vanilla-config}
   */
  setHeadComponents([
    <script
      key="debug"
      dangerouslySetInnerHTML={{
        __html: `partytown = {
          debug: true
        }`,
      }}
    />,
  ]),
  setPreBodyComponents([
    <noscript
      key="google-tagmanager-body"
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GATSBY_GOOGLE_TAG_MANAGER_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />,
  ])
}
