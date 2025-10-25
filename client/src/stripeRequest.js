// for localhoast
// import axios from "axios";

// export const stripeRequest = axios.create({
//     baseURL: "http://localhost:1337/api", // no /api here
// });

// for vercek diployment
import axios from "axios";

export const stripeRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
    },
});