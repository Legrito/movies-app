import { Component } from "react";
import { MovieLoader } from '../components/Loader';
import { getMovieAdditionalInfo } from "../services/ApiServices";

class ReviewsView extends Component {
    
    state = {
        reviews: [],
        loader: false,
    }

    async componentDidMount() {
        try{
            this.setState({loader: true, });
            const response = await getMovieAdditionalInfo(this.props.movieId, 'reviews');
            this.setState({reviews: response.data.results});
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
        const { reviews, loader } = this.state;
        return (
            <>
            <h2>Reviews</h2>
            { loader && <MovieLoader /> }
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
        )
    }
}

export default ReviewsView;