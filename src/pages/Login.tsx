import { useState } from "react";
import ApiServices from "../services/ApiServices";
import useUserContext from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState<string | null>("");
    const [password, setPassword] = useState<string | null>("");
    const [error, setError] = useState<String | null>("");
    const {setUserData} = useUserContext<object | null>({})
    const navigate = useNavigate()
    const handel_Submite = ()=>{
        if(!username || !password){
            setError("Invalid Request");
            return;
        }
        localStorage.setItem("username", username);
        localStorage.setItem("password", password)
        const payload = {
            username,password
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
            navigate('/list')
        })
        .catch(()=>{
            setError("APi Server of Jotish is Not Working");
        })
    }
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4">
            <h1 className="text-blue-500 font-black text-center text-3xl mb-6">Jotish Login Page</h1>
            <div className="w-full max-w-sm flex flex-col bg-white p-8 rounded-lg shadow-md">
                {/* Error handeling */}
                {error &&(
                    <div className="text-red-500 font-black text-center text-xl mb-2">{error}</div>
                )}
                {/* UserName */}
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="username">
                        User-Name
                    </label>
                    <input 
                        onChange={(e)=>{setUsername(e.target.value)}} 
                        className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                        type="text" 
                        name="username"
                        value={username || ""}
                    />
                </div>
                {/* Password */}
                <div className="flex flex-col mb-6">
                    <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="password">
                        Password
                    </label>
                    <input 
                        onChange={(e)=>{setPassword(e.target.value)}} 
                        className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                        type="password" 
                        name="password" 
                        value={password || ""}                        
                    />
                        
                </div>

                {/* Submit Button */}
                <button 
                    onClick={handel_Submite}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors w-full"
                    >
                    Login
                </button>
                
            </div>
        </div>
    )
}

export default Login;