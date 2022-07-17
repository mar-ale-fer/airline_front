import { gql } from '@apollo/client'

export const USER_CREATE = gql`
mutation UserCreate($firstName: String!, $lastName: String!, $email: String!, $password: String!, $mustChangePassword: Boolean!, $roles: [String]!) {
  userCreate(firstName: $firstName, lastName: $lastName, email: $email, password: $password, mustChangePassword: $mustChangePassword, roles: $roles) {
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