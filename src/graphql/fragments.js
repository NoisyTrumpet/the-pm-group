import { graphql } from "gatsby"

export const WpGravityFormsFormFragment = graphql`
  fragment WpGravityFormsFormFragment on WpGfForm {
    formId
    title
    description
    button {
      text
    }
    confirmations {
      isDefault
      message
    }
    formFields {
      nodes {
        ... on WpNameField {
          id
          label
          type
          nameValues {
            first
            last
          }
          nameFormat
          isRequired
          errorMessage
          enableAutocomplete
          allowsPrepopulate
          size
          subLabelPlacement
          description
        }
        ... on WpEmailField {
          id
          label
          type
          isRequired
          enableAutocomplete
          cssClass
        }
        ... on WpWebsiteField {
          id
          label
          type
          isRequired
          enableAutocomplete
          cssClass
        }
        ... on WpTextAreaField {
          id
          formId
          label
          description
          cssClass
          isRequired
        }
        ... on WpFileUploadField {
          id
          label
          type
          description
          isRequired
          cssClass
        }
      }
    }
  }
`
