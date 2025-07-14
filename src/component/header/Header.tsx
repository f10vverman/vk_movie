import React from 'react';
import styles from './Header.module.scss';
import logo_vk from '../../pic/VK Logo.svg';
import { Button, InputLabel, MenuItem, FormControl, Select, Slider, OutlinedInput, Box, Chip } from '../../mui';
import type { SelectChangeEvent } from '../../mui';
import { useSearchParams } from 'react-router-dom';

const GENRES = [
  'драма', 'комедия', 'боевик', 'триллер', 'фантастика', 'мелодрама', 'ужасы', 'приключения', 'аниме'
];

type Movie = {
  id: number;
  name: string;
  year: number;
  rating: { kp: number };
  poster: { url?: string; previewUrl?: string };
  genres?: { name: string }[];
  description?: string;
};

type HeaderProps = {
  search: string;
  setSearch: (value: string) => void;
  favorites: Movie[];
  tab: 'all' | 'favorites';
  setTab: (tab: 'all' | 'favorites') => void;
};

function Header({ search, setSearch, favorites, tab, setTab }: HeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Жанры
  const [genres, setGenres] = React.useState<string[]>(searchParams.getAll('genres'));
  // Рейтинг
  const [rating, setRating] = React.useState<number[]>([
    Number(searchParams.get('rating_gte')) || 0,
    Number(searchParams.get('rating_lte')) || 10
  ]);
  // Годы
  const [years, setYears] = React.useState<number[]>([
    Number(searchParams.get('year_gte')) || 1990,
    Number(searchParams.get('year_lte')) || new Date().getFullYear()
  ]);

  // Обновление searchParams при изменении фильтров
  React.useEffect(() => {
    const params: any = {};
    if (genres.length) params.genres = genres;
    if (rating[0] !== 0) params.rating_gte = rating[0];
    if (rating[1] !== 10) params.rating_lte = rating[1];
    if (years[0] !== 1990) params.year_gte = years[0];
    if (years[1] !== new Date().getFullYear()) params.year_lte = years[1];
    setSearchParams(params);
  }, [genres, rating, years, setSearchParams]);

  // Обработчики
  const handleGenresChange = (event: SelectChangeEvent<typeof genres>) => {
    const { value } = event.target;
    setGenres(typeof value === 'string' ? value.split(',') : value);
  };
  const handleRatingChange = (_: Event, newValue: number | number[]) => {
    setRating(newValue as number[]);
  };
  const handleYearsChange = (_: Event, newValue: number | number[]) => {
    setYears(newValue as number[]);
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <img src={logo_vk} alt="logo" className={styles.logo} />
        <h1>MOVIE</h1>
      </div>
      <div className={styles.tabs}>
        <Button
          variant={tab === 'all' ? 'contained' : 'outlined'}
          onClick={() => setTab('all')}
        >
          Все фильмы
        </Button>
        <Button
          variant={tab === 'favorites' ? 'contained' : 'outlined'}
          onClick={() => setTab('favorites')}
        >
          Избранное ({favorites.length})
        </Button>
      </div>
      <div className={styles.filters}>
        {/* Жанры */}
        <FormControl sx={{ minWidth: 200, maxWidth: 300 }}>
          <InputLabel id="genres-label">Жанры</InputLabel>
          <Select
            labelId="genres-label"
            id="genres"
            multiple
            value={genres}
            onChange={handleGenresChange}
            input={<OutlinedInput label="Жанры" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {GENRES.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Рейтинг */}
        <FormControl sx={{ minWidth: 200, maxWidth: 300 }}>
          <InputLabel shrink>Рейтинг</InputLabel>
          <Box sx={{ px: 2, pt: 3 }}>
            <Slider
              value={rating}
              onChange={handleRatingChange}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              step={0.1}
            />
          </Box>
        </FormControl>
        {/* Годы */}
        <FormControl sx={{ minWidth: 200, maxWidth: 300 }}>
          <InputLabel shrink>Год выпуска</InputLabel>
          <Box sx={{ px: 2, pt: 3 }}>
            <Slider
              value={years}
              onChange={handleYearsChange}
              valueLabelDisplay="auto"
              min={1990}
              max={new Date().getFullYear()}
              step={1}
            />
          </Box>
        </FormControl>
      </div>
      <div className={styles['input-container']}>
        <input
          type="text"
          id="input"
          placeholder=" "
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <label htmlFor="input" className={styles.label}>Поиск фильмов...</label>
        <div className={styles.underline}></div>
      </div>
    </div>
  );
}

export default Header;
