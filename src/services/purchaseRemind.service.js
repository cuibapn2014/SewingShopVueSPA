import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const purchaseRemindService = {
    getDataAll,
    create,
    updateStatus
}

async function getDataAll(page = null){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    let queryPage = page != null ? '?page=' + page : ''
    return axios.get(`${config.apiUrl}/purchase-remind${queryPage}`, null, requestOptions);
}

async function create(id_request){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json',
        }
    };
    return axios.post(`${config.apiUrl}/purchase-remind/create/${id_request}`, null, requestOptions);
}

async function updateStatus(id_request, status){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    return axios.post(`${config.apiUrl}/purchase-remind/update-status/${id_request}`, {
        status: status
    }, requestOptions);
}
