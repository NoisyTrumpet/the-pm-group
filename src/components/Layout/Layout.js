/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ChakraProvider } from "@chakra-ui/react"
import Header from "../../components/Header/header"
import theme from "../../@chakra-ui/gatsby-plugin/theme"
import "@fontsource/montserrat/latin-500.css"
import "@fontsource/montserrat/latin-600.css"
import "@fontsource/montserrat/latin-700.css"
import { SEOContext } from "gatsby-plugin-wpgraphql-seo"
import Footer from "../Footer"
import "../layout.scss"

const Layout = ({ children }) => {
  const {
    wp: { seo },
  } = useStaticQuery(graphql`
    query SiteInfoQuery {
      wp {
        seo {
          contentTypes {
            post {
              title
              schemaType
              metaRobotsNoindex
              metaDesc
            }
            page {
              metaDesc
              metaRobotsNoindex
              schemaType
              title
            }
          }
          webmaster {
            googleVerify
            yandexVerify
            msVerify
            baiduVerify
          }
          schema {
            companyName
            personName
            companyOrPerson
            wordpressSiteName
            siteUrl
            siteName
            inLanguage
            logo {
              sourceUrl
              mediaItemUrl
              altText
            }
          }
          social {
            facebook {
              url
              defaultImage {
                sourceUrl
                mediaItemUrl
              }
            }
            instagram {
              url
            }
            linkedIn {
              url
            }
            mySpace {
              url
            }
            pinterest {
              url
              metaTag
            }
            twitter {
              username
            }
            wikipedia {
              url
            }
            youTube {
              url
            }
          }
        }
      }
    }
  `)
  // pt={["80.14px", "80.14px", "80.14px", "89.14px", "89.14px"]}
  return (
    <ChakraProvider theme={theme}>
      <SEOContext.Provider value={{ global: seo }}>
        <Header siteTitle={seo.schema.siteName} />
        <main>{children}</main>
        <Footer />
      </SEOContext.Provider>
    </ChakraProvider>
  )
}

export default Layout
