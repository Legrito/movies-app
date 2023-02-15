import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MoviesList from '../components/MoviesList/MoviesList';
import { MovieLoader } from '../components/Loader';
import { getMoviesByQuery } from '../services/ApiServices';
import SearchForm from '../components/SearchForm/SearchForm';

const queryString = require('query-string');

const SearchMovies = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const parsed = queryString.parse(location.search);

  const [query, setQuery] = useState(parsed.query);
  const [userQuery, setUserQuery] = useState(parsed.query);

  const { isLoading, isError, data: movies, isFetching } = useQuery(
    ['projects', query],
    () => getMoviesByQuery(query),
    {
      // The query will not execute until the query exists
      enabled: !!query,
    }
  );

  const handleChange = (e) => {
    setUserQuery(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setQuery(e.target.id);
    navigate({
      pathname: location.pathname,
      search: `query=${e.target.id}`
    });
  }

  // const filterByGenre = (e) => {
  //   e.preventDefault();
  //   console.log('Filter');
  //   if (movies.length === 0) {
  //     return;
  //   }
    
  //   const filteredByGenre = movies.filter((movie) => movie.genre_ids.includes(+e.target.id));
  //   setActiveGenre(e.target.id);

  //   setFilteredMovies(filteredByGenre);
  // };

  return (
    <section className="search__section">
      <SearchForm value={userQuery} onChange={handleChange} onSubmit={handleSubmit} />
      {isError && <p>Nothing is found...</p>}
      {/* {movies.length > 0 && !isError && <GenresFilter activeGenre={activeGenre} onClick={filterByGenre} />} */}
      {isLoading && <MovieLoader />}
      {!(isLoading && isError) && <MoviesList moviesData={movies?.results} isFetching={isFetching} />}
    </section>
  );
};

export default SearchMovies;
