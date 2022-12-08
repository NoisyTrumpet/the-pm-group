import { gql, useMutation } from "@apollo/client"
import { Box, Button, FormErrorMessage, Text, useToast } from "@chakra-ui/react"
import {
  FieldError,
  FormField,
  GravityFormsForm as GravityFormsFormType,
} from "Graphql/formGraphql"
import useGravityForm from "Hooks/useGravityForm"
import { graphql } from "gatsby"
import React, { useEffect } from "react"

import GravityFormsField from "./GravityFormsField"

export const GRAVITY_FORM_FIELDS = graphql`
  fragment GravityFormFields on WpGfForm {
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
        id
        type
        ...AddressFieldFields
        ...CheckboxFieldFields
        ...DateFieldFields
        ...EmailFieldFields
        # ...MultiSelectFieldFields
        ...NameFieldFields
        ...PhoneFieldFields
        ...RadioFieldFields
        ...SelectFieldFields
        ...TextFieldFields
        ...TextAreaFieldFields
        ...TimeFieldFields
        ...WebsiteFieldFields
        ...FileUploadFieldFields
      }
    }
  }
`

const SUBMIT_FORM = gql`
  mutation submitForm($id: Int!, $fieldValues: [FieldValuesInput]) {
    submitGfForm(
      input: { id: $id, fieldValues: $fieldValues }
    ) {
      entryId
      errors {
        id
        message
      }
    }
  }
`

interface Props {
  form: GravityFormsFormType
}

export default function Form({ form }: Props) {
  const toast = useToast()
  const [submitForm, { data, loading, error }] = useMutation(SUBMIT_FORM)
  const haveEntryId = Boolean(data?.submitGfForm?.entryId)
  const haveFieldErrors = Boolean(data?.submitGfForm?.errors?.length)
  const wasSuccessfullySubmitted = haveEntryId && !haveFieldErrors
  const defaultConfirmation = form.confirmations?.find(
    confirmation => confirmation?.isDefault
  )
  const formFields = form.formFields?.nodes || []
  const { state } = useGravityForm()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return

    submitForm({
      variables: {
        id: form.id,
        fieldValues: state,
      },
    }).catch(error => {
      console.error(error)
    })
  }

  function getFieldErrors(id: number): FieldError[] {
    if (!haveFieldErrors) return []
    toast({
      position: "bottom",
      duration: 9000,
      isClosable: true,
      render: () => (
        <Box color="white" bg="red" p={3} borderRadius={4}>
          <Text fontWeight="bold" fontFamily="heading">
            Oops! Looks like there was an error
          </Text>
          <Text>
            {data.submitGfForm.errors.filter(
              (error: FieldError) => error.id === id
            ) || "Error!"}
          </Text>
        </Box>
      ),
    })
  }

  useEffect(() => {
    if (wasSuccessfullySubmitted) {
      toast({
        position: "bottom",
        duration: 9000,
        isClosable: true,
        render: () => (
          <Box color="black" bg="secondary" p={3} borderRadius={4}>
            <Text fontWeight="bold" fontFamily="heading">
              Thanks For Your Submission
            </Text>
            <Text>
              {defaultConfirmation?.message || "Form successfully submitted"}
            </Text>
          </Box>
        ),
      })
    }
  }, [wasSuccessfullySubmitted])

  return (
    <form method="post" onSubmit={handleSubmit}>
      {formFields.map(field => (
        <GravityFormsField
          key={field?.id}
          field={field as FormField}
          fieldErrors={getFieldErrors(Number(field?.id))}
        />
      ))}
      {error ? (
        <FormErrorMessage className="error-message">
          {error.message}
        </FormErrorMessage>
      ) : null}
      <Box display="flex" mt={4}>
        <Button type="submit" variant="primary" disabled={loading} ml="auto">
          {form?.submitButton?.text || "Submit"}
        </Button>
      </Box>
    </form>
  )
}
