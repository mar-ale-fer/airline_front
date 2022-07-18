import { gql } from "@apollo/client"

export const FLIGHT_BY_ID = gql`
query FlightById($flightByIdId: ID!, $debug: String!) {
    flightById(id: $flightByIdId, debug: $debug) {
      success
      message
      flight {
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