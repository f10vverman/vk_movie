import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './DetilsPage.module.scss';
import Header from '../../component/header/Header';
import { getMovies } from '../../servises/kinopoisk';
import { Button } from '@mui/material';

type Movie = {
  id: number;
  name: string;
  year: number;
  rating: { kp: number };
  poster: { url?: string; previewUrl?: string };
  description?: string;
  genres?: { name: string }[];
};

function DetilsPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    getMovies().then((res) => {
      const found = res.data.docs.find((m: Movie) => String(m.id) === id);
      setMovie(found);
    });
  }, [id]);

  if (!movie) return <div>Загрузка...</div>;

  return (
    <div className={styles.page}>
      <Link to="/">
        <div className={styles.back}><Button variant="outlined">Назад</Button></div>
      </Link>
      <div className={styles.movie_content}>
        <div className={styles.movie_content__left_side}>
          <div className={styles.logo_movie}>
            <img src={movie.poster?.url || movie.poster?.previewUrl} alt={movie.name} className={styles.logo_detils}/>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.name_movie}><h1>{movie.name}</h1></div>
          <div className={styles.genres}>
            {movie.genres?.map(genre => genre.name).join(', ') || 'Жанры не указаны'}
          </div>
          <div className={styles.more}><h2>{movie.description || 'Описание отсутствует'}</h2></div>
        </div>
        <div className={styles.right_side}>
          <div className={styles.rating}><h1>Рейтинг: {movie.rating?.kp}</h1></div>
          <div className={styles.premier_date}><h1>Год: {movie.year}</h1></div>
        </div>
      </div>
    </div>
  );
}

export default DetilsPage;
