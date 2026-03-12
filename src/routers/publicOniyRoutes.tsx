import { Navigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";

function PublicOnlyRoutes({children}){
    const {userData} = useUserContext();
    if(userData){
        return <Navigate to={"/list"} replace />
    }
    return children
}

export default PublicOnlyRoutes