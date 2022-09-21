import React from "react"
import Carousel from "framer-motion-carousel"
import "../Hero.scss"
import { useMediaQuery } from "@chakra-ui/react"
import { Box } from "@chakra-ui/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

type Slide = {
  caption: string
  image: {
    localFile: {
      childImageSharp: {
        gatsbyImageData: {
          layout: string
          height: number
          width: number
          images: {
            fallback: {
              src: string
              srcSet: string
              sizes: string
            }
            sources: {
              srcSet: string
              type: string
              sizes: string
            }[]
          }
        }
      }
    }
  }
  link: {
    url: string
    target: string
  }
  title: string
}

interface CarouselProps {
  slides: Slide[]
}

const splitArray = (array: any, chunkSize: number) => {
  const groups = []
  for (let i = 0; i < array.length; i += chunkSize) {
    groups.push(array.slice(i, i + chunkSize))
    // Also fill in the empty space if there is any
  }
  return groups
}

const HeroCarousel: React.FC<CarouselProps> = ({ slides }) => {
    const [isMobile] = useMediaQuery("(max-width: 768px)")
  const split = splitArray(slides, 3)

  const slideLength = isMobile ? slides.length : split.length


  return (
    <Carousel
      aria-label="Hero Carousel"
      aria-labelledby="instructions"
      loop={true}
      autoPlay={true}
      interval={3000}
      renderDots={() => null}
      renderArrowLeft={({ handlePrev, activeIndex }) =>
        activeIndex === 0 ? null : (
          <button
            className={`arrow-left`}
            onClick={handlePrev}
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="24"
              viewBox="0 0 18 24"
            >
              <path
                id="Path_5"
                data-name="Path 5"
                d="M18,0,0,12,18,24Z"
                transform="translate(0 0)"
                fill="#FDBC31"
              />
            </svg>
          </button>
        )
      }
      renderArrowRight={({ handleNext, activeIndex }) =>
        activeIndex === slideLength - 1 ? null : (
                <button
                  className={`arrow-right`}
                  onClick={handleNext}
                  aria-label="Next"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="24"
                    viewBox="0 0 18 24"
                  >
                    <path
                      id="Path_6"
                      data-name="Path 6"
                      d="M18,0,0,12,18,24Z"
                      transform="translate(18 24) rotate(180)"
                      fill="#FDBC31"
                    />
                  </svg>
                </button>
              )
      }
    >
      {!isMobile ? split.map((chunk, index) => {
        return (
          <Box
            key={`chunk-${index}`}
            className="carousel__slide"
            display="flex"
            justifyContent="space-between"
          >
            {chunk.map(
              (
                slide: { link: any; image: any; caption?: any; title?: any },
                index: number
              ) => {
                const { caption, image, link, title } = slide

                return (
                  <Box
                    bg={`#1A202C`}
                    key={`slide-${index}-${title}`}
                    className={`slide`}
                    aria-label={`Slide ${index + 1}`}
                  >
                    <Box
                      py={4}
                      mx={2}
                      as="a"
                      flex={["0 0 75%", "0 0 auto"]}
                      display="grid"
                      whiteSpace="nowrap"
                      position="relative"
                      borderRadius="10px"
                      sx={{
                        img: {
                          borderRadius: "10px",
                        },
                      }}
                      w="fit-content"
                      href={slide.link?.url && slide.link.url}
                      minH="242px"
                    >
                      {title && (
                        <Box
                          as="h2"
                          fontSize="2xl"
                          fontWeight="bold"
                          color="white"
                          mb={2}
                          className={`slide-title`}
                        >
                          {title}
                        </Box>
                      )}
                      {image && (
                        <GatsbyImage
                          image={getImage(
                            slide?.image?.localFile?.childImageSharp
                          )}
                          style={{
                            maxWidth: "100%",
                            borderRadius: "10px!important",
                            gridArea: "1/1",
                          }}
                          objectFit="contain"
                          className="image-slider"
                          loading={"eager"}
                          alt={title}
                        />
                      )}
                    </Box>
                  </Box>
                )
              }
            )}
          </Box>
        )
      }) : (
        <Box
            className="carousel__slide"
            display="flex"
            justifyContent="space-between"
            >
            {slides.map(
                (
                slide: { link: any; image: any; caption?: any; title?: any },
                index: number
                ) => {
                    const {
                        caption,
                        image,
                        link,
                        title,
                    } = slide;


                    return (
                        <Box
                        bg={`#1A202C`}
                        key={`slide-${index}-${title}`}
                        className={`slide`}
                        aria-label={`Slide ${index + 1}`}
                    >
                        <Box
                          py={4}
                          mx={2}
                          as="a"
                          flex={["0 0 75%", "0 0 auto"]}
                          display="grid"
                          whiteSpace="nowrap"
                          position="relative"
                          borderRadius="10px"
                          sx={{
                            img: {
                              borderRadius: "10px",
                            },
                          }}

                          w="fit-content"
                          href={slide.link?.url && slide.link.url}
                          minH="242px"
                        >
                            {title && <Box
                                as="h2"
                                fontSize="2xl"
                                fontWeight="bold"
                                color="white"
                                mb={2}
                                className={`slide-title`}
                            >
                                {title}
                            </Box>}
                            {image && (
                                <GatsbyImage
                                image={getImage(
                                  slide?.image?.localFile?.childImageSharp
                                )}
                                style={{
                                  maxWidth: "100%",
                                  borderRadius: "10px!important",
                                  gridArea: "1/1",
                                }}
                                objectFit="contain"
                                className="image-slider"
                                loading={"eager"}
                                alt={title}
                              />
                            )}
                        </Box>
                    </Box>
                    )

                })}
        </Box>
)}
    </Carousel>
  )
}

export default HeroCarousel
