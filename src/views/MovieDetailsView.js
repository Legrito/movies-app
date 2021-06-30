import { Component } from "react";
import axios from "axios";
import MovieAddInfo from '../components/MovieAddInfo/MovieAddInfo';
import { MovieLoader } from '../components/Loader';
import { getMoviesById } from "../services/ApiServices";

class MovieDetailsView extends Component {
    state = {
        movie: {},
        genres: [],
        loader: false,
    }

    async componentDidMount() {
        try {
            const {movieId} = this.props.match.params;
            this.setState({loader: true, });
            const response = await getMoviesById(movieId);
            this.setState({movie: response.data, genres: response.data.genres});
        } catch(err) {
            console.log(err.message);
        } finally {
            this.setState({loader: false, });
        }
    }

    handleGoBack = () => {        
        const { location, history} = this.props;
        history.push(location?.state?.from || '/');

    }

    render() {
        const { movie, genres, loader } = this.state;
        const date = new Date(movie.release_date);
        const year = date.getFullYear();
        const score = movie.vote_average * 10;
        return (
            <section className="movie__section">
            <button type="button" className="button--go-back" onClick={this.handleGoBack} > &#8592; Go back</button>
            {loader ? <MovieLoader /> 
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
            
            <MovieAddInfo movieId={movie.id} />
            </section>
        )
    }
}

export default MovieDetailsView;