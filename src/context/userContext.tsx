import { createContext, useEffect, useState } from "react"
import ApiServices from "../services/ApiServices";

export const userContext = createContext(null)

export function UserProvider({children}){
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const [error, setError] = useState<String | null>("");
    const [loading, setLoading] = useState(true)
    let payload;
    if(username || password){
        payload = {username, password}
    }
    
    useEffect(()=>{
        if(!payload){
            setLoading(false)
            return
         }
        ApiServices.login(payload)
        .then(({res,status})=>{
            if(status === 400){
                setError("User Not Found");
                return;
            }
            if(status !== 200){
                setError("APi Server of Jotish is Not Working");
                return;
            }
            setError("") 
            setUserData(res.TABLE_DATA.data);
            setLoading(false);
        })
        .catch(()=>{
            setError("APi Server of Jotish is Not Working");
            setLoading(false);
        })
    },[])
    const [userData, setUserData] = useState<Object | null>();
    return(
        <userContext.Provider value={{userData, setUserData, loading}}>{children}</userContext.Provider>
    )
}