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
    case "address":
      return <AddressField field={field} fieldErrors={fieldErrors} />
    case "checkbox":
      return <CheckboxField field={field} fieldErrors={fieldErrors} />
    case "date":
      return <DateField field={field} fieldErrors={fieldErrors} />
    case "email":
      return <EmailField field={field} fieldErrors={fieldErrors} />
    // case 'multiselect':
    //   return <MultiSelectField field={field} fieldErrors={fieldErrors} />
    case "name":
      return <NameField field={field} fieldErrors={fieldErrors} />
    case "phone":
      return <PhoneField field={field} fieldErrors={fieldErrors} />
    case "radio":
      return <RadioField field={field} fieldErrors={fieldErrors} />
    case "select":
      return <SelectField field={field} fieldErrors={fieldErrors} />
    case "text":
      return <TextField field={field} fieldErrors={fieldErrors} />
    case "textarea":
      return <TextAreaField field={field} fieldErrors={fieldErrors} />
    case "time":
      return <TimeField field={field} fieldErrors={fieldErrors} />
    case "website":
      return <WebsiteField field={field} fieldErrors={fieldErrors} />
    case "fileupload":
      return <FileUploadField field={field} fieldErrors={fieldErrors} />
    default:
      return <p>{`Field type not supported: ${field.type}.`}</p>
  }
}
