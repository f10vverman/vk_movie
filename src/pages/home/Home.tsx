// Home.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import Header from '../../component/header/Header';
import { getMovies } from '../../servises/kinopoisk';

type Movie = {
  id: number;
  name: string;
  year: number;
  rating: { kp: number };
  poster: { url?: string; previewUrl?: string };
}

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
        document.documentElement.offsetHeight - 100 && 
        !loading
      ) {
        loadMovies();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMovies, loading]);

  return (
    <div className={styles.home_page}>
      <Header />
      <div className={styles.home}>
        {movies.map((movie) => (
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
        {loading && <div className={styles.loading}>Загрузка...</div>}
        {!hasMore && <div className={styles.endMessage}>Вы достигли конца списка</div>}
      </div>
    </div>
  );
}

export default Home;