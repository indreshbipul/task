const baseUrl = "https://backend.jotish.in/backend_dev/gettabledata.php";

const login = async(payload : object)=>{
    try{
        const response = await fetch(`${baseUrl}/`,{
            method : "POST",
            headers : {
    
            },
            body : JSON.stringify(payload)
        });
        const res = await response.json();
        return {res, status : response.status};
    }
    catch(err){
        throw err;
    }
}

const ApiServices = {login};
export default ApiServices;