import React from "react"
import { Script } from "gatsby"

// const resolveUrl = url => {
//   if (
//     url.hostname === "www.google-analytics.com" ||
//     url.hostname === "connect.facebook.net" ||
//     url.hostname === "analytics.tiktok.com"
//   ) {
//     var proxyUrl = new URL(`https://coop-atm.mygenfcu.workers.dev/?${url.href}`)
//     // proxyUrl.searchParams.append('', )
//     return proxyUrl
//   }
//   return url
// }

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <link
      rel="preconnect"
      key="dns-prefetch-google-tag-manager"
      href="https://www.googletagmanager.com"
      as="script"
      crossOrigin="anonymous"
    />,
    <link
      rel="preconnect"
      key="dns-prefetch-connect-facebook"
      href="https://connect.facebook.net"
      as="script"
      crossOrigin="anonymous"
    />,
    <link
      rel="preload"
      key="preload-montserrat-latin-500"
      href="/static/montserrat-latin-500-normal-f41a91ec0ef285c804abfbf08972d7de.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    <link
      rel="preload"
      key="preload-montserrat-latin-700"
      href="/static/montserrat-latin-700-normal-145c46aabb2eccdd1f7bfb2983b6d5e4.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,

    // <Script
    //   key="google-tag-manager-head"
    //   id={`google-tag-manager-head`}
    //   strategy="off-main-thread"
    //   forward={[`gtag`]}
    //   dangerouslySetInnerHTML={{
    //     __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    //     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    //     })(window,document,'script','dataLayer','${process.env.GATSBY_GOOGLE_TAG_MANAGER_ID}');`,
    //   }}
    // />,
    <Script
    id="google-tag-manager-head"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GOOGLE_TAG_MANAGER_ID}`}
      strategy="off-main-thread"
      forward={[`gtag`]}
    />,
    <Script id="gtag-config" strategy="off-main-thread">
      {`
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() { window.dataLayer.push(arguments) }
    gtag('js', new Date())
    gtag('config', ${process.env.GATSBY_GOOGLE_TAG_MANAGER_ID}, { send_page_view: false })
  `}
    </Script>,
    <script
      key="test"
      dangerouslySetInnerHTML={{
        __html: `partytown = { debug: true }`,
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
// Create action to rewrite requests from /__third-party-proxy?url=${YOUR_URL} to YOUR_URL with a 200 status code.
