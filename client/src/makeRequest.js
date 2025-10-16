import { API_TOKEN, API_URL } from "./../src/config";
import axios from "axios";

export const makeRequest = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
    }
})