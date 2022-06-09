import React from "react"
import ReactDOM from "react-dom/client"
import { Script } from "gatsby"
import type { GatsbyBrowser, GatsbySSR } from "gatsby"
import Layout from "./src/components/Layout/Layout"
/**
 * Shared `wrapPageElement` and `wrapRootElement` functions to be
 * re-exported in gatsby-browser and gatsby-ssr.
 */

export const wrapPageElement:
  | GatsbyBrowser[`wrapPageElement`]
  | GatsbySSR[`wrapPageElement`] = ({ element, props }): JSX.Element => (
  <>
    <Script
      id="google-tag-manager-head"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GOOGLE_TAG_MANAGER_ID}`}
      strategy="off-main-thread"
      forward={[`gtag`]}
    />
    <Script id="gtag-config" strategy="off-main-thread">
      {`
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() { window.dataLayer.push(arguments) }
    gtag('js', new Date())
    gtag('config', ${process.env.GATSBY_GOOGLE_TAG_MANAGER_ID}, { send_page_view: false })
  `}
    </Script>
    <link
      rel="preload"
      key="preload-montserrat-latin-500"
      href="/static/montserrat-latin-500-normal-f41a91ec0ef285c804abfbf08972d7de.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      key="preload-montserrat-latin-700"
      href="/static/montserrat-latin-700-normal-145c46aabb2eccdd1f7bfb2983b6d5e4.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <Layout {...props}>{element}</Layout>
  </>
)

export const wrapRootElement:
  | GatsbyBrowser[`wrapRootElement`]
  | GatsbySSR[`wrapRootElement`] = ({ element }): JSX.Element => (
  <>
    {element}
    <Script>{`console.log('success loading script in wrapRootElement')`}</Script>
  </>
)

export const replaceHydrateFunction = () => {
  return (element, container) => {
    ReactDOM.createRoot(container, {}).render(element)
  }
}
