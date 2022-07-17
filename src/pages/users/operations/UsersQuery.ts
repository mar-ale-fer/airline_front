import { gql } from '@apollo/client'

export const USERS_QUERY = gql`
query Users($firstName: String!, $lastName: String!, $email: String!, $debug: String!) {
  users(firstName: $firstName, lastName: $lastName, email: $email, debug: $debug) {
    success
    message
    users {
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

