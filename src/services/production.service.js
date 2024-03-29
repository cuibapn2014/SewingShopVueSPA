import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const productionService = {
    getDataAll,
    create
}

async function getDataAll(page = null){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    let queryPage = page != null ? '?page=' + page : ''
    return axios.get(`${config.apiUrl}/production${queryPage}`, null, requestOptions);
}

async function create(id_production){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.post(`${config.apiUrl}/production/create/${id_production}`, null, requestOptions);
}
