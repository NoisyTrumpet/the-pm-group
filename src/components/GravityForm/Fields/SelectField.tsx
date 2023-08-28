import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
  VisuallyHidden,
} from "@chakra-ui/react"
import { FieldError, SelectField as SelectFieldType } from "Graphql/formGraphql"
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "Hooks/useGravityForm"
import { graphql } from "gatsby"
import * as React from "react"

export const SELECT_FIELD_FIELDS = graphql`
  fragment SelectFieldFields on WpSelectField {
    id
    label
    description
    cssClass
    isRequired
    defaultValue
    choices {
      text
      value
    }
  }
`

interface Props {
  field: SelectFieldType
  fieldErrors: FieldError[]
}

export default function SelectField({ field, fieldErrors }: Props) {
  const {
    id,
    formId,
    type,
    label,
    description,
    cssClass,
    isRequired,
    defaultValue,
    choices,
  } = field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id,
  ) as StringFieldValue | undefined
  const value = fieldValue?.value || String(defaultValue)

  return (
    <FormControl
      className={`gfield gfield-${type} ${cssClass}`.trim()}
      id={htmlId}
      isRequired={Boolean(isRequired)}
    >
      <VisuallyHidden>
        <FormLabel htmlFor={htmlId}>{label}</FormLabel>
      </VisuallyHidden>
      <Select
        name={String(id)}
        id={htmlId}
        bg="white"
        required={Boolean(isRequired)}
        value={value}
        placeholder={Boolean(isRequired) ? `${label}*` : label}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateSelectFieldValue,
            fieldValue: {
              id,
              value: event.target.value,
            },
          })
        }}
      >
        {choices?.map(choice => (
          <option key={choice?.value || ""} value={choice?.value || ""}>
            {choice?.text || ""}
          </option>
        ))}
      </Select>
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
