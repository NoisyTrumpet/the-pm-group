import * as React from "react"
import { graphql } from "gatsby"
import Seo from "gatsby-plugin-wpgraphql-seo"
import GenericHero from "../components/GenericHero"
import { ctaItems, ctaLink, ctaText } from "../constants/cta"
import PrimaryCTA from "../components/PrimaryCTA"
import CompanyItems from "../components/CompanyItems"
import { updateSchema } from "utils"

const CompaniesPage = ({ data: { wpPage } }) => {
  const { seo } = wpPage
  const hasSchema = seo && seo.schema && seo.schema.raw !== null
  // Hero Fields
  const heroTitle = wpPage.ourCompaniesFields.companiesHero.title
  const heroImage = wpPage.ourCompaniesFields.companiesHero.image
  // Companies
  const companies = wpPage.ourCompaniesFields.companiesItems.items

  if (hasSchema) {
    const updatedSchema = updateSchema(seo, [
      {
        title: "Home",
        href: "https://thepmgrp.com/",
      },
      {
        title: wpPage.title,
        href: `https://thepmgrp.com/${wpPage.slug}/`,
      },
    ])

    seo.schema.raw = updatedSchema

    seo.metaRobotsNoindex = "index"
    seo.metaRobotsNofollow = "follow"
  }

  return (
    <>
      {wpPage.seo && <Seo post={wpPage} />}
      {heroImage && heroTitle && (
        <GenericHero title={heroTitle} image={heroImage} />
      )}
      <PrimaryCTA items={ctaItems} link={ctaLink} ctaText={ctaText} />
      <CompanyItems companies={companies} />
    </>
  )
}

export default CompaniesPage

export const companiesPageQuery = graphql`
  query GET_COMPANIES_PAGE {
    wpPage(title: { eq: "Companies" }) {
      title
      uri
      seo {
        title
        metaDesc
        focuskw
        metaKeywords
        metaRobotsNoindex
        metaRobotsNofollow
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
      ourCompaniesFields {
        companiesHero {
          image {
            gatsbyImage(width: 1920)
          }
          title
        }
        companiesItems {
          items {
            description
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 90
                    placeholder: NONE
                    layout: CONSTRAINED
                    formats: [WEBP, PNG]
                  )
                }
              }
            }
            link
            name
          }
        }
      }
    }
  }
`
