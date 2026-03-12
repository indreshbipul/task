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

const getCordinates = async(payload :string)=>{
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${payload}&key=cc4d3ff277a346c3af7fb78ade6b24f3`,{
        method : "GET",
        headers  : {

        },
    })
    const res = await response.json();
    if(res.length === 0){
        return null
    }
    return {
        lat: Number(res.results[0].geometry.lat),
        lon: Number(res.results[0].geometry.lng)
    };
}

const ApiServices = {login, getCordinates};
export default ApiServices;