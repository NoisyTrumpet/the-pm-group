import { Grid } from "@chakra-ui/react"
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VisuallyHidden,
} from "@chakra-ui/react"
import {
  FieldError,
  NameField as NameFieldType,
  NameInput,
} from "Graphql/formGraphql"
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  NameFieldValue,
} from "Hooks/useGravityForm"
import { graphql } from "gatsby"
import * as React from "react"

export const NAME_FIELD_FIELDS = graphql`
  fragment NameFieldFields on WpNameField {
    id
    label
    description
    cssClass
    isRequired
    inputs {
      key
      label
      placeholder
      choices {
        text
        value
      }
    }
  }
`

interface Props {
  field: NameFieldType
  fieldErrors: FieldError[]
}

const DEFAULT_VALUE: NameInput = {}

const AUTOCOMPLETE_ATTRIBUTES: { [key: string]: string } = {
  prefix: "honorific-prefix",
  first: "given-name",
  middle: "additional-name",
  last: "family-name",
  suffix: "honorific-suffix",
}

export default function NameField({ field, fieldErrors }: Props) {
  const { id, formId, type, label, description, cssClass, inputs, isRequired } =
    field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id,
  ) as NameFieldValue | undefined
  const nameValues = fieldValue?.nameValues || DEFAULT_VALUE

  // const prefixInput = inputs?.find(input => input?.key === 'prefix')
  const otherInputs = inputs?.filter(input => input?.key !== "prefix") || []

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target
    const newNameValues = { ...nameValues, [name]: value }

    dispatch({
      type: ACTION_TYPES.updateNameFieldValue,
      fieldValue: {
        id,
        nameValues: newNameValues,
      },
    })
  }

  return (
    <FormControl
      id={htmlId}
      isRequired={Boolean(isRequired)}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
      my={4}
      isInvalid={Boolean(fieldErrors.length)}
    >
      <FormLabel display="none" as="legend">
        {label}
      </FormLabel>
      {/* {prefixInput ? (
        <>
          <select
            name={String(prefixInput.key)}
            id={`input_${formId}_${id}_${prefixInput.key}`}
            autoComplete={AUTOCOMPLETE_ATTRIBUTES.prefix}
            value={nameValues.prefix || ''}
            onChange={handleChange}
          >
            <option value=""></option>
            {prefixInput.choices?.map(choice => (
              <option key={choice?.value} value={String(choice?.value)}>
                {String(choice?.text)}
              </option>
            ))}
          </select>
          <label htmlFor={`input_${formId}_${id}_${prefixInput.key}`}>
            {prefixInput.label}
          </label>
        </>
      ) : null} */}
      <Grid templateColumns={[`repeat(1, 1fr)`, `repeat(2, 1fr)`]} gap={4}>
        {otherInputs.map(input => {
          const key = input?.key as keyof NameInput
          const inputLabel = input?.label || ""
          const placeholder = input?.placeholder || ""
          if (key === "first" || key === "last") {
            return (
              <div key={key}>
                <FormLabel
                  display="none"
                  htmlFor={`input_${formId}_${id}_${key}`}
                >
                  {inputLabel}
                </FormLabel>
                <Input
                  bg="white"
                  type="text"
                  required={Boolean(isRequired)}
                  name={String(key)}
                  id={`input_${formId}_${id}_${key}`}
                  placeholder={
                    placeholder || isRequired ? `${inputLabel}*` : inputLabel
                  }
                  autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
                  value={nameValues?.[key] || ""}
                  onChange={handleChange}
                />
              </div>
            )
          }
          return null
        })}
      </Grid>
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
