import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.BUISNESS_SERVICE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});