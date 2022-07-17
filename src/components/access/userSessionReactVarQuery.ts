import { gql } from "@apollo/client";

export const GET_USER_FROM_TOKEN_RV = gql`
  query userSessionReactVar{
    userSessionReactVar @client
  }
`