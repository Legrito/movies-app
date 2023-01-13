
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MoviesList from '../components/MoviesList/MoviesList';
import { MovieLoader } from '../components/Loader';
import { getMoviesByQuery } from '../services/ApiServices';
import { GenresFilter } from '../components/GenresFilter';
import SearchForm from './SearchForm';

const queryString = require('query-string');

const SeachMoviesFunc = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isShowFilters, setIsShowFilters] = useState(false);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [query, setQuery] = useState('');

    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const parsed = queryString.parse(location.search);
    
        if (parsed.query) {
          setIsLoading(true);

          getMoviesByQuery(parsed.query)
          .then(resp => {
            if(resp.data.results.length === 0) {
                setIsError(true);
                return;
            }
            setIsShowFilters(true);
            setIsLoading(false);
            setMovies(resp.data.results);
            });   
        }
    }, []);

    const onChange = (e) => {
        setQuery(e.currentTarget.value);
    };

    const onClick = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFilteredMovies([]);
        getMoviesByQuery(query)
        .then(resp => {
            navigate({
                pathname: location.pathname,
                search: `query=${query}`,
              });
            if(resp.data.results.length === 0) {
                setIsError(true);
                return;
            }

            setMovies(resp.data.results);
            setIsLoading(false);
        });
    };

    const filterByGenre = (e) => {
        e.preventDefault();
        if(movies.length === 0) {
            setIsShowFilters(false);
            return;
        }

        const filteredByGenre = movies.filter(movie => movie.genre_ids.includes(+e.target.id));
        setFilteredMovies(filteredByGenre);
    };

    return (
    <>
        <div>New search</div>
        <section className="search__section">
            <SearchForm value={query} onChange={onChange} onSubmit={onClick}/>
            {isError && <p>Nothing is found...</p>}
            {isShowFilters && <GenresFilter onClick={filterByGenre} />}
            {/* { !searchFailed && < GenresFilter onClick={this.filterByGenre} />} */}
            {isLoading ? <MovieLoader />
                : <MoviesList movies={filteredMovies.length > 0 ? filteredMovies : movies} />}
        </section></>
    );
};

export default SeachMoviesFunc;
