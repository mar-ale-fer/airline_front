import { gql } from "@apollo/client";

export const GET_FLIGHTSFILTERS_RV = gql`
  query getFlightsFilters_RV{
    flightsFilters_RV @client
  }
`