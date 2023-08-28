import {
  CheckboxField as CheckboxFieldType,
  CheckboxInput,
  FieldError,
} from "Graphql/formGraphql"
import useGravityForm, {
  ACTION_TYPES,
  CheckboxFieldValue,
  FieldValue,
} from "Hooks/useGravityForm"
import { graphql } from "gatsby"
import * as React from "react"

export const CHECKBOX_FIELD_FIELDS = graphql`
  fragment CheckboxFieldFields on WpCheckboxField {
    id
    label
    description
    cssClass
    inputs {
      id
    }
    choices {
      text
      value
    }
  }
`

interface Props {
  field: CheckboxFieldType
  fieldErrors: FieldError[]
  formId: number
}

const DEFAULT_VALUE: CheckboxInput[] = []

export default function CheckboxField({ formId, field, fieldErrors }: Props) {
  const { id, type, label, description, cssClass, inputs, choices } = field
  const checkboxInputs =
    choices?.map((choice, index) => ({ ...choice, id: inputs?.[index]?.id })) ||
    []
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id,
  ) as CheckboxFieldValue | undefined
  const checkboxValues = fieldValue?.checkboxValues || DEFAULT_VALUE

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = event.target
    const otherCheckboxValues = checkboxValues.filter(
      (checkboxValue: CheckboxInput) => checkboxValue.inputId !== Number(name),
    )
    const newCheckboxValues = checked
      ? [...otherCheckboxValues, { inputId: Number(name), value }]
      : otherCheckboxValues

    dispatch({
      type: ACTION_TYPES.updateCheckboxFieldValue,
      fieldValue: {
        id,
        checkboxValues: newCheckboxValues,
      },
    })
  }

  return (
    <fieldset
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
    >
      <legend>{label}</legend>
      {checkboxInputs.map(({ id: inputId, text, value }) => (
        <div key={inputId}>
          <input
            type="checkbox"
            name={String(inputId)}
            id={`input_${formId}_${id}_${inputId}`}
            value={String(value)}
            onChange={handleChange}
            style={{
              marginRight: "0.5rem",
            }}
          />
          <label htmlFor={`input_${formId}_${id}_${inputId}`}>{text}</label>
        </div>
      ))}
      {description ? <p className="field-description">{description}</p> : null}
      {fieldErrors?.length
        ? fieldErrors.map(fieldError => (
            <p key={fieldError.id} className="error-message">
              {fieldError.message}
            </p>
          ))
        : null}
    </fieldset>
  )
}
