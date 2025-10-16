
import axios from "axios";

export const stripeRequest = axios.create({
    baseURL: "http://localhost:1337/api", // no /api here
});