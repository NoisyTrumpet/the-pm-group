import {
  AddressField as AddressFieldType,
  AddressInput,
  FieldError,
} from "Graphql/formGraphql"
import useGravityForm, {
  ACTION_TYPES,
  AddressFieldValue,
  FieldValue,
} from "Hooks/useGravityForm"
import { graphql } from "gatsby"
import * as React from "react"

export const ADDRESS_FIELD_FIELDS = graphql`
  fragment AddressFieldFields on WpAddressField {
    id
    label
    description
    cssClass
    inputs {
      key
      label
      placeholder
    }
  }
`

interface Props {
  field: AddressFieldType
  fieldErrors: FieldError[]
  formId: number
}

const DEFAULT_VALUE: AddressInput = {}

const AUTOCOMPLETE_ATTRIBUTES: { [key: string]: string } = {
  street: "address-line1",
  lineTwo: "address-line2",
  city: "address-level2",
  state: "address-level1",
  country: "country-name",
}

export default function AddressField({ field, fieldErrors, formId }: Props) {
  const { id, type, label, description, cssClass, inputs } = field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()
  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id,
  ) as AddressFieldValue | undefined
  const addressValues = fieldValue?.addressValues || DEFAULT_VALUE

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newAddressValues = { ...addressValues, [name]: value }

    dispatch({
      type: ACTION_TYPES.updateAddressFieldValue,
      fieldValue: {
        id,
        addressValues: newAddressValues,
      },
    })
  }

  return (
    <fieldset
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
    >
      <legend>{label}</legend>
      {inputs?.map(input => {
        const key = input?.key as keyof AddressInput
        const inputLabel = input?.label || ""
        const placeholder = input?.placeholder || ""
        return (
          <div key={key}>
            <input
              type="text"
              name={String(key)}
              id={`input_${formId}_${id}_${key}`}
              placeholder={placeholder}
              autoComplete={AUTOCOMPLETE_ATTRIBUTES[key]}
              value={addressValues?.[key] ?? ""}
              onChange={handleChange}
            />
            <label htmlFor={`input_${formId}_${id}_${key}`}>{inputLabel}</label>
          </div>
        )
      })}
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
