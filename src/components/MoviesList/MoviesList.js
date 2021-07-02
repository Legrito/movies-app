import { NavLink, withRouter } from "react-router-dom";
//import { GenresFilter } from '../GenresFilter';

const MoviesList = ( { movies, location, genres}) => {
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

export default withRouter(MoviesList);