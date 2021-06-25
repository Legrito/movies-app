import { Component } from "react";
import axios from "axios";

const API_KEY = 'a9bb7243d3a710c2ab16652dca81dddb';
const BASE_URL = `https://api.themoviedb.org/3/`;
class ReviewsView extends Component {
    
    state = {
        reviews: [],
    }

    async componentDidMount() {
        try{
            const response = await axios.get(`${BASE_URL}movie/${this.props.movieId}/reviews?api_key=${API_KEY}`);
            this.setState({reviews: response.data.results});
            window.scrollBy({
                top: 400,
                behavior: 'smooth'
              });
        } catch(err) {
            console.log(err.message);
        }
        
    }

    render() {
        const { reviews } = this.state;
        return (
            <>
            <h2>Reviews</h2>
            {reviews.length !== 0 ? 
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <h3>{review.author}</h3>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul> : 'No reviews'}
            </>
            // <ul className="actors__list">
            //         {cast.map(actor => (
            //             <li key={actor.id} className="actor__card">                            
            //             <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} className="actor__avatar" alt={actor.name} />
            //             <h3 className="actor__title">{actor.name}</h3>
            //             </li>
            //         ))}
            //     </ul>
        )
    }
}

export default ReviewsView;