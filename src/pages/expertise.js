import * as React from "react"
import { Box, Text } from "@chakra-ui/layout"
import Layout from "../components/Layout/Layout"
import { graphql } from "gatsby"

import Seo from "gatsby-plugin-wpgraphql-seo"
import { ctaItems, ctaLink, ctaText } from "../constants/cta"
import CapabilitiesGrid from "../components/CapabilitiesGrid"
import ClientList from "../components/ClientList"
import GenericHero from "../components/GenericHero"
import PrimaryCTA from "../components/PrimaryCTA"

const ExpertisePage = ({ data: { wpPage } }) => {
  // Hero Fields :
  const heroImage =
    wpPage.expertiseFields.expertiseHero.expertiseHeroImage.localFile
      .childImageSharp
  const heroTitle = wpPage.expertiseFields.expertiseHero.title
  //  Capabilties Section :
  const capability = wpPage.expertiseFields.capabilitiesGrid.capabilityCard
  // Clients Hero
  const clientHero = wpPage.expertiseFields.clientList.title
  // Clients List
  const clientArray = wpPage.expertiseFields.clientList.client

  return (
    <Layout>
      <Seo post={wpPage} />
      <GenericHero title={heroTitle} image={heroImage} isSmall />
      <PrimaryCTA items={ctaItems} link={ctaLink} ctaText={ctaText} />
      <CapabilitiesGrid capabilities={capability} />
      <Box
        className="clientsTitleWrapper"
        style={{
          backgroundColor: `#16171d`,
          width: `100%`,
          textAlign: `center`,
        }}
        my={10}
      >
        <Box className="clientsTitleInner">
          <Text
            tag="h2"
            py={10}
            textTransform="uppercase"
            color="secondary"
            fontSize={["xl", "2xl", "3xl"]}
          >
            {clientHero}
          </Text>
        </Box>
      </Box>
      <ClientList clients={clientArray} />
    </Layout>
  )
}

export default ExpertisePage

export const expertisePageQuery = graphql`
  query GET_EXP_PAGE {
    wpPage(title: { eq: "Expertise" }) {
      title
      uri
      nodeType
      seo {
        title
        metaDesc
        metaKeywords
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphTitle
        opengraphDescription
        opengraphImage {
          altText
          sourceUrl
          srcSet
        }
        twitterTitle
        twitterDescription
        twitterImage {
          altText
          sourceUrl
          srcSet
        }
        canonical
        cornerstone
        schema {
          articleType
          pageType
          raw
        }
      }
      expertiseFields {
        expertiseHero {
          title
          expertiseHeroImage {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  quality: 90
                  formats: [WEBP, PNG]
                  layout: CONSTRAINED
                  placeholder: BLURRED
                )
              }
            }
          }
        }
        clientList {
          title
          client {
            link
            name
          }
        }
        capabilitiesGrid {
          capabilityCard {
            cardBody
            cardTitle
            cardImage {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 90
                    formats: [WEBP, PNG]
                    layout: CONSTRAINED
                    placeholder: BLURRED
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`
