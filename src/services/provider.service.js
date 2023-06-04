import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const providerService = {
    getDataAll,
    create,
    update,
    findById,
    deleteById,
    getDataSelect
}

async function getDataAll(page = null, data = null){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.get(`${config.apiUrl}/provider`, {
        params:{
            ...data,
            page: page
        }
    }, requestOptions);
}

async function getDataSelect(data = null){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.get(`${config.apiUrl}/select-box/provider`, {
        params:{
            ...data
        }
    }, requestOptions);
}

async function create(provider){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.post(`${config.apiUrl}/provider/create`, provider, requestOptions);
}

async function update(provider){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.put(`${config.apiUrl}/provider/update/${provider.id}`, provider, requestOptions);
}

async function findById(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.get(`${config.apiUrl}/provider/${id}`, null, requestOptions);
}

async function deleteById(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.delete(`${config.apiUrl}/provider/delete/${id}`, null, requestOptions);
}