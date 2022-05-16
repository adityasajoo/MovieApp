import axios from 'axios';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import styles from '../styles/Home.module.css';
import Loader from '../components/Loader';

export default function Home({ movies, moviesWeek }) {
  return (
    <>
      <div className={styles.header__container}>
        <p className={styles.header}>Popular Today</p>
      </div>
      <div className={styles.movie__container}>
        {movies.map(movie => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
      <div className={styles.header__container}>
        <p className={styles.header}>Popular This Week</p>
      </div>
      <div className={styles.movie__container}>
        {moviesWeek.map(movie => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const api_key = process.env.API_KEY;
  const randomPage = Math.floor(Math.random() * (1 - 200 + 1) + 200);
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}&page=${randomPage}&adult=false`;
  const urlWeek = `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}&page=${randomPage}&adult=false`;
  try {
    const res = await axios.get(url);
    const resWeek = await axios.get(urlWeek);
    // console.log(res.data.results);
    return {
      props: {
        movies: res.data.results,
        moviesWeek: resWeek.data.results,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
};
