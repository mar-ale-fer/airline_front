import { gql } from '@apollo/client'

export const USER_CHANGE_PASSWORD = gql`
mutation UserChangePassword($userChangePasswordId: ID!, $password: String!) {
  userChangePassword(id: $userChangePasswordId, Password: $password) {
    success
    message
    user {
      id
      firstName
      lastName
      email
    }
  }
}
`;