import { roleAndAllType } from "../../types/roleType";
import { menuItemstype } from "../../types/menuItemType";

export let ROLE_ACCESSES = new Map<roleAndAllType, menuItemstype>();
//the airline manage the users
ROLE_ACCESSES.set(
    "AIRLINE", [
    {
        to: "/users",
        title: "Users",
        optionText: "Users"
    },
]
)

//The administrator manage the flights
ROLE_ACCESSES.set(
    "ADMINISTRATOR", [
    {
        to: "/flights",
        title: "Flights",
        optionText: "Flights"
    },
]
)

//Other roles can add comments to flights
ROLE_ACCESSES.set(
    "OCC", [
    {
        to: "/flight-comments",
        title: "Flight comments",
        optionText: "Flight comments"
    },
]
)

ROLE_ACCESSES.set(
    "RAMP", [
    {
        to: "/flight-comments",
        title: "Flight comments",
        optionText: "Flight comments"
    },
]
)

ROLE_ACCESSES.set(
    "GATE", [
    {
        to: "/flight-comments",
        title: "Flight comments",
        optionText: "Flight comments"
    },
]
)

ROLE_ACCESSES.set(
    "PILOT", [
    {
        to: "/flight-comments",
        title: "Flight comments",
        optionText: "Flight comments"
    },
]
)

ROLE_ACCESSES.set(
    "LOGGED-OUT", [
    {
        to: "/login",
        title: "Login",
        optionText: "Login"
    },
]
)

ROLE_ACCESSES.set(
    "LOGGED-IN", [
    {
        to: "/",
        title: "Home",
        optionText: "Home"
    },
    {
        to: "/logout",
        title: "Logout",
        optionText: "Logout"
    },
]
)
