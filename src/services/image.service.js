import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const imageService = {
    findById,
    deleteById
}

async function findById(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.get(`${config.apiUrl}/image/${id}`, null, requestOptions);
}

async function deleteById(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.delete(`${config.apiUrl}/image/delete/${id}`, null, requestOptions);
}