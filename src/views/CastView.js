import { Component } from "react";
import { MovieLoader } from '../components/Loader';
import { getMovieAdditionalInfo } from "../services/ApiServices";


class CastView extends Component {
    
    state = {
        cast: [],
        loader: false,
    }

    async componentDidMount() {
        try{
            this.setState({loader: true, });
            const response = await getMovieAdditionalInfo(this.props.movieId, 'credits');
            const filteredImg = response.data.cast.filter(actor => actor.profile_path);
            this.setState({cast: filteredImg});
            window.scrollBy({
                top: 400,
                behavior: 'smooth'
              });
        } catch(err) {
            console.log(err.message);
        } finally {
            this.setState({loader: false, });
        }
        
    }

    render() {
        const { cast, loader } = this.state;
        return (
            <>
            <h2>Actors</h2>
            { loader && <MovieLoader /> }
            <ul className="actors__list">
                    {cast.map(actor => (
                        <li key={actor.id} className="actor__card">                            
                        <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} className="actor__avatar" alt={actor.name} />
                        <h3 className="actor__title">{actor.name}</h3>
                        </li>
                    ))}
                </ul>
            </>
        )
    }
}

export default CastView;