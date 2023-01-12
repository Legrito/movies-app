import { NavLink, useLocation } from "react-router-dom";
//import { GenresFilter } from '../GenresFilter';

const MoviesList = ( { movies, genres }) => {
    const location = useLocation();
    return (
        <>
        {/* <GenresFilter /> */}
        {/* { genres && < GenresFilter /> } */}
        <ul className="movies__list">
                {movies.map(movie => (
                    <li key={movie.id}>
                        <NavLink to={{
                        pathname: `/movies/${movie.id}`,
                        state: {
                             from: location,
                             },
                        }} 
                        className="MovieLink">{movie.title}</NavLink>
                    </li>
                    ))}
        </ul>
        </>
    )
}

export default MoviesList;