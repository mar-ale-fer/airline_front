import { gql } from '@apollo/client'

export const USER_CHANGE_OWN_PASSWORD = gql`
mutation UserOwnChangePassword($password: String!) {
  userOwnChangePassword(Password: $password) {
    success
    message
    user {
      id
      firstName
      lastName
      email
      mustChangePassword
    }
  }
}
`;