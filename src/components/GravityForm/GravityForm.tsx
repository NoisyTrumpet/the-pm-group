import { GravityFormsForm as GravityFormsFormType } from "Graphql/formGraphql"
import { GravityFormProvider } from "Hooks/useGravityForm"
import * as React from "react"

import GravityFormsForm from "./GravityFormsForm"

interface Props {
  form: GravityFormsFormType
}

const GravityForm = (props: Props) => {
  return (
    <GravityFormProvider>
      <GravityFormsForm {...props} />
    </GravityFormProvider>
  )
}

export default GravityForm
