import { gql } from '@apollo/client'

export const USER_UPDATE = gql`
mutation UserUpdate($userUpdateId: ID!, $firstName: String!, $lastName: String!, $email: String!, $roles: [String]!) {
  userUpdate(id: $userUpdateId, firstName: $firstName, lastName: $lastName, email: $email, roles: $roles) {
    success
    message
    user {
      id
      firstName
      lastName
      roles {
        roles
      }
    }
  }
}
`;