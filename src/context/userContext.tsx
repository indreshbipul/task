import { createContext, useEffect, useState } from "react"

export const userContext = createContext(null)

export function UserProvider({children}){
    const [userData, setUserData] = useState<Object | null>();
    return(
        <userContext.Provider value={{userData, setUserData}}>{children}</userContext.Provider>
    )
}