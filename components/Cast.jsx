import React from 'react';
import styles from '../styles/Cast.module.css';

const Cast = ({ cast }) => {
  return (
    <div className={styles.profile}>
      <img src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`} />
      <div className={styles.name}>
        <p>{cast.name}</p>
      </div>
    </div>
  );
};

export default Cast;
