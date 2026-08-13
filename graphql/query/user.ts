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
    tweets {
     id
     content
     author {
       id
       firstName
       lastName
       profileImgUrl
     }
    }
  }
}
`)

export const getUserByIDQuery=graphql(`
  #graphql
  query GetUserByID($id: ID!) {
  getUserByID(id: $id) {
    id
    lastName
    firstName
    email
    profileImgUrl
    tweets {
      id
      content
      imgUrl
      author {
        id
        firstName
        lastName
        profileImgUrl
      }
    }
  }
}
  `)