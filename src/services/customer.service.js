import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const customerService = {
    getDataAll,
    create,
    findById,
    getDataBySelectBox,
    update,
    deleteById
}

async function getDataAll(url = null, query = null){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    let uri = `${config.apiUrl}/customer?${query}`

    return axios.get(url ?? uri, requestOptions);
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

async function getDataBySelectBox(data){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.get(`${config.apiUrl}/select-box/customer`, {
        params:{
            ...data,
        }
    },requestOptions);
}