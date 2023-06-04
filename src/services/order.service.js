import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const orderService = {
    getDataAll,
    findById,
    updateStatus,
    create,
    update,
    deleteById
}

async function getDataAll(page = null, data){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.get(`${config.apiUrl}/order`, {
        params:{
            ...data,
            page: page
        }
    },requestOptions);
}

async function findById(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.get(`${config.apiUrl}/order/${id}`, null, requestOptions);
}

async function create(order){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    };
    return axios.post(`${config.apiUrl}/order/create`, order, requestOptions);
}

async function updateStatus(status, id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    };
    return axios.post(`${config.apiUrl}/order/update-status/${id}`, status, requestOptions);
}

async function update(order){
    let id = order.get('id')
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    };
    return axios.post(`${config.apiUrl}/order/update/${id}`, order, requestOptions);
}

async function deleteById(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return await axios.delete(`${config.apiUrl}/order/delete/${id}`, null, requestOptions);
}