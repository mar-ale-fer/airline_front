import { roleAndAllType } from "../../types/roleType";
import { menuItemstype } from "../../types/menuItemType";

export let ROLE_ACCESSES = new Map<roleAndAllType, menuItemstype>();
ROLE_ACCESSES.set(
    "AIRLINE", [
    {
        to: "/users",
        title: "Users",
        optionText: "Users"
    },
    // {
    //     to: "/levels",
    //     title: "Niveles",
    //     optionText: "Niveles"
    // },
    // {
    //     to: "/currentaccounts",
    //     title: "Cuentas corrientes",
    //     optionText: "Cuentas corrientes"
    // },
]
)

ROLE_ACCESSES.set(
    "ADMINISTRATOR", [
    // {
    //     to: "/currentaccounts",
    //     title: "Cuentas corrientes",
    //     optionText: "Cuentas corrientes"
    // },
]
)

// ROLE_ACCESSES.set(
//     "SECRETARY", [
//     {
//         to: "/students",
//         title: "Estudiantes",
//         optionText: "Estudiantes"
//     },
//     // {
//     //     to: "/teachers",
//     //     title: "Profesores",
//     //     optionText: "Profesores"
//     // },
//     {
//         to: "/levels",
//         title: "Niveles",
//         optionText: "Niveles"
//     },
//     {
//         to: "/courses",
//         title: "Cursos",
//         optionText: "Cursos"
//     }
// ]
// )

// ROLE_ACCESSES.set(
//     "TEACHER", [
//     {
//         to: "/attendance",
//         title: "Tomar asistencia",
//         optionText: "Tomar asistencia"
//     }
// ]
// )

// ROLE_ACCESSES.set(
//     "STUDENT", [
//     {
//         to: "/studentaccount",
//         title: "Cuenta del estudiante",
//         optionText: "Cuenta del estudiante"
//     }
// ]
// )
ROLE_ACCESSES.set(
    "LOGGED-OUT", [
    {
        to: "/login",
        title: "Iniciar sesión",
        optionText: "Iniciar sesión"
    },
]
)

ROLE_ACCESSES.set(
    "LOGGED-IN", [
    {
        to: "/",
        title: "Inicio",
        optionText: "Inicio"
    },
    {
        to: "/logout",
        title: "Cerrar sesión",
        optionText: "Cerrar sesión"
    },
]
)
