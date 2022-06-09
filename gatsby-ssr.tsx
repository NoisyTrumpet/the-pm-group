import React from "react"
import type { GatsbySSR } from "gatsby"

export { wrapPageElement, wrapRootElement } from "./gatsby-shared"


const resolveUrl = url => {
  if (
    url.hostname === 'www.google-analytics.com' ||
    url.hostname === 'connect.facebook.net' ||
    url.hostname === 'analytics.tiktok.com'
  ) {
    var proxyUrl = new URL(`https://coop-atm.mygenfcu.workers.dev/?${url.href}`)
    // proxyUrl.searchParams.append('', )
    return proxyUrl
  }
  return url
}

export const onRenderBody: GatsbySSR[`onRenderBody`] = ({
  setHeadComponents,
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
          debug: false,
          resolveUrl: ${resolveUrl}
        }`,
      }}
    />,
  ])
}
