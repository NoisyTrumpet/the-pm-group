import { Grid, Box } from "@chakra-ui/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import Link from "../Link/Link"
import "./styles.scss"

const CompaniesGrid = ({ companies, image }) => {
  return (
    <Box position={`relative`} display="grid" placeItems="center">
      <Box
        style={{ gridArea: `1/1` }}
        zIndex={4}
        px={[4, 8, 12]}
        height={`fit-content`}
      >
        <Grid
          templateColumns={[
            `repeat(2, 1fr)`,
            `repeat(3, 1fr)`,
            `repeat(6, 1fr)`,
          ]}
          placeItems="center"
          gap={6}
        >
          {companies.map(item => (
            <Box
              key={item.companyLink}
              display="grid"
              placeItems="center"
              maxWidth={[100, 180, 200, 250]}
              className="companyItem"
            >
              <Link to={item.companyLink}>
                <GatsbyImage
                  image={getImage(item.companyImage.localFile)}
                  alt={item.companyLink}
                  style={{ maxWidth: `100%` }}
                />
              </Link>
            </Box>
          ))}
        </Grid>
      </Box>
      {image ? (
        <GatsbyImage
          image={getImage(image?.localFile?.childImageSharp)}
          alt={`PM Group`}
          style={{ gridArea: "1/1", maxHeight: `400px`, width: `100%` }}
          objectPosition={`bottom center`}
        />
      ) : null}
    </Box>
  )
}

export default CompaniesGrid
