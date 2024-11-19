import axios from 'axios';
import axiosInstance from './axiosInstance';

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
        const responseAPI = await axiosInstance.post('http://localhost:8000/login/', data);
        const userData = responseAPI.data;
        console.log("DATAAA",userData.user)
        sessionStorage.setItem('user', JSON.stringify(userData));
        return userData;
    }catch(error){
        return error;
    }

}

export const getUsers = async () => {
    try{
        const responseAPI = await axios.get('http://localhost:8000/users');
        return responseAPI.data;
    }catch(error){
        return error;
    }

}

export const getUserById = async (id: string) => {
    try{
        const token = JSON.parse(sessionStorage.getItem('user') || '{} ');
        console.log("TOKEN",token.user.session_id)
        const responseAPI = await axiosInstance.get(`/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token.user.session_id}`
            }
        });
        return responseAPI.data;
    }catch(error){
        return error;
    }
}
