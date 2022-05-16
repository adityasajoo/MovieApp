import Link from 'next/link';
import React from 'react';
import styles from '../styles/MovieCard.module.css';

const MovieCard = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className={styles.movie__card}>
        <div className={styles.poster__container}>
          <img
            className={styles.poster}
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          {movie.vote_average !== 0 && (
            <p className={styles.rating}>{movie.vote_average}</p>
          )}
        </div>
        <div className={styles.title__container}>
          <p className={styles.title}>{movie.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
