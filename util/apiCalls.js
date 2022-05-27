import axios from "axios"

const  BASE_URL = "http://localhost:3000/api/";

export const axiosReq = axios.create({
    baseURL:  BASE_URL
})