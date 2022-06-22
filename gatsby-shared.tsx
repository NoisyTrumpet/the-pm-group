import React from "react"
import { Script } from "gatsby"
import type { GatsbyBrowser, GatsbySSR } from "gatsby"
import Layout from "Components/Layout/Layout"
import { ApolloProvider } from "@apollo/client"
import { client } from "Hooks/apolloClient"

/**
 * Shared `wrapPageElement` and `wrapRootElement` functions to be
 * re-exported in gatsby-browser and gatsby-ssr.
 */

export const wrapPageElement:
  | GatsbyBrowser[`wrapPageElement`]
  | GatsbySSR[`wrapPageElement`] = ({ element, props }): JSX.Element => (
  <>
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
    <ApolloProvider client={client}>
      <Layout {...props}>{element}</Layout>
    </ApolloProvider>
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
