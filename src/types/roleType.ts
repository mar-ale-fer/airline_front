export type roleType =
  'PILOT'
  | 'OCC'
  | 'ADMINISTRATOR'
  | 'AIRLINE'
  | 'RAMP'
  | 'GATE'
export type roleAndAllType = roleType | 'LOGGED-IN' | 'LOGGED-OUT'

export type rolesType = {
  roles: roleType[]
}
