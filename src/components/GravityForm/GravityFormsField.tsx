import { FieldError, FormField } from "Graphql/formGraphql"
import * as React from "react"

import AddressField from "./Fields/AddressField"
import CheckboxField from "./Fields/CheckboxField"
import DateField from "./Fields/DateField"
import EmailField from "./Fields/EmailField"
import FileUploadField from "./Fields/FileUploadField"
// import MultiSelectField from './Fields/MultiSelectField'
import NameField from "./Fields/NameField"
import PhoneField from "./Fields/PhoneField"
import RadioField from "./Fields/RadioField"
import SelectField from "./Fields/SelectField"
import TextAreaField from "./Fields/TextAreaField"
import TextField from "./Fields/TextField"
import TimeField from "./Fields/TimeField"
import WebsiteField from "./Fields/WebsiteField"

interface Props {
  field: FormField
  fieldErrors: FieldError[]
}

export default function Field({ field, fieldErrors }: Props) {
  switch (field.type) {
    case "ADDRESS":
      return <AddressField field={field} fieldErrors={fieldErrors} />
    case "CHECKBOX":
      return <CheckboxField field={field} fieldErrors={fieldErrors} />
    case "DATE":
      return <DateField field={field} fieldErrors={fieldErrors} />
    case "EMAIL":
      return <EmailField field={field} fieldErrors={fieldErrors} />
    // case 'multiselect':
    //   return <MultiSelectField field={field} fieldErrors={fieldErrors} />
    case "NAME":
      return <NameField field={field} fieldErrors={fieldErrors} />
    case "PHONE":
      return <PhoneField field={field} fieldErrors={fieldErrors} />
    case "RADIO":
      return <RadioField field={field} fieldErrors={fieldErrors} />
    case "SELECT":
      return <SelectField field={field} fieldErrors={fieldErrors} />
    case "TEXT":
      return <TextField field={field} fieldErrors={fieldErrors} />
    case "TEXTAREA":
      return <TextAreaField field={field} fieldErrors={fieldErrors} />
    case "TIME":
      return <TimeField field={field} fieldErrors={fieldErrors} />
    case "WEBSITE":
      return <WebsiteField field={field} fieldErrors={fieldErrors} />
    case "FILEUPLOAD":
      return <FileUploadField field={field} fieldErrors={fieldErrors} />
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>
  }
}
