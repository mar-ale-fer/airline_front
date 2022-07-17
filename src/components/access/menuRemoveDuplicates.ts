import { menuItemstype, menuItemType } from "../../types/menuItemType"
export const menuRemoveDuplicates = ( anArray : menuItemstype) : menuItemstype => {

    const arrayLength : number = anArray.length
    let permissionsToReturn : menuItemstype = []
    let aMap = new Map<string,  menuItemType>();

    for (let i=0; i < arrayLength; i++) {
        if (!aMap.has(anArray[i].to))
        aMap.set( anArray[i].to , anArray[i])
    }

    aMap.forEach((value) => {
      permissionsToReturn.push(value)
    })

    return permissionsToReturn
}