import { NavLink, useLocation } from "react-router-dom";

export const MovieCard = ( { movies }) => {
    const location = useLocation();
    return (
        <>
        <ul className="trend-list">
                {movies.map(movie => {
                    const date = new Date(movie.release_date);
                    const year = date.getFullYear();
                    const score = movie.vote_average * 10;
                return (
                    <li key={movie.id}>
                    <NavLink to={{
                    pathname: `/movies/${movie.id}`,
                    state: {
                         from: location,
                         },
                    }} 
                    className="MovieCardLink">
                    <div className="movie-card-preview">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-card-preview-descr">
                    <h2>Detailes</h2>
                    <p>Title: </p>
                    <p className="movie-title">{movie.title}</p>
                    <p>Year: {year}</p>
                    <p>Rating: {score}%</p>
                    </div>
                    </div>
                    </NavLink>
                    </li>
                )})}
        </ul>
        </>
    )
}

export default MovieCard;