import { useState } from 'react'
import {useAuthContext} from './useAuthContext'

// --- LOGIN FUNCTION ---
/* 
This function post's the user's credentials and stores the response in the local
storage.
*/ 
export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (identifier, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:1337/api/auth/local', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({identifier, password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            //Update AuthContext
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }

    }

    return {login, error, isLoading}

}