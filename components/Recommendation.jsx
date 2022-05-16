import Link from 'next/link';
import React from 'react';
import styles from '../styles/Recommendation.module.css';

const Recommendation = ({ movie }) => {
  return (
    <>
      <Link href={`/movie/${movie.id}`}>
        <div className={styles.movie__card}>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
      </Link>
    </>
  );
};

export default Recommendation;
