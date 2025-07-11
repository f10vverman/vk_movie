import { client } from "./client";


export const getMovies = () => {
    return client.get("/v1.4/movie?page=1&limit=50&selectFields=id&selectFields=name&selectFields=year&selectFields=rating&notNullFields=name&rating.kp=0.1-10&selectFields=poster")
    
}