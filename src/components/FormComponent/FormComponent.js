import { Box, Container, Text } from "@chakra-ui/react"
import { GravityForm } from "Components/GravityForm"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"

const FormComponent = ({ formId, id, title, subtitle, content }) => {
  const data = useStaticQuery(graphql`
    query {
      wpGravityFormsForm(formId: { eq: 1 }) {
        ...GravityFormFields
      }
    }
  `)
  const { wpGravityFormsForm: form } = data

  return (
    <Box id={id} mb={[8, 16]} mt={!title && 10}>
      <Container>
        {/* Title */}
        {title && (
          <Text variant="title" color="color" my={8}>
            {title}
          </Text>
        )}
        <Box bg="altGray" py={[16]} px={[8, 20, 32]} borderRadius={12}>
          {/* SubTitle */}
          {subtitle && (
            <Text
              fontSize="lg"
              color="black"
              fontWeight={600}
              letterSpacing="0.035em"
            >
              {subtitle}
            </Text>
          )}
          {/* Content */}
          {content && (
            <Box
              dangerouslySetInnerHTML={{ __html: content }}
              color="black"
              sx={{ p: { letterSpacing: "0.035em" } }}
            />
          )}
          {form && <GravityForm form={form} />}
        </Box>
      </Container>
    </Box>
  )
}

export default FormComponent
