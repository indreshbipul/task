import { Navigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";

function ProtectedRoutes({children}){
    const {userData, loading} = useUserContext()
    if(!userData && !loading){
        return <Navigate to={"/login"} replace />
    }
    return children
}

export default ProtectedRoutes