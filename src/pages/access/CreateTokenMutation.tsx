
import { gql } from "@apollo/client";

export const CREATE_LOGIN_TOKEN = gql`
mutation CredentialsCreateToken($user: String!, $password: String!) {
  credentialsCreateToken(user: $user, password: $password) {
    success
    message
    token
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
