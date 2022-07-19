import { gql } from "@apollo/client";

export const GET_FLIGHT_COMMENTS_NEEDS_REFRESH_RV = gql`
  query getFlightCommentsNeedsRefresh_RV{
    flightCommentsNeedsRefresh_RV @client
  }
`