import { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import MoviesList from '../components/MoviesList/MoviesList';

const API_KEY = 'a9bb7243d3a710c2ab16652dca81dddb';
const BASE_URL = `https://api.themoviedb.org/3/`;

class SearchMovies extends Component {
    state = {
        value: '',
        findedMovies: [],
        searchFailed: false,
    }

    onChange = (e) => {
        console.log(e.currentTarget.value);
        this.setState({value: e.currentTarget.value })
    }

    onClick = (e) => {
        e.preventDefault();
        axios.get(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${this.state.value}`)
        .then(resp => {
            console.log(resp.data.results);
            if(resp.data.results.length === 0) {
                this.setState({searchFailed: true, findedMovies: []});
                return;
            }

            this.setState({searchFailed: false, findedMovies: resp.data.results})});
    }

    render() {
        const { value, findedMovies, searchFailed} = this.state;
        return ( 
            <section className="search__section">
                <form onSubmit={this.onClick}>                    
                <input value={value} onChange={this.onChange} className="search__input" />
                <button type="submit" className="search__button" >Search</button>
                </form>                
                {searchFailed && <p>Nothing is found...</p>}
                {findedMovies.length > 0 && <MoviesList movies={findedMovies} />}
            </section>
        )
    }
} 

export default withRouter(SearchMovies);