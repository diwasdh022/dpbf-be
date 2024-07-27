import axios from "axios";
import config from "../config";

// const https = require('https');
//
// const agent = new https.Agent({
//     rejectUnauthorized: false,
// });

const instance = axios.create({
    baseURL: config.WS_BASE_URL,
});

instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    config.headers.ContentType = "application/json";
    return config;
});

export const getAll = async () => await instance.get("admin/get-admins");

export const register = async (name, email, password, contact, designation) =>
    await instance.post("admin/add-admin", { name, email, password, contact, designation });

export const confirmRegister = async (id) => await instance.post(`admin/confirm/${id}`);

export const forgotPassword = async (email) =>
    await instance.post("admin/forgotpassword", { email });

export const confirmReset = async (id, password) =>
    await instance.post(`admin/resetpass/${id}`, { password });

export const login = async (email, password, rememberMe) =>
    await instance.post("admin/login", { email, password, stay: rememberMe });

export const logout = async (token) => await instance.post("admin/logout", { token });

export const edit = async (userID, name, email, contact, designation) =>
    await instance.patch(`/admin/update-admin/${userID}`, {
        name,
        email,
        contact: contact,
        designation,
    });
