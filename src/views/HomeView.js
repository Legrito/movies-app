import { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import MoviesList from '../components/MoviesList/MoviesList';

const API_KEY = 'a9bb7243d3a710c2ab16652dca81dddb';
const BASE_URL = `https://api.themoviedb.org/3/trending/`;
class HomeView extends Component {
    state = {
        movies: []
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${BASE_URL}movie/day?api_key=${API_KEY}`);        
            this.setState({movies: response.data.results} );
        } catch(err) {
            console.log(err.messsage);
        }
        
    }

    render() {
        return (
            <section className="trend__section">
                <h1 className="trend__title">Trending today</h1>
                <MoviesList movies={this.state.movies} />
            </section>
            
         )
    }
};

export default HomeView;