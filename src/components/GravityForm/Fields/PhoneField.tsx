import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VisuallyHidden,
} from "@chakra-ui/react"
import { FieldError, PhoneField as PhoneFieldType } from "Graphql/formGraphql"
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "Hooks/useGravityForm"
import { graphql } from "gatsby"
import * as React from "react"

export const PHONE_FIELD_FIELDS = graphql`
  fragment PhoneFieldFields on WpPhoneField {
    id
    label
    description
    cssClass
    isRequired
    placeholder
  }
`

interface Props {
  field: PhoneFieldType
  fieldErrors: FieldError[]
}

const DEFAULT_VALUE = ""

export default function PhoneField({ field, fieldErrors }: Props) {
  const {
    id,
    formId,
    type,
    label,
    description,
    cssClass,
    isRequired,
    placeholder,
  } = field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id,
  ) as StringFieldValue | undefined
  const value = fieldValue?.value || DEFAULT_VALUE

  return (
    <FormControl
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
      isRequired={Boolean(isRequired)}
      isInvalid={Boolean(fieldErrors.length)}
    >
      <VisuallyHidden>
        <FormLabel htmlFor={htmlId}>{label}</FormLabel>
      </VisuallyHidden>
      <Input
        type="tel"
        name={String(id)}
        id={htmlId}
        bg="white"
        required={Boolean(isRequired)}
        placeholder={placeholder || Boolean(isRequired) ? `${label}*` : label}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updatePhoneFieldValue,
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
