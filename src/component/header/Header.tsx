import React from 'react';
import './Header.css'
import logo_kino from './Kinopoisk_colored_logo.svg'

function Header() {
  return (
    <div className="header">
        <img src={logo_kino} alt="logo" className='logo' />
        <div className="input-container">
          <input type="text" id="input" placeholder=" " />
          <label htmlFor="input" className="label">Поиск фильмов...</label>
          <div className="underline"></div>
        </div>

        <div className="filters">
  <div className="genre select-container">
    <select className="selects">
      <option value="" disabled selected>По жанру</option>
      <option value="drama">Драма</option>
      <option value="comedy">Комедия</option>
      <option value="action">Боевик</option>
    </select>
    <div className="select-underline"></div>
  </div>
  
  <div className="rating select-container">
    <select className="selects">
      <option value="" disabled selected>По рейтингу</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <div className="select-underline"></div>
  </div>
  
  <div className="release select-container">
    <select className="selects">
      <option value="" disabled selected>По году выхода</option>
      <option value="1990">1990</option>
      <option value="1991">1991</option>
      <option value="1992">1992</option>
    </select>
    <div className="select-underline"></div>
  </div>
</div>

    </div>
  );
}

export default Header;
