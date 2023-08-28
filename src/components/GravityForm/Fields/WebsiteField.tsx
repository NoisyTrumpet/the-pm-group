import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import {
  FieldError,
  WebsiteField as WebsiteFieldType,
} from "Graphql/formGraphql"
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "Hooks/useGravityForm"
import { graphql } from "gatsby"
import * as React from "react"

export const WEBSITE_FIELD_FIELDS = graphql`
  fragment WebsiteFieldFields on WpWebsiteField {
    id
    label
    description
    cssClass
    isRequired
    placeholder
  }
`

interface Props {
  field: WebsiteFieldType
  fieldErrors: FieldError[]
}

const DEFAULT_VALUE = ""

export default function WebsiteField({ field, fieldErrors }: Props) {
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
      my={4}
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
      isInvalid={Boolean(fieldErrors.length)}
    >
      <FormLabel display="none" as="legend" htmlFor={htmlId}>
        {label}
      </FormLabel>
      <Input
        bg="white"
        type="url"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateWebsiteFieldValue,
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
