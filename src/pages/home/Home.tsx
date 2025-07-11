import React from 'react';
import { Link } from 'react-router';

import styles from './Home.module.scss'
import Header from '../../component/header/Header';
import strah from '../../pic/Strah.jpg'
import stronger from '../../pic/Stronger_(film,_2017).jpg'
import youth from '../../pic/Youth.webp'
import moon from '../../pic/man_on_moon.jpg'
import phanrom from '../../pic/phantom_six.webp'
import { getMovies } from '../../servises/kinopoisk';

function Home() {

  getMovies().then(
    (res) => {console.log(res)}
  )

  return (
    <div className={styles.home_page}>
      <Header></Header>
      <div className={styles.home}>
      
        <Link to=":damn">
          <div className={styles.container}>
            <div className={styles.logo_movie}><img src={moon} alt="" className={styles.logo} /></div>
            <div className={styles.name_movie}><h4>Человек на луне</h4></div>
            <div className={styles.premier_date}>Дата примьеры: 11.10.23</div>
            <div className={styles.rating}>Рейтинг: 8.3</div>
          </div>
        </Link>
        <div className={styles.container}>
          <div className={styles.logo_movie}><img src={youth} alt="" className={styles.logo} /></div>
          <div className={styles.name_movie}><h4>Человек на луне</h4></div>
          <div className={styles.premier_date}>Дата примьеры: 11.10.23</div>
          <div className={styles.rating}>Рейтинг: 8.3</div>
        </div>
        <div className={styles.container}>
          <div className={styles.logo_movie}><img src={phanrom} alt="" className={styles.logo} /></div>
          <div className={styles.name_movie}><h4>Человек на луне</h4></div>
          <div className={styles.premier_date}>Дата примьеры: 11.10.23</div>
          <div className={styles.rating}>Рейтинг: 8.3</div>
        </div>
        <div className={styles.container}>
          <div className={styles.logo_movie}><img src={stronger} alt="" className={styles.logo} /></div>
          <div className={styles.name_movie}><h4>Человек на луне</h4></div>
          <div className={styles.premier_date}>Дата примьеры: 11.10.23</div>
          <div className={styles.rating}>Рейтинг: 8.3</div>
        </div>
        <div className={styles.container}>
          <div className={styles.logo_movie}><img src={strah} alt="" className={styles.logo} /></div>
          <div className={styles.name_movie}><h4>Человек на луне</h4></div>
          <div className={styles.premier_date}>Дата примьеры: 11.10.23</div>
          <div className={styles.rating}>Рейтинг: 8.3</div>
        </div>
        
      </div>
    </div>
    
    
    

  );
}

export default Home;