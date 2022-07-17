import { gql } from '@apollo/client'

export const LOGGED_USER = gql`
query LoggedUser {
  LoggedUser {
    success
    message
    user {
      id
      firstName
      lastName
      mustChangePassword
      roles {
        roles
      }

    }
  }
}
`;
