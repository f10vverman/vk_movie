// kinopoisk.ts
import { client } from "./client";

export const getMovies = (
  page: number = 1,
  filters: { yearLte?: number; yearGte?: number; ratingLte?: number; ratingGte?: number } = {},
) => {
  const yearLte = filters.yearLte || 2025;
  const yearGte = filters.yearGte || 1990;
  return client.get("/v1.4/movie", {
    params: {
      page,
      limit: 50,
      selectFields: [
        "id",
        "name",
        "year",
        "rating",
        "poster",
        "genres",
        "description",
      ],
      notNullFields: ["poster.url", "name"],
      year: `${yearGte}-${yearLte}`,
      "rating.kp": "1-10"
    },
  });
};

//Поиск по названию 
export const searchMovies = (
  query: string,
  page: number = 1
) => {
  return client.get("/v1.4/movie/search", {
    params: {
      query,
      page,
      limit: 50,
      selectFields: [
        "id",
        "name",
        "year",
        "rating",
        "poster",
        "genres",
        "description",
      ],
      notNullFields: "poster.url",
    },
  });
};