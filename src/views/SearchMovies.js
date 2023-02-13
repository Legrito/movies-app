import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MoviesList from '../components/MoviesList/MoviesList';
import { MovieLoader } from '../components/Loader';
import { getMoviesByQuery } from '../services/ApiServices';
import GenresFilter from '../components/GenresFilter';
import SearchForm from '../components/SearchForm/SearchForm';

const queryString = require('query-string');

const SearchMovies = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const parsed = queryString.parse(location.search);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [query, setQuery] = useState(parsed.query);

  useEffect(() => {
    if (parsed.query) {
      setIsLoading(true);

      getMoviesByQuery(parsed.query).then((resp) => {
        if (resp.data.results.length === 0) {
          setIsError(true);
          setMovies([]);
          return;
        }
        setIsLoading(false);
        setMovies(resp.data.results);
      });
    }
  }, [parsed.query]);

  const onChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  const onClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFilteredMovies([]);
    if (!query) {
      setIsError(true);
      navigate({
        pathname: location.pathname,
        search: ''
      });
      return;
    }
    getMoviesByQuery(query).then((resp) => {
      navigate({
        pathname: location.pathname,
        search: `query=${query}`
      });
      if (resp.data.results.length === 0) {
        setIsError(true);
        setMovies([]);
        setIsLoading(false);
        return;
      }
      setIsError(false);
      setMovies(resp.data.results);
      setIsLoading(false);
    });
  };

  const filterByGenre = (e) => {
    e.preventDefault();
    if (movies.length === 0) {
      return;
    }

    const filteredByGenre = movies.filter((movie) => movie.genre_ids.includes(+e.target.id));
    setFilteredMovies(filteredByGenre);
  };

  return (
    <section className="search__section">
      <SearchForm value={query} onChange={onChange} onSubmit={onClick} />
      {isError && <p>Nothing is found...</p>}
      {movies.length > 0 && !isError && <GenresFilter onClick={filterByGenre} />}
      {isLoading && <MovieLoader />}
      {!(isLoading && isError) && <MoviesList movies={filteredMovies.length > 0 ? filteredMovies : movies} />}
    </section>
  );
};

export default SearchMovies;
