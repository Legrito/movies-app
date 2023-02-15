import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import GenresFilter from '../GenresFilter/GenresFilter';

const MoviesList = ({ moviesData, }) => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [activeGenre, setActiveGenre] = useState('');

  const moviesToRender = filteredMovies.length > 0 ? filteredMovies : movies;

  useEffect(() => {
    setFilteredMovies([]);
    setActiveGenre('');
    setMovies(moviesData);
  }, [moviesData]);

  const filterByGenre = (e) => {
    e.preventDefault();
    console.log('Filter');
    if (movies.length === 0) {
      return;
    }
    
    const filteredByGenre = movies.filter((movie) => movie.genre_ids.includes(+e.target.id));
    setActiveGenre(e.target.id);

    setFilteredMovies(filteredByGenre);
  };

  return (
    <>
      {movies?.length > 0 && <GenresFilter activeGenre={activeGenre} onClick={filterByGenre} />}
      <ul className="movies__list">
        {moviesToRender?.map((movie) => (
          <li key={movie.id}>
            <NavLink
              to={{
                pathname: `/movies/${movie.id}`,
                state: {
                  from: location
                }
              }}
              className="MovieLink"
            >
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviesList;
