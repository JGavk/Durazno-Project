import axios from 'axios';

export const registerUser = async (data: any) => {
    try{
        const responseAPI = await axios.post('http://localhost:8000/login/register', data);
        return responseAPI.data;
    }catch(error){
        console.log("Error: Arregla el hdp código");
        console.log(data);
        return error;
    }

}

export const getUser = async () => {
    try{
        const responseAPI = await axios.get('http://localhost:8000/users');
        return responseAPI.data;
    }catch(error){
        return error;
    }

}

