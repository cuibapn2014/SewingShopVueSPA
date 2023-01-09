import { config } from "../helpers/config";
import { authHeader } from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true


export const metadataService = {
    getAnalytic
}

async function getAnalytic(){
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.get(`${config.apiUrl}/analytic`, null, requestOptions);
}