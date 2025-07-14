// Home.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./Home.module.scss";
import Header from "../../component/header/Header";
import { getMovies, searchMovies } from "../../servises/kinopoisk";
import Skeleton from "@mui/material/Skeleton";

type Movie = {
  id: number;
  name: string;
  year: number;
  rating: { kp: number };
  poster: { url?: string; previewUrl?: string };
  genres?: { name: string }[]; // <--- добавьте эту строку
};

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [tab, setTab] = useState<'all' | 'favorites'>('all');

  const loadMovies = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      let res;
      if (search.trim()) {
        // Если есть поисковый запрос — ищем по названию
        res = await searchMovies(search, page);
      } else {
        // Иначе обычная фильтрация
        res = await getMovies(page, {
          yearLte: Number(searchParams.get("year_lte")),
          yearGte: Number(searchParams.get("year_gte")),
          ratingLte: Number(searchParams.get("rating_lte")),
          ratingGte: Number(searchParams.get("rating_gte")),
        });
      }
      const newMovies = res.data.docs;

      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => [...prev, ...newMovies]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, searchParams, search]);

  useEffect(() => {
    if (!search) {
      setMovies([]);
      setPage(1);
      setHasMore(true);
      loadMovies();
    }
    
  }, [searchParams]);

  useEffect(() => {
    if (search) {
      setMovies([]);
      setPage(1);
      setHasMore(true);
      loadMovies();
    }

  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        !loading
      ) {
        loadMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMovies, loading]);

  // Получаем фильтры из searchParams
  const genres = searchParams.getAll("genres");
  const rating_gte = Number(searchParams.get("rating_gte")) || 0;
  const rating_lte = Number(searchParams.get("rating_lte")) || 10;
  const year_gte = Number(searchParams.get("year_gte")) || 1990;
  const year_lte =
    Number(searchParams.get("year_lte")) || new Date().getFullYear();

  // Фильтрация
  const filteredMovies = React.useMemo(() => {
    if (search.trim()) {
      // Если идет поиск по названию — не фильтруем дополнительно, показываем все, что вернул API
      return movies;
    }
    // Если нет поиска — фильтруем по жанрам, рейтингу и году
    return movies.filter((movie) => {
      const genreMatch =
        genres.length === 0 ||
        (movie.genres &&
          genres.some((g) =>
            movie.genres!.map((gg: { name: string }) => gg.name).includes(g),
          ));
      const ratingMatch =
        movie.rating.kp >= rating_gte && movie.rating.kp <= rating_lte;
      const yearMatch = movie.year >= year_gte && movie.year <= year_lte;
      return genreMatch && ratingMatch && yearMatch;
    });
  }, [movies, genres, rating_gte, rating_lte, year_gte, year_lte, search]);

  // Функция для добавления/удаления из избранного
  const toggleFavorite = (movie: Movie) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === movie.id);
      let updated;
      if (exists) {
        updated = prev.filter(fav => fav.id !== movie.id);
      } else {
        updated = [...prev, movie];
      }
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const moviesToShow = tab === 'favorites' ? favorites : filteredMovies;

  return (
    <div className={styles.home_page}>
      <Header
        search={search}
        setSearch={setSearch}
        favorites={favorites}
        setTab={setTab}
        tab={tab}
      />
      <div className={styles.home}>
        {loading && moviesToShow.length === 0
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div className={styles.container} key={`skeleton-${idx}`}>
                <Skeleton
                  variant="rectangular"
                  width={260}
                  height={390}
                  style={{ borderRadius: 16, marginBottom: 16 }}
                />
                <Skeleton variant="text" width={180} height={32} />
                <Skeleton variant="text" width={100} height={24} />
                <Skeleton variant="text" width={80} height={24} />
              </div>
            ))
          : moviesToShow.map((movie) => (
              <Link to={`/${movie.id}`} key={movie.id}>
                <div className={styles.container}>
                  <div className={styles.logo_movie}>
                    <img
                      src={movie.poster?.previewUrl || movie.poster?.url}
                      alt={movie.name}
                      className={styles.logo}
                    />
                  </div>
                  <div className={styles.name_movie}>
                    <h4>{movie.name}</h4>
                  </div>
                  <div className={styles.premier_date}>Год: {movie.year}</div>
                  <div className={styles.rating}>
                    Рейтинг: {movie.rating?.kp}
                  </div>
                  <button
                    className={styles.favoriteBtn}
                    onClick={e => {
                      e.preventDefault();
                      toggleFavorite(movie);
                    }}
                  >
                    {favorites.some(fav => fav.id === movie.id) ? '★' : '☆'}
                  </button>
                </div>
              </Link>
            ))}
        {!hasMore && (
          <div className={styles.endMessage}>Вы достигли конца списка</div>
        )}
      </div>
    </div>
  );
}

export default Home;