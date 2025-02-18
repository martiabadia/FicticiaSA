import axios from "axios";

const httpService = axios.create({
    baseURL: "http://localhost:3001", // URL base del backend
    headers: {
        "Content-Type": "application/json",
    },
});

export default httpService;