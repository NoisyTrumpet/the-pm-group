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
      href="/static/montserrat-latin-500-normal-38a674fae449557fef97f120c301ff8d.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      key="preload-montserrat-latin-700"
      href="/static/montserrat-latin-700-normal-56c09b9a46af6a54eeb30e554f833d13.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      key="preload-montserrat-latin-600"
      href="/static/montserrat-latin-600-normal-5d6df38dd70f631c488bdec905f68464.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <Script
      key="google-tag-manager-head"
      strategy="post-hydrate"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GATSBY_GOOGLE_TAG_MANAGER_ID}');`,
      }}
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
