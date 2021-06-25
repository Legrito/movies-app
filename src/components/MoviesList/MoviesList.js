import { NavLink, withRouter } from "react-router-dom";

const MoviesList = ( { movies, location}) => {
    return (
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
    )
}

export default withRouter(MoviesList);