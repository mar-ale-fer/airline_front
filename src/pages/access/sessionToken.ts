import jwt from 'jwt-decode'
import { userSessionType } from '../../types/userSessionType';

export const getSessionJWTToken = () => {
    return localStorage.getItem('token');
}
export const getUserFromToken = (jwtToken : string) : userSessionType => {
    if (!jwtToken) return null

    const user : userSessionType  = jwt(jwtToken);
    
    if (user) return user

    return null
}


