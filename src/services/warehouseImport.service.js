import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const warehouseImportService = {
    getDataAll
}

async function getDataAll(page = null, type = 1){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    let queryPage = page != null ? `?page=${page}` : ''
    return axios.get(`${config.apiUrl}/warehouse-import${queryPage}`, requestOptions);
}