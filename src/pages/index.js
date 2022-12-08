import * as React from "react"
import { graphql } from "gatsby"

import Seo from "gatsby-plugin-wpgraphql-seo"
import Hero from "../components/Hero/Hero"
// Loadable Components:
import loadable from "@loadable/component"
import PrimaryCTA from "../components/PrimaryCTA"
// Loadable Components:
const TextImageBlock = loadable(() => import("../components/TextImageBlock"))
const Features = loadable(() => import("../components/Features"))
const ParallaxCTA = loadable(() => import("../components/ParallaxCTA"))
const ContactForm = loadable(() => import("../components/ContactForm"))
const CompaniesGrid = loadable(() => import("../components/CompaniesGrid"))

// import Features from "../components/Features"
// import ParallaxCTA from "../components/ParallaxCTA"
// import ContactForm from "../components/ContactForm"
// import CompaniesGrid from "../components/CompaniesGrid"

const IndexPage = ({ data: { wpPage } }) => {
  const {
    headline: heroTitle,
    subcaption: heroCaption,
    hero,
    primaryCta,
    aboutSection,
    services,
    secondaryCta,
    howWeGotHere,
    contactSection: contactInfo,
    companies: { companyItem: companies, backgroundImage: companiesBackground },
  } = wpPage.homeFields

  const { slider: slides } = hero

  const {
    primaryCtaFields: ctaItems,
    ctaLink: { url: ctaLink },
    ctaText,
  } = primaryCta

  const {
    title: aboutTitle,
    content: aboutContent,
    image: aboutImage,
  } = aboutSection

  // Parallax CTA:
  const { title: secondaryCTAText, image: secondaryCTAImage } = secondaryCta

  // How we got here:
  const { title: gotHereTitle, content: gotHereText, image: gotHereImage } = howWeGotHere
  // Contact Section
  // Custom Schema
  const schema = wpPage?.customSchema.customSchema

  if (wpPage.seo) {
    wpPage.seo.metaRobotsNoindex = "index"
    wpPage.seo.metaRobotsNofollow = "follow"
  }

  return (
    <>
      {schema && <div dangerouslySetInnerHTML={{ __html: schema }} />}
      {wpPage.seo && <Seo post={wpPage} />}
      <Hero
        // image={getImage(heroImage.localFile.childImageSharp)}
        alt={heroTitle}
        title={heroTitle}
        caption={heroCaption}
        slides={slides}
      />
      <PrimaryCTA items={ctaItems} link={ctaLink} ctaText={ctaText} />
      <TextImageBlock
        title={aboutTitle}
        content={aboutContent}
        image={aboutImage}
        isSmall
        loading={"eager"}
      />
      <Features features={services} />
      <ParallaxCTA text={secondaryCTAText} image={secondaryCTAImage} />
      <TextImageBlock
        title={gotHereTitle}
        content={gotHereText}
        image={gotHereImage}
        isSmall
        loading={"lazy"}
      />
      <ContactForm contactData={contactInfo} />
      <CompaniesGrid companies={companies} image={companiesBackground} />
    </>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query GET_PAGE {
    wpPage(title: { eq: "Home" }) {
      title
      uri
      nodeType
      customSchema {
        customSchema
      }
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
      homeFields {
        hero {
          slider {
            textGradientStyle
            caption
            title
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 60
                    placeholder: NONE
                    layout: CONSTRAINED
                    formats: [WEBP, PNG]
                  )
                }
              }
            }
            link {
              url
              target
            }
          }
        }
        companies {
          backgroundImage {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  formats: [WEBP, PNG]
                  quality: 60
                  placeholder: NONE
                  layout: CONSTRAINED
                )
              }
            }
          }
          companyItem {
            companyLink
            companyImage {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    quality: 60
                    placeholder: NONE
                    layout: CONSTRAINED
                    formats: [WEBP, PNG]
                  )
                }
              }
            }
          }
        }
        howWeGotHere {
          content
          title
          image {
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
        primaryCta {
          ctaLink {
            url
          }
          ctaText
          primaryCtaFields {
            title
            link
          }
        }
        secondaryCta {
          title
          link
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  quality: 60
                  formats: [WEBP, PNG]
                  layout: CONSTRAINED
                  placeholder: NONE
                )
              }
            }
          }
        }
        subcaption
        services {
          ctaLink {
            url
          }
          ctaText
          serviceEntry {
            content
            icon
            title
          }
        }
        headline
        aboutSection {
          title
          content
          image {
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
        contactSection {
          body
          fieldGroupName
          title
          name
          position
          phoneNumber
          email
          blurb
          franPhoto {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  quality: 60
                  placeholder: NONE
                  formats: [WEBP, PNG]
                )
              }
            }
          }
        }
      }
    }
  }
`
