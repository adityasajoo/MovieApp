import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import MovieCard from '../../components/MovieCard';
import styles from '../../styles/Search.module.css';
const Search = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const url = `/api/search?searchText=${search}`;
    const res = await axios.get(url);
    setMovies(res.data);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search__container}>
        <input
          type='text'
          placeholder='Search for your favourite movies!!'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={fetchData}>Search</button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.movie__container}>
          {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
