import axios from "axios";
const token = process.env.REACT_APP_KINOPOISK_TOKEN;
console.log("TOKEN:", token);
export const client = axios.create({baseURL:"https://api.kinopoisk.dev", headers:{"X-API-KEY":token}, paramsSerializer: {
    serialize: (params) => {
      const searchParams = new URLSearchParams();
      for (const key in params) {
        const value = params[key];
        if (Array.isArray(value)) {
          value.forEach(val => {
            searchParams.append(key, val);
          });
        } else {
          searchParams.append(key, value);
        }
      }
      return searchParams.toString();
    },
  },})