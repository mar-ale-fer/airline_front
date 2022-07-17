import { gql } from '@apollo/client'

export const USER_DELETE = gql`
mutation UserDelete($userDeleteId: ID!) {
  userDelete(id: $userDeleteId) {
    success
    message
    user {
      id
      firstName
      lastName
      email
      roles {
        roles
      }
    }
  }
}
`;