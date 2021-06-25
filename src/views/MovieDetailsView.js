import { Component } from "react";
import axios from "axios";
import { NavLink, Switch, Route } from "react-router-dom";
import CastView from './CastView';
import ReviewsView from './ReviewsView';

const API_KEY = 'a9bb7243d3a710c2ab16652dca81dddb';
const BASE_URL = `https://api.themoviedb.org/3/`;

class MovieDetailsView extends Component {
    state = {
        movie: {},
        genres: []
    }

    async componentDidMount() {
        try {
            const {movieId} = this.props.match.params;
            const response = await axios.get(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}`);
            this.setState({movie: response.data, genres: response.data.genres});
        } catch(err) {
            console.log(err.message);
        }
    }

    handleGoBack = () => {        
        const { location, history} = this.props;
        history.push(location?.state?.from || '/');

    }

    render() {
        const { movie, genres } = this.state;
        const date = new Date(movie.release_date);
        const year = date.getFullYear();
        const score = movie.vote_average * 10;
        const p = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        return (
            <section className="movie__section">
            <button type="button" className="button--go-back" onClick={this.handleGoBack} > &#8592; Go back</button>
            <div className="movie__card">
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
            </div>
            <div>
            <h3 className="movie__card__title">Additional information</h3>
                <NavLink to={`/movies/${movie.id}/cast`} className="MovieLink additional__link" >Cast</NavLink>
                <NavLink to={`/movies/${movie.id}/reviews`} className="MovieLink additional__link" >Reviews</NavLink>
            </div>
            <div className="additional__movies__info">
            <Switch>
            <Route path="/movies/:movieId/cast" component={() => <CastView movieId={movie.id} />} />
            <Route path="/movies/:movieId/reviews" component={() => <ReviewsView movieId={movie.id} />} />
            </Switch>
            </div>

            </section>
        )
    }
}

export default MovieDetailsView;