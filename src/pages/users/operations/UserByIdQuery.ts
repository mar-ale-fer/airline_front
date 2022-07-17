import { gql } from '@apollo/client'

export const USER_BY_ID = gql`
query UserById($userByIdId: ID!, $debug: String!) {
  userById(id: $userByIdId, debug: $debug) {
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
