import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const ingredientService = {
    getDataAll,
    create,
    update,
    findById,
    deleteById
}

async function getDataAll(page = null, data){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.get(`${config.apiUrl}/ingredient`, {
        params:{
            ...data,
            page: page
        }
    },requestOptions);
}

async function create(ingredient){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    };
    return axios.post(`${config.apiUrl}/ingredient/create`, ingredient, requestOptions);
}

async function update(ingredient){
    let id = ingredient.get('id')
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    };
    return axios.post(`${config.apiUrl}/ingredient/update/${id}`, ingredient, requestOptions);
}

async function findById(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.get(`${config.apiUrl}/ingredient/${id}`, null, requestOptions);
}

async function deleteById(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.delete(`${config.apiUrl}/ingredient/delete/${id}`, null, requestOptions);
}