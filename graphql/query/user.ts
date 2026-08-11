import {graphql} from "../../gql"

export const verifyGoogleTokenQuery=graphql(`
    #graphql
  query verifyGoogleToken($token:String!){
    verifyGoogleToken(token:$token)
  }
`
)

export const getCurrentUserQuery=graphql(`
    query GetCurrentUser {
  getcurrentUser {
    id
    email
    firstName
    lastName
    profileImgUrl
  }
}
`)