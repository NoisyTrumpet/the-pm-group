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
    <link
      rel="preload"
      key="preload-montserrat-latin-500"
      href="https://thepmgrp.com/static/montserrat-latin-500-normal-38a674fae449557fef97f120c301ff8d.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />,
    <link
      rel="preload"
      key="preload-montserrat-latin-700"
      href="https://thepmgrp.com/static/montserrat-latin-700-normal-56c09b9a46af6a54eeb30e554f833d13.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />,
    <link
      rel="preload"
      key="preload-montserrat-latin-600"
      href="https://thepmgrp.com/static/montserrat-latin-600-normal-5d6df38dd70f631c488bdec905f68464.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />,
    <link
      rel="preload"
      key="preload-cloudfront-montserrat-latin-500"
      href="https://d33wubrfki0l68.cloudfront.net/9cd9f5a2f86f1d42390141d91619a0aa41a276b7/409e6/static/montserrat-latin-500-normal-38a674fae449557fef97f120c301ff8d.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />,
    <link
      rel="preload"
      key="preload-cloudfront-montserrat-latin-700"
      href="https://d33wubrfki0l68.cloudfront.net/f3708b707b65e241b0f1c819d5f7bf7da8412653/641cb/static/montserrat-latin-700-normal-56c09b9a46af6a54eeb30e554f833d13.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />,
    <link
      rel="preload"
      key="preload-cloudfront-montserrat-latin-600"
      href="https://d33wubrfki0l68.cloudfront.net/e12420f5e4da3ccdc75a58ce744e7d5a0c6cf79e/8d631/static/montserrat-latin-600-normal-5d6df38dd70f631c488bdec905f68464.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />,
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
