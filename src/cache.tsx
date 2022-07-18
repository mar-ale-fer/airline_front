import { InMemoryCache, makeVar } from "@apollo/client";
import { userSessionType } from "./types/userSessionType";
import { usersFiltersType } from "./pages/users/operations/UsersFiltersType";
// import { studentsFiltersType } from "./pages/students/operations/StudentsFiltersType";
// import { coursesFiltersType } from "./pages/courses/operations/CoursesFiltersType";

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
        // studentsFilters_RV:{
        //   read() { return studentsFilters_RV()}
        // },
        // studentsPageNeedsRefresh_RV:{
        //   read() { return usersPageNeedsRefresh_RV()}
        // },
        // coursesFilters_RV:{
        //   read() { return coursesFilters_RV()}
        // },
        // coursesPageNeedsRefresh_RV:{
        //   read() { return coursesPageNeedsRefresh_RV()}
        // }
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
export const flightsPageNeedsRefresh_RV = makeVar<string>("")

export const usersFilters_RV_initialvalue : usersFiltersType = {
  firstName: "",
  lastName: "",
  email: ""
}
export const usersFilters_RV = makeVar<usersFiltersType>(usersFilters_RV_initialvalue);
export const usersPageNeedsRefresh_RV = makeVar<string>("");
// //students
// export const studentsFilters_RV_initialvalue : studentsFiltersType = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   documentNumber: "",
//   observations: "",
// }
// export const studentsFilters_RV = makeVar<studentsFiltersType>(studentsFilters_RV_initialvalue)
// export const studentsPageNeedsRefresh_RV = makeVar<string>("");
// //courses
// export const coursesFilters_RV_initialvalue : coursesFiltersType = {
//   year: 2022,
//   schedule: "",
//   details: "",
//   levelId: "0",
//   active: true,
// }
// export const coursesFilters_RV = makeVar<coursesFiltersType>(coursesFilters_RV_initialvalue)
// export const coursesPageNeedsRefresh_RV = makeVar<string>("");