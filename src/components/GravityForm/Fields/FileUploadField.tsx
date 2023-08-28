import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import {
  FieldError,
  FileUploadField as FileUploadFieldType,
} from "Graphql/formGraphql"
import useGravityForm, {
  ACTION_TYPES,
  FieldValue,
  FileUploadFieldValue,
} from "Hooks/useGravityForm"
import { graphql } from "gatsby"
import * as React from "react"

export const FILE_UPLOAD_FIELD_FIELDS = graphql`
  fragment FileUploadFieldFields on WpFileUploadField {
    id
    label
    description
    cssClass
    isRequired
  }
`

interface Props {
  field: FileUploadFieldType
  fieldErrors: FieldError[]
}

const DEFAULT_VALUE = ""

export default function FileUploadField({ field, fieldErrors }: Props) {
  const { id, formId, type, label, description, cssClass, isRequired } = field
  const htmlId = `field_${formId}_${id}`
  const { state, dispatch } = useGravityForm()

  const fieldValue = state.find(
    (fieldValue: FieldValue) => fieldValue.id === id,
  ) as FileUploadFieldValue | undefined

  return (
    <FormControl
      id={htmlId}
      className={`gfield gfield-${type} ${cssClass}`.trim()}
      my={4}
      isRequired={Boolean(isRequired)}
      isInvalid={Boolean(fieldErrors.length)}
      background="white"
      borderRadius="5px"
      py={3}
      px={5}
    >
      <FormLabel htmlFor={htmlId} fontWeight="bold">
        {label}
      </FormLabel>
      <Input
        border="0"
        p="0"
        m="0"
        borderRadius="0"
        type="file"
        name={String(id)}
        id={htmlId}
        required={Boolean(isRequired)}
        onChange={event => {
          const { files } = event.target
          const file = files?.[0]

          dispatch({
            type: ACTION_TYPES.updateFileUploadFieldValue,
            fieldValue: {
              id,
              fileUploadValues: [file],
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
