
import { gql } from "@apollo/client";

export const FLIGHTS_QUERY = gql`
query Flights($name: String!, $debug: String!) {
  flights(name: $name, debug: $debug) {
    success
    message
    flights {
      id
      name
      comments{
          id
          text
          tags
          user{
              id
              firstName
              lastName
              email
              mustChangePassword
              roles {
                  roles
              }
          }
      }
    }
  }
}
`;
