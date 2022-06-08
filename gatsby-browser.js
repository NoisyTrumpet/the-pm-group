const React = require("react")
const { Script } = require(`gatsby`)
const Layout = require("./src/components/Layout/Layout").default
const ReactDOM = require('react-dom/client')

exports.wrapPageElement = ({ element, props }) => {
  return (
    <>
      <link
        rel="preconnect"
        key="dns-prefetch-google-tag-manager"
        href="https://www.googletagmanager.com"
        as="script"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        key="dns-prefetch-connect-facebook"
        href="https://connect.facebook.net"
        as="script"
        crossOrigin="anonymous"
      />
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
      <script
        key="test"
        dangerouslySetInnerHTML={{
          __html: `partytown = { debug: true }`,
        }}
      />
      <Layout {...props}>{element}</Layout>
    </>
  )
}



exports.replaceHydrateFunction = () => {
  return (element, container) => {
    ReactDOM.createRoot(container, {}).render(element)
  }
}
