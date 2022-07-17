import { menuItemstype, menuItemType } from "../../types/menuItemType";

import { rolesType } from "../../types/roleType";


import { ROLE_ACCESSES } from "./roleAccesses"
import { menuRemoveDuplicates } from "./menuRemoveDuplicates";
export const getUserMenu = (roles: rolesType): menuItemstype => {
    console.log(roles)
    if (roles.roles.length === 0) {
        console.log("---LOGGED-OUT")
        return ROLE_ACCESSES.get("LOGGED-OUT") as menuItemType[]
    }

    let userMenu: menuItemstype = []

    roles.roles.forEach(role => {
        userMenu = [...userMenu, ...(ROLE_ACCESSES.get(role) as menuItemType[])]
    });
    //Add access for logged-in user
    userMenu = [...userMenu, ...(ROLE_ACCESSES.get("LOGGED-IN") as menuItemType[])]

    return menuRemoveDuplicates(userMenu)
}

