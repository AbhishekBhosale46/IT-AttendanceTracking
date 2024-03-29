import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// --- AUTHENTICATION CONTEXT HOOK ---
export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}
