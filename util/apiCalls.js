import axios from "axios"

const  BASE_URL = "https://share-me-five.vercel.app/api/";

export const axiosReq = axios.create({
    baseURL:  BASE_URL
})