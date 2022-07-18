import { gql } from "@apollo/client"

export const FLIGHT_UPDATE = gql`
mutation FlightUpdate($flightUpdateId: ID!, $name: String!) {
    flightUpdate(id: $flightUpdateId, name: $name) {
      success
      message
      flight {
        id
        name
      }
    }
  }   
`;