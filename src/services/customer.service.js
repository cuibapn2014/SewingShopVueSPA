import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const customerService = {
    getDataAll,
    create,
    findById,
    update,
    deleteById
}

async function getDataAll(page = null, data = null){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.get(`${config.apiUrl}/customer`, {
        params:{
            ...data,
            page: page
        }
    }, requestOptions);
}

async function create(customer){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.post(`${config.apiUrl}/customer/create`, customer, requestOptions);
}

async function findById(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.get(`${config.apiUrl}/customer/${id}`, null, requestOptions);
}

async function update(customer){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.put(`${config.apiUrl}/customer/update/${customer.id}`, customer, requestOptions);
}

async function deleteById(id){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.delete(`${config.apiUrl}/customer/delete/${id}`, null, requestOptions);
}