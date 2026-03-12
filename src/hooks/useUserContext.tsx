import { useContext } from "react";
import { userContext } from "../context/userContext";

function useUserContext(){
    const context = useContext(userContext)
    if(context){
        return context
    }
}

export default useUserContext