import axios from "axios"

export const axios_instance = axios.create({
    baseURL : process.env.VUE_APP_BACKEND_URL + "/products/",
});
