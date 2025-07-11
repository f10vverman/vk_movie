import axios from "axios";
const token = "X2NFWJP-W5TM9EK-PBC119Y-JV30MXR";
export const client = axios.create({baseURL:"https://api.kinopoisk.dev", headers:{"X-API-KEY":token}})