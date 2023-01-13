import { Component, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MovieAddInfo from '../components/MovieAddInfo/MovieAddInfo';
import { MovieLoader } from '../components/Loader';
import { getMoviesById } from "../services/ApiServices";
import { useState } from "react/cjs/react.development";

const MovieDetailsView = ({ children }) => {
    const [movie, setMovie] = useState('');
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const date = new Date(movie.release_date);
    const year = date.getFullYear();
    const score = movie.vote_average * 10;

    const location = useLocation();
    const navigate = useNavigate();
    const { movieId } = useParams();

    useEffect(async () => {
        try {
            setIsLoading(true);
            const response = await getMoviesById(movieId);
            setMovie(response.data);
            setGenres(response.data.genres);
        } catch(err) {
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleGoBack = () => {
        // history.push(location?.state?.from || '/');
        navigate(-1);
        
    };

    console.log(children);

    return (
        <section className="movie__section">
            <button type="button" className="button--go-back" onClick={handleGoBack} > &#8592; Go back</button>
            {isLoading ? <MovieLoader /> 
            : <div className="movie__card">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="poster" alt={movie.tagline} />
                <div>
                <h2 className="movie__card__title">{movie.title} {`(${year})`}</h2>
                <p className="movie__card__desc">User score: {score}% </p>
                <h3 className="movie__card__title">Overview</h3>
                <p className="movie__card__desc">{movie.overview}</p>
                <h3 className="movie__card__title">Genres</h3>
                <ul>
                    {genres.map(genre => (
                        <li key={genre.id} className="movie__card__desc">{genre.name}</li>
                    ))}
                </ul>
                </div>
            </div>}
            
            <MovieAddInfo movieId={movieId}>
                {children}
            </MovieAddInfo>
        </section>
    )
};

export default MovieDetailsView;