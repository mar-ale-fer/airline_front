import { gql } from "@apollo/client";

export const FLIGHT_DELETE = gql`
mutation FlightDelete($flightDeleteId: ID!) {
	flightDelete(id: $flightDeleteId) {
	  success
	  message
	  flight {
		id
		name
	  }
	}
  }
`;
