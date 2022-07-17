import { ApolloClient } from "@apollo/client";
import { LOGGED_USER } from "./LoggedUserQuery";

export const getLoggedUser = async (apolloclient :ApolloClient<Object> ) : Promise<[error: boolean, loggedUser: any ]> => {
    try {
        const loggedUser = await apolloclient.query({
            query: LOGGED_USER
        })   
        return [false, loggedUser]    
    }catch(error){
        return [true, error]
    }
}