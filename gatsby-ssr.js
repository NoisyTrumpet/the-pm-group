import React from "react"
import { Partytown } from "@builder.io/partytown/react"
export { wrapPageElement, wrapRootElement } from "./gatsby-shared"

const resolveUrl = url => {
  if (
    url.hostname === "www.google-analytics.com" ||
    url.hostname === "connect.facebook.net" ||
    url.hostname === "analytics.tiktok.com"
  ) {
    var proxyUrl = new URL(`https://coop-atm.mygenfcu.workers.dev/?${url.href}`)
    // proxyUrl.searchParams.append('', )
    return proxyUrl
  }
  return url
}

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <Partytown
      key="partytown"
      debug={false}
      forward={["dataLayer.push", "fbq", "ttq.load", "ttq.page", "ttq.track"]}
      resolveUrl={resolveUrl}
    />,
    <script
      key="google-tag-manager-head"
      type="text/partytown"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GATSBY_GOOGLE_TAG_MANAGER_ID}');`,
      }}
    />,
  ]),
    setPreBodyComponents([
      <noscript
        type="text/partytown"
        key="google-tagmanager-body"
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GATSBY_GOOGLE_TAG_MANAGER_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />,
    ])
}
