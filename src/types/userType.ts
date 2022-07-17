import { rolesType } from "./roleType"

export type userType = {
  id: number | null
  firstName: string
  lastName: string
  email: string
  mustChangePassword: boolean
  password: string
  backend: boolean //is a platform's IT backender?
  roles: rolesType
  InstituteId: number
}