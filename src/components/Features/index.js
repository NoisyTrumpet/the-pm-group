import { Box, Heading, SimpleGrid } from "@chakra-ui/react"
import * as React from "react"
import { FiMoon } from "react-icons/fi"
import Link from "../Link/Link"
import { Feature } from "./Fragments/Feature"

const Features = ({ features }) => {
  return (
    <Box
      as="section"
      maxW="1300px"
      mx="auto"
      py="12"
      px={{
        base: "6",
        md: "8",
      }}
    >
      {/* @TODO: Make this field come from backend */}
      <Heading as="h2" color="black" textAlign="center" mb={6}>
        WHAT CAN WE DO FOR YOU?
      </Heading>
      <SimpleGrid
        columns={[1, 2, 2, 3]}
        spacingX="10"
        spacingY={{
          base: "8",
          md: "14",
        }}
      >
        {features.serviceEntry.map(feature => (
          <Feature title={feature.title} icon={<FiMoon color={`black`} />}>
            <div
              dangerouslySetInnerHTML={{ __html: feature.content }}
              style={
                feature.title === "EVENTS, PROMOTIONS, AND FUNDRAISERS" && {
                  marginBottom: `30px`,
                  justifyContent: `center`,
                  textAlign: "left",
                }
              }
            />
            {feature.title === "EVENTS, PROMOTIONS, AND FUNDRAISERS" && (
              <Link
                to={features.ctaLink}
                mt={10}
                bg={`secondary`}
                px={6}
                py={4}
                color={`black`}
                mx={`auto`}
                textAlign="center"
                textTransform={`uppercase`}
              >
                {features.ctaText}
              </Link>
            )}
          </Feature>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Features