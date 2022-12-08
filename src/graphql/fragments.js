import { graphql } from "gatsby"

export const WpGfFormFragment = graphql`
  fragment WpGfFormFragment on WpGfForm {
    id
    title
    description
    submitButton {
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
