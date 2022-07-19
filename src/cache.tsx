import { InMemoryCache, makeVar } from "@apollo/client";
import { userSessionType } from "./types/userSessionType";
import { usersFiltersType } from "./pages/users/operations/UsersFiltersType";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        userSessionReactVar:{
          read() { return userSessionReactVar();  }
        },
        flightsFilters_RV:{
          read() { return flightsFilters_RV() }
        },
        flightsPageNeedsRefresh_RV:{
          read() { return flightsPageNeedsRefresh_RV()}
        },
        usersFilters_RV:{
          read() { return usersFilters_RV()}
        },
        usersPageNeedsRefresh_RV:{
          read() { return usersPageNeedsRefresh_RV()}
        },
        flightCommentsNeedsRefresh_RV:{
          read() { return flightCommentsNeedsRefresh_RV() }
        },
      }
    }
  }
});

export const userSessionReactVar_initialvalue : userSessionType = {
    email: '',
    firstName: '',
    lastName: '',
    roles: {roles:[]},
    backend: false
}

export const userSessionReactVar = makeVar<userSessionType>(userSessionReactVar_initialvalue)

export const flightsFilters_RV = makeVar("")
export const flightCommentsNeedsRefresh_RV = makeVar("")
export const flightsPageNeedsRefresh_RV = makeVar<string>("")

export const usersFilters_RV_initialvalue : usersFiltersType = {
  firstName: "",
  lastName: "",
  email: ""
}
export const usersFilters_RV = makeVar<usersFiltersType>(usersFilters_RV_initialvalue);
export const usersPageNeedsRefresh_RV = makeVar<string>("");