import { Component } from 'react';
import axios from 'axios';
import MoviesList from '../components/MoviesList/MoviesList';
import { MovieLoader } from '../components/Loader';

const API_KEY = 'a9bb7243d3a710c2ab16652dca81dddb';
const BASE_URL = `https://api.themoviedb.org/3/trending/`;
class HomeView extends Component {
    state = {
        movies: [],
        loader: false,
    }

    async componentDidMount() {
        try {
            this.setState({loader: true, });
            const response = await axios.get(`${BASE_URL}movie/day?api_key=${API_KEY}`);        
            this.setState({movies: response.data.results} );
        } catch(err) {
            console.log(err.messsage);
        } finally {
            this.setState({loader: false, });
        }
        
    }

    render() {
        return (
            <section className="trend__section">
                <h1 className="trend__title">Trending today</h1>
                { this.state.loader ? <MovieLoader /> 
                : <MoviesList movies={this.state.movies} /> }
            </section>
            
         )
    }
};

export default HomeView;