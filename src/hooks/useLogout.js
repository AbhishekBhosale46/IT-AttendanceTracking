import {useAuthContext} from './useAuthContext'

// --- LOGOUT FUNCTION ---
/* 
This function deletes the user data from the local storage.
*/ 
export const useLogout = () => {

    const {dispatch} = useAuthContext()

    const logout = () => {
        //Remove user from storage
        localStorage.removeItem('user')

        //Dispatch logout
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}