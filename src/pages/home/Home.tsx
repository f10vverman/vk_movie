// Home.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Home.module.scss';
import Header from '../../component/header/Header';
import { getMovies } from '../../servises/kinopoisk';
import Skeleton from '@mui/material/Skeleton';

type Movie = {
  id: number;
  name: string;
  year: number;
  rating: { kp: number };
  poster: { url?: string; previewUrl?: string };
  genres?: { name: string }[]; // <--- добавьте эту строку
}

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();

  const loadMovies = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const res = await getMovies(page);
      const newMovies = res.data.docs;
      
      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies(prev => [...prev, ...newMovies]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    loadMovies();
  }, []);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMovies, loading]);

  // Получаем фильтры из searchParams
  const genres = searchParams.getAll('genres');
  const rating_gte = Number(searchParams.get('rating_gte')) || 0;
  const rating_lte = Number(searchParams.get('rating_lte')) || 10;
  const year_gte = Number(searchParams.get('year_gte')) || 1990;
  const year_lte = Number(searchParams.get('year_lte')) || new Date().getFullYear();

  // Фильтрация
  const filteredMovies = movies.filter(movie => {
    const genreMatch =
      genres.length === 0 ||
      (movie.genres && genres.some(g => movie.genres!.map((gg: { name: string }) => gg.name).includes(g)));
    const ratingMatch = movie.rating.kp >= rating_gte && movie.rating.kp <= rating_lte;
    const yearMatch = movie.year >= year_gte && movie.year <= year_lte;
    return genreMatch && ratingMatch && yearMatch;
  });

  return (
    <div className={styles.home_page}>
      <Header />
      <div className={styles.home}>
        {loading && movies.length === 0
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div className={styles.container} key={`skeleton-${idx}`}>
                <Skeleton variant="rectangular" width={260} height={390} style={{ borderRadius: 16, marginBottom: 16 }} />
                <Skeleton variant="text" width={180} height={32} />
                <Skeleton variant="text" width={100} height={24} />
                <Skeleton variant="text" width={80} height={24} />
              </div>
            ))
          : filteredMovies.map((movie) => (
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
                  <div className={styles.rating}>Рейтинг: {movie.rating?.kp}</div>
                </div>
              </Link>
            ))}
        {!hasMore && <div className={styles.endMessage}>Вы достигли конца списка</div>}
      </div>
    </div>
  );
}

export default Home;