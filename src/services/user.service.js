import {
    config
} from "../helpers/config";
import {
    authHeader
} from "../helpers/auth-header";
import axios from "axios";

axios.defaults.withCredentials = true

export const userService = {
    login,
    logout,
    logout,
    register,
    update,
    delete: _delete,
    profile,
    updateAvatar,
    update,
    changePassword,
    forgotPassword,
    getAll
}

function login(user) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return axios.post(`${config.apiUrl}/auth/login`, {
        email: user.username,
        password: user.password,
        remember: user.remember
    }, requestOptions)
}

function logout() {
    // xoá user từ local storage để log out
    localStorage.removeItem('user');
    const options = {
        headers: authHeader()
    }
    const now = new Date().toUTCString()
    return axios.post(`${config.apiUrl}/auth/logout`, null, options)
}

async function register(user) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return await axios.post(`${config.apiUrl}/auth/register`, user, requestOptions);
}

function getAll(page) {
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };
    let queryPage = page != null ? '?page=' + page : ''
    return axios.get(`${config.apiUrl}/users${queryPage}`, null, requestOptions);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.put(`${config.apiUrl}/auth/update`, user, requestOptions);
}

function _delete(id) {
    const requestOptions = {
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function profile() {
    const requestOptions = {
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        }
    };

    return axios.get(`${config.apiUrl}/auth/user-profile`, null, requestOptions);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // tự động logout nếu response 401 được trả về từ api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

async function updateAvatar(dataImage) {
    let configHeader = {
        header: {
            "Content-Type": "image/*",
        },
    };
    return await axios
        .post(`${config.apiUrl}/auth/change-avatar`, dataImage, configHeader)
}

async function changePassword(dataUser) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return await axios
        .post(`${config.apiUrl}/auth/change-pass`, dataUser, requestOptions)
}

async function forgotPassword(email){
    return await axios.post(`${config.apiUrl}/auth/forgot-password`, email)
}