import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DetilsPage.module.scss'
import Header from '../../component/header/Header';
import strah from '../../pic/Strah.jpg'
import stronger from '../../pic/Stronger_(film,_2017).jpg'
import youth from '../../pic/Youth.webp'
import moon from '../../pic/man_on_moon.jpg'
import phanrom from '../../pic/phantom_six.webp'

function DetilsPage() {
  return (
    <div className={styles.page}>
      <Link to="/">
        <div className={styles.back}><h1>Назад</h1></div>
      </Link>
      
      <div className={styles.movie_content}>
        <div className={styles.movie_content__left_side}>
          <div className={styles.logo_movie}>
            <img src={moon} alt="" className={styles.logo_detils}/>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.name_movie}></div>
          <div className={styles.more}></div>
        </div>
        <div className={styles.right_side}>
          <div className={styles.rating}></div>
          <div className="premier_date"></div>
        </div>

      </div>
    </div>
  );
}

export default DetilsPage;
