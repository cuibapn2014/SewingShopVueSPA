import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const ingredientService = {
    getDataAll,
    getDataBySelectBox,
    getDataProductBySelectBox,
    create,
    update,
    findById,
    deleteById
}

async function getDataAll(url = null, query){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    let uri = `${config.apiUrl}/ingredient?${query}`;
    return axios.get(url ?? uri, null ,requestOptions);
}

async function getDataBySelectBox(data){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.get(`${config.apiUrl}/select-box/ingredient`, {
        params:{
            ...data,
        }
    },requestOptions);
}

async function getDataProductBySelectBox(data){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.get(`${config.apiUrl}/select-box/product`, {
        params:{
            ...data,
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