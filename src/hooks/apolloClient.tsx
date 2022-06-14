import { ApolloClient, InMemoryCache } from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"

const myEndpoint = process.env.GATSBY_WORDPRESS_API_URL

export const client = new ApolloClient({
  uri: myEndpoint,
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: myEndpoint,
  }),
})
