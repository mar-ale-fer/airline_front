import { gql } from "@apollo/client";

export const GET_USERSFILTERS_RV = gql`
  query getUsersFilters_RV{
    usersFilters_RV @client
  }
`