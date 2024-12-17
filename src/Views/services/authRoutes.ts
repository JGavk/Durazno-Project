import axios from 'axios';
import axiosInstance from './axiosInstance';

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
        const responseAPI = await axiosInstance.post('http://localhost:8000/login/', data);
        const userData = responseAPI.data;
        sessionStorage.setItem('user', JSON.stringify(userData));
        return userData;
    }catch(error){
        return error;
    }

}

export const loginAdviser = async (data: any) => {
    try{
        const responseAPI = await axiosInstance.post('http://localhost:8000/adv/login/', data);
        const userData = responseAPI.data;
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

export const getCans = async () => {
    try{
        const responseAPI = await axios.get('http://localhost:8000/rtdog/')
        return responseAPI.data
    }catch(error){
        return error
    }
}


export const getUserById = async (id: string) => {
    try{
        const token = JSON.parse(sessionStorage.getItem('user') || '{} ');
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

export const logoutUser = async () => {
    try {

        const responseAPI = await axiosInstance.post('http://localhost:8000/logout/', {}, {
            withCredentials: true 
        });

        if (responseAPI.status === 200) {
            console.log("Logout exitoso");
            sessionStorage.removeItem('user'); 
            return { status: 'ok', message: 'User logged out successfully.' };
        } else {
            console.error("Error en el logout:", responseAPI.data);
            return { status: 'fail', message: 'Logout failed.' };
        }
    } catch (error) {
        console.error('Error en el logout:', error);
        return { status: 'fail', message: 'Error logging out.' };
    }
};

export const logoutAdviser = async () => {
    try {

        const responseAPI = await axiosInstance.post('http://localhost:8000/adv/logout/', {}, {
            withCredentials: true 
        });

        if (responseAPI.status === 200) {
            console.log("Logout exitoso");
            sessionStorage.removeItem('csrftoken'); 
            return { status: 'ok', message: responseAPI.data.message };
        } else {
            console.error("Error en el logout:", responseAPI.data);
            return { status: 'fail', message: 'Logout failed.' };
        }
    } catch (error) {
        console.error('Error en el logout:', error);
        return { status: 'fail', message: 'Error logging out.' };
    }
}

export const registerCan = async (data: any) => {
    try {

        const responseAPI = await axiosInstance.post('http://localhost:8000/doggo/',  data, {
            withCredentials: true
        });
        console.log(responseAPI.data);
        return responseAPI.data
    }catch(error){
        return error;
    }    
}

export const getCanes = async () => {
    try{
        const responseAPI = await axiosInstance.get('http://localhost:8000/rtdog/');
        return responseAPI.data;
    }catch(error){
        return error;
    }
}