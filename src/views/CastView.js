import { Component } from "react";
import axios from "axios";

const API_KEY = 'a9bb7243d3a710c2ab16652dca81dddb';
const BASE_URL = `https://api.themoviedb.org/3/`;
class CastView extends Component {
    
    state = {
        cast: [],
    }

    async componentDidMount() {
        try{
            const response = await axios.get(`${BASE_URL}movie/${this.props.movieId}/credits?api_key=${API_KEY}`);
            const filteredImg = response.data.cast.filter(actor => actor.profile_path);
            this.setState({cast: filteredImg});
            window.scrollBy({
                top: 400,
                behavior: 'smooth'
              });
        } catch(err) {
            console.log(err.message);
        }
        
    }

    render() {
        const { cast } = this.state;
        return (
            <>
            <h2>Actors</h2>
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