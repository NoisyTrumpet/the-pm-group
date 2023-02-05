import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VisuallyHidden,
} from "@chakra-ui/react"
import { EmailField as EmailFieldType, FieldError } from "Graphql/formGraphql"
import useGravityForm, {
  ACTION_TYPES,
  EmailFieldValue,
  FieldValue,
} from "Hooks/useGravityForm"
import { graphql } from "gatsby"
import * as React from "react"

export const EMAIL_FIELD_FIELDS = graphql`
  fragment EmailFieldFields on WpEmailField {
    id
    label
    description
    cssClass
    isRequired
    placeholder
  }
`

interface Props {
  field: EmailFieldType
  fieldErrors: FieldError[]
  formId: number
}

const DEFAULT_VALUE = ""

export default function EmailField({ formId, field, fieldErrors }: Props) {
  const { id, type, label, description, cssClass, isRequired, placeholder } =
    field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as EmailFieldValue | undefined
  const value = fieldValue?.emailValues?.value || DEFAULT_VALUE

  return (
    <FormControl
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
      my={4}
      isRequired={Boolean(isRequired)}
      isInvalid={Boolean(fieldErrors.length)}
    >
      <VisuallyHidden>
        <FormLabel htmlFor={htmlId}>{label}</FormLabel>
      </VisuallyHidden>
      <Input
        bg="white"
        type="email"
        name={String(id)}
        id={htmlId}
        placeholder={placeholder || Boolean(isRequired) ? `${label}*` : label}
        required={Boolean(isRequired)}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateEmailFieldValue,
            fieldValue: {
              id,
              emailValues: {
                value: event.target.value,
              },
            },
          })
        }}
      />
      {description ? (
        <FormHelperText className="field-description">
          {description}
        </FormHelperText>
      ) : null}
      {fieldErrors?.length
        ? fieldErrors.map(fieldError => (
            <FormErrorMessage key={fieldError.id} className="error-message">
              {fieldError.message}
            </FormErrorMessage>
          ))
        : null}
    </FormControl>
  )
}
