import { gql } from "@apollo/client"

export const FLIGHT_CREATE = gql`
mutation FlightCreate($name: String!) {
    flightCreate(name: $name) {
      success
      message
      flight {
        id
        name
      }
    }
  } 
`;