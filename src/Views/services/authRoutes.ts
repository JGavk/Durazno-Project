import axios from 'axios';
/*
FUNCIONES DE ESCUCHA DE PUERTOS EN BACKEND, ESTAS SE LLAMAN EN CADA ARCHIVO DONDE SE NECESITE, SE AÑADEN MÁS RESPECTIVAMENTE
*/
export const registerUser = async (data: any) => {
    try{
        const responseAPI = await axios.post('http://localhost:8000/login/register', data);
        return responseAPI;
    }catch(error){
        return error;
    }

}

export const getUser = async () => {
    try{
        const responseAPI = await axios.get('http://localhost:8000/users');
        return responseAPI;
    }catch(error){
        return error;
    }

}
export const loginUser = async (data: any) => {
    try{
        const responseAPI = await axios.post('http://localhost:8000/login/', data);
        console.log(data)
        return responseAPI.data;
    }catch(error){
        return error;
    }

}
export const getOneUser = async () => {
    try{
        const responseAPI = await axios.get('http://localhost:8000/client');
        return responseAPI;
    }catch(error){
        return error;
    }
}

