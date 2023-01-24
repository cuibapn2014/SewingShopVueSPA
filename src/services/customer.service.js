import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const customerService = {
    getDataAll
}

async function getDataAll(page = null){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    let queryPage = page != null ? '?page=' + page : ''
    return axios.get(`${config.apiUrl}/customer${queryPage}`, null, requestOptions);
}