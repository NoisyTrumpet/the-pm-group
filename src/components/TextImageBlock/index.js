import { Container, Box, Grid, Heading } from "@chakra-ui/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"

const TextImageBlock = ({
  title,
  content,
  image,
  isSmall,
  isLeft,
  loading,
}) => {
  const sideImage = getImage(image?.localFile?.childImageSharp)
  return (
    <Container
      my={8}
    >
      <Grid
        className="text-block-component"
        templateColumns={[
          "repeat(1, 100%)",
          "repeat(1, 100%)",
          "repeat(1, 100%)",
          "repeat(1, 100%)",
          "repeat(2, 50%)",
        ]}
        mx={`auto`}
      >
        <Box
          className="text-block-copy-wrapper"
          py={[12, 18, 20]}
          px={[12, 18, isSmall ? 12 : 20, isSmall ? 12 : 32]}
        // bg={`#f0f0f0`}
        >
          <Heading
            as="h2"
            color={`black`}
            mb={4}
            letterSpacing="tight"
            fontSize={["xl", "2xl", "3xl"]}
          >
            {title}
          </Heading>

          <Box color="black" dangerouslySetInnerHTML={{ __html: content }} />
        </Box>
        <Box display="grid" position="relative"
          sx={{
            img: {
              objectFit: "contain",
            }
          }}
        >
          {sideImage ? (
            <GatsbyImage
              image={sideImage}
              alt={title}
              quality={100}
              objectFit="contain"
              loading={loading}
              objectPosition={isLeft && "left"}
            // style={{
            //   gridArea: "1/1",
            //   width: `100%`,
            //   maxWidth: "100%",
            //   objectFit: "contain",
            // }}
            />
          ) : (
            null
          )}
        </Box>
      </Grid>
    </Container>
  )
}

export default TextImageBlock
