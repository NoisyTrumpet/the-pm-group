import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
  VisuallyHidden,
} from "@chakra-ui/react"
import {
  FieldError,
  TextAreaField as TextAreaFieldType,
} from "Graphql/formGraphql"
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "Hooks/useGravityForm"
import { graphql } from "gatsby"
import * as React from "react"

export const TEXT_AREA_FIELD_FIELDS = graphql`
  fragment TextAreaFieldFields on WpTextAreaField {
    id
    label
    description
    cssClass
    isRequired
  }
`

interface Props {
  field: TextAreaFieldType
  fieldErrors: FieldError[]
  formId: number
}

const DEFAULT_VALUE = ""

export default function TextAreaField({ formId, field, fieldErrors }: Props) {
  const { id, type, label, description, cssClass, isRequired } = field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id
  ) as StringFieldValue | undefined
  const value = fieldValue?.value || DEFAULT_VALUE

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
      <Textarea
        name={String(id)}
        id={htmlId}
        bg="white"
        placeholder={Boolean(isRequired) ? `${label}*` : label}
        required={Boolean(isRequired)}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateTextAreaFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
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
