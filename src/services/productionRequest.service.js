import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const productionRequestService = {
    getDataAll,
    findById,
    create,
    update,
    deleteById,
    showDataProgress,
    updateStatus,
    updateCompleted
}

async function getDataAll(page = null, data){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.get(`${config.apiUrl}/production-request`, {
        params:{
            ...data,
            page: page
        }
    }, requestOptions);
}

async function findById(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.get(`${config.apiUrl}/production-request/${id}`, null, requestOptions);
}

async function create(production){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    };
    return axios.post(`${config.apiUrl}/production-request/create`, production, requestOptions);
}

async function update(production){
    let id = production.get('id')
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    };
    return axios.post(`${config.apiUrl}/production-request/update/${id}`, production, requestOptions);
}

async function deleteById(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return await axios.delete(`${config.apiUrl}/production-request/delete/${id}`, null, requestOptions);
}

async function showDataProgress(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.get(`${config.apiUrl}/production-request/progress/${id}`, null, requestOptions);
}

async function updateStatus(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.put(`${config.apiUrl}/production-request/update-status/${id}`, null, requestOptions);
}

async function updateCompleted(data){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.put(`${config.apiUrl}/production-request/update-completed`, data, requestOptions);
}