// kinopoisk.ts
import { client } from "./client";

export const getMovies = (page: number = 1) => {
    return client.get("/v1.4/movie", {
        params: {
            page,
            limit: 50,
            selectFields: [
                'id', 'name', 'year', 'rating', 
                'poster', 'genres', 'description'
            ],
            notNullFields: ['name', 'poster.url', 'description'],
            'rating.kp': '0.1-10'
        }
    });
}