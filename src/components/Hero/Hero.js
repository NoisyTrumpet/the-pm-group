import { Button, useColorModeValue, IconButton } from "@chakra-ui/react"
import { Box, Stack, Text, Grid, GridItem, Flex } from "@chakra-ui/layout"
import React from "react"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import HeroCarousel from "./Fragments/HeroCarousel"

import "./Hero.scss"

const Hero = ({ title, caption, slides }) => {
  return (
    <Box bg="#1A202C" as="section" minH="140px" position="relative">
      <Grid
        templateColumns={[
          "repeat(1, 100%)",
          "repeat(1, 100%)",
          "repeat(1, 100%)",
          "repeat(1, 100%)",
        ]}
      >
        <GridItem
          maxW={{
            base: "xl",
            md: "7xl",
          }}
          px={{
            base: "6",
            md: "8",
          }}
          pt={[8]}
          pb={[4]}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          color={`white`}
        >
          <Text
            as="h1"
            fontSize={["lg", "2xl", "3xl", "4xl"]}
            fontWeight="extrabold"
          >
            {title}
          </Text>
          {caption && (
            <Text
              fontSize={{
                md: "2xl",
              }}
              mt="4"
              // maxW="lg"
            >
              {caption}
            </Text>
          )}
          <Stack
            direction={{
              base: "column",
              md: "row",
            }}
            spacing="4"
            h="fit-content"
            mt={10}
          >
            <Button
              as="a"
              href="/our-work/"
              backgroundColor="secondary"
              _hover={{
                backgroundColor: `black`,
                color: `secondary`,
              }}
              px="8"
              textTransform="uppercase"
              fontWeight="regular"
              borderRadius={0}
              size="lg"
              color="black"
              fontSize="md"
              maxW="fit-content"
            >
              See our Work
            </Button>
          </Stack>
        </GridItem>
        <GridItem maxW="100%">
          <HeroCarousel slides={slides} />
        </GridItem>
      </Grid>
    </Box>
  )
}

export default Hero
