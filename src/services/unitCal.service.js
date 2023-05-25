import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const unitCalService = {
    getDataAll,
    getDataSelect
}

const path = "unit-cal"

async function getDataAll(page = null, data){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.get(`${config.apiUrl}/${path}`, {
        params:{
            ...data,
            page: page
        }
    },requestOptions);
}

async function getDataSelect(data = null){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.get(`${config.apiUrl}/${path}/select`, {
        params:{
            ...data
        }
    }, requestOptions);
}