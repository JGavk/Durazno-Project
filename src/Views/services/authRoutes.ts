import axios from 'axios';

export const registerUser = async (data: any) => {
    try{
        const responseAPI = await axios.post('http://localhost:8000/login/register', data);
        return responseAPI.data;
    }catch(error){
        return error;
    }

}

export const loginUser = async (data: any) => {
    try{
        const responseAPI = await axios.post('http://localhost:8000/login/', data);
        return responseAPI.data;
    }catch(error){
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

