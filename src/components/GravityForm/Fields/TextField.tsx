import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VisuallyHidden,
} from "@chakra-ui/react"
import { FieldError, TextField as TextFieldType } from "Graphql/formGraphql"
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  StringFieldValue,
} from "Hooks/useGravityForm"
import { graphql } from "gatsby"
import * as React from "react"

export const TEXT_FIELD_FIELDS = graphql`
  fragment TextFieldFields on WpTextField {
    id
    formId
    label
    description
    cssClass
    isRequired
    placeholder
  }
`

interface Props {
  field: TextFieldType
  fieldErrors: FieldError[]
}

const DEFAULT_VALUE = ""

export default function TextField({ field, fieldErrors }: Props) {
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
      <Input
        type="text"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        placeholder={placeholder || Boolean(isRequired) ? `${label}*` : label}
        value={value}
        onChange={event => {
          dispatch({
            type: ACTION_TYPES.updateTextFieldValue,
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
    // <div className={`gfield gfield-${type} ${cssClass}`.trim()}>
    //   <label htmlFor={htmlId}>{label}</label>
    //   <input
    //     type="text"
    //     name={String(id)}
    //     id={htmlId}
    //     required={Boolean(isRequired)}
    //     placeholder={placeholder || ''}
    //     value={value}
    //     onChange={event => {
    //       dispatch({
    //         type: ACTION_TYPES.updateTextFieldValue,
    //         fieldValue: {
    //           id,
    //           value: event.target.value,
    //         },
    //       })
    //     }}
    //   />
    //   {description ? <p className="field-description">{description}</p> : null}
    //   {fieldErrors?.length
    //     ? fieldErrors.map(fieldError => (
    //         <p key={fieldError.id} className="error-message">
    //           {fieldError.message}
    //         </p>
    //       ))
    //     : null}
    // </div>
  )
}
