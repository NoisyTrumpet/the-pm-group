import * as React from "react"
import { graphql } from "gatsby"

import { Text, Box } from "@chakra-ui/layout"

import Seo from "gatsby-plugin-wpgraphql-seo"
import AboutTeamGrid from "../components/AboutTeamGrid"
import GenericHero from "../components/GenericHero"
import PrimaryCTA from "../components/PrimaryCTA"
import { ctaItems, ctaLink, ctaText } from "../constants/cta"
import Features from "../components/Features"
// import {modifySchema} from "../utils/modifySchema"

const AboutPage = ({ data: { wpPage } }) => {
  const { seo, aboutFields, title, slug } = wpPage

  // About Hero Fields :
  const aboutHero =
    aboutFields.aboutHero.aboutBackgroundImage.localFile.childImageSharp
  const aboutTitle = aboutFields.aboutHero.aboutTitle
  // About Icon Array Fields :
  const aboutIconArray = aboutFields.aboutGrid.aboutEntry
  // About Team Hero
  const aboutTeamTitle = aboutFields.aboutTeamHero.aboutTeamHeroTitle
  // About Team Repeater
  const teamRepeater = aboutFields.aboutTeam.aboutImageRepeater

  if (seo) {
    // Replace all instances of '"/"' in seo.schema.raw with '"https://thepmgrp.com/"'
    const schemaRaw = seo.schema.raw.replace(/"\/"/g, '"https://thepmgrp.com/"')
    // Initalize schema object
    const schemaObj = JSON.parse(schemaRaw)
    // Modify breadcrumb list
    const breadcrumbList = schemaObj["@graph"][1]
    // breadcrumbList["@context"] = "https://schema.org"
    delete breadcrumbList["@id"]
    // Home
    breadcrumbList["itemListElement"][0].item = {
      "@id": `${breadcrumbList["itemListElement"][0].item}`,
      name: "Home",
    }
    delete breadcrumbList["itemListElement"][0].name
    // About
    breadcrumbList["itemListElement"][1].item = {
      "@id": `https://thepmgrp.com/${slug}/`,
      name: title,
    }
    delete breadcrumbList["itemListElement"][1].name

    seo.schema.raw = JSON.stringify(schemaObj)
    seo.metaRobotsNoindex = "index"
    seo.metaRobotsNofollow = "follow"
  }

  return (
    <>
      {seo && <Seo post={wpPage} />}
      <GenericHero title={aboutTitle} image={aboutHero} />
      <PrimaryCTA items={ctaItems} link={ctaLink} ctaText={ctaText} />
      <Features features={aboutIconArray} isAbout />
      <Box
        className="aboutTeamTitleWrapper"
        backgroundColor="black"
        width={`100%`}
        textAlign="center"
        mt={10}
      >
        <Box className="aboutTeamTitleInner">
          <Text
            tag="h2"
            py={10}
            textTransform="uppercase"
            color="secondary"
            fontSize={["xl", "2xl", "3xl"]}
          >
            {aboutTeamTitle}
          </Text>
        </Box>
      </Box>

      <AboutTeamGrid team={teamRepeater} />
    </>
  )
}

export default AboutPage

export const aboutPageQuery = graphql`
  query GET_ABOUT_PAGE {
    wpPage(title: { eq: "About" }) {
      title
      uri
      nodeType
      slug
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
      slug
      aboutFields {
        aboutHero {
          aboutTitle
          aboutBackgroundImage {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  quality: 90
                  formats: [WEBP, PNG]
                  layout: CONSTRAINED
                  placeholder: NONE
                )
              }
            }
          }
        }
        aboutGrid {
          aboutEntry {
            content
            title
            icon
          }
        }
        aboutTeamHero {
          aboutTeamHeroTitle
          aboutTeamHeroImage {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  quality: 90
                  formats: [WEBP, PNG]
                  layout: CONSTRAINED
                  placeholder: NONE
                )
              }
            }
          }
        }
        aboutTeam {
          aboutImageRepeater {
            teamJobTitle
            teamName
            teamLink {
              title
              url
            }
            teamImage {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 90
                    formats: [WEBP, PNG]
                    layout: CONSTRAINED
                    placeholder: NONE
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
