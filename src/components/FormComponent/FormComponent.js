import { Box } from "@chakra-ui/layout"
import { GravityForm } from "Components/GravityForm"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"

const FormComponent = ({ formId, id, title, subtitle, content }) => {
  const data = useStaticQuery(graphql`
    query FormQuery {
      wpGfForm(title: { eq: "Contact" }) {
        ...GravityFormFields
      }
    }
  `)
  const { wpGfForm: form } = data

  return (
    <Box id={id} mb={[8, 16]} mt={!title && 10} px={4} maxWidth={600}>
      {form && <GravityForm form={form} />}
    </Box>
  )
}

export default FormComponent
