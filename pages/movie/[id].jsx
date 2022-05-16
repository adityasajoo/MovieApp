import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import Cast from '../../components/Cast';
import MovieCard from '../../components/MovieCard';
import Recommendation from '../../components/Recommendation';
import styles from '../../styles/Movie.module.css';

const Movie = ({ movie, casts, recommendations }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(recommendations);

  //Get Genres
  const genre = movie.genres.map(a => a.name);

  return (
    <div className={styles.container}>
      <div
        className={styles.movie__container}
        style={{
          backgroundImage: `linear-gradient(#2e2c2c7e, #433e3e7f), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}>
        <div className={styles.movie__poster}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={styles.movie__details}>
          <p className={styles.title}>{`${movie.original_title} (${
            movie.release_date.split('-')[0]
          })`}</p>
          <p className={styles.subTitle}>
            {`${movie.release_date}`} &#183; {`${genre.join(', ')}`} &#183;{' '}
            {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
          </p>
          <p className={styles.rating}>
            User Rating : <span>{movie.vote_average}</span>
          </p>
          <p className={styles.tagline}>{movie.tagline}</p>
          <p className={styles.header}>Overview</p>
          <p className={styles.overview}> {movie.overview}</p>
        </div>
      </div>
      <p className={styles.main__header}>Cast</p>
      <div className={styles.cast__container}>
        {casts.map(
          cast => cast.profile_path && <Cast cast={cast} key={cast.id} />
        )}
      </div>
      <p className={styles.main__header}>Recommendations</p>
      <div className={styles.cast__container}>
        {recommendations.map(recommendation => (
          <Recommendation movie={recommendation} key={recommendation.id} />
        ))}
      </div>
    </div>
  );
};

export default Movie;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const api_key = process.env.API_KEY;
  const movieDetailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`;
  const movieCastUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=en-US`;
  const movieRecommendationUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`;
  try {
    const movieDetail = await axios.get(movieDetailUrl);
    const movieCast = await axios.get(movieCastUrl);
    const movieRecommendation = await axios.get(movieRecommendationUrl);
    return {
      props: {
        movie: movieDetail.data,
        casts: movieCast.data.cast,
        recommendations: movieRecommendation.data.results,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
