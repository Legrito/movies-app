import { Component } from "react";
import { withRouter } from "react-router-dom";
import MoviesList from '../components/MoviesList/MoviesList';
import { MovieLoader } from '../components/Loader';
import { getMoviesByQuery } from '../services/ApiServices';
import { GenresFilter } from '../components/GenresFilter';



const queryString = require('query-string');

class SearchMovies extends Component {
    state = {
        value: '',
        findedMovies: [],
        filteredMovies: [],
        showFilter: false,
        searchFailed: false,
        loader: false,
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        console.log(parsed.query);
    
        if (parsed.query) {
          this.setState({loader: true, });
          getMoviesByQuery(parsed.query)
          .then(resp => {
            if(resp.data.results.length === 0) {
                this.setState({searchFailed: true});
                return;
            }

            this.setState({searchFailed: false, findedMovies: resp.data.results, loader: false, showFilter: true})});
        }
      }

    onChange = (e) => {
        console.log(e.currentTarget.value);
        this.setState({value: e.currentTarget.value})
    }

    onClick = (e) => {
        e.preventDefault();
        this.setState({loader: true, filteredMovies: []});
        getMoviesByQuery(this.state.value)
        .then(resp => {
            this.props.history.push({
                pathname: this.props.location.pathname,
                search: `query=${this.state.value}`,
              });
            console.log(resp.data.results);
            if(resp.data.results.length === 0) {
                this.setState({searchFailed: true});
                return;
            }

            this.setState({searchFailed: false, findedMovies: resp.data.results, showFilter: true, loader: false})});
    }

    filterByGenre = (e) => {
        e.preventDefault();
        if(this.state.findedMovies.length === 0) {
            this.setState({showFilter: false});
            return;
        }
        
        let a = e.target.id;
        console.log(a);
        //console.log( this.state.findedMovies.filter(movie => movie.genre_ids.includes(e.target.id)));
        const filteredByGenre = this.state.findedMovies.filter(movie => movie.genre_ids.includes(+e.target.id));
        console.log(filteredByGenre);
        this.setState({filteredMovies: filteredByGenre, findedMovies: [], showFilter: false});
    }

    render() {
        const { value, findedMovies, filteredMovies, searchFailed, loader, showFilter} = this.state;
        return ( 
            <section className="search__section">
                <form onSubmit={this.onClick}>                    
                <input value={value} onChange={this.onChange} className="search__input" />
                <button type="submit" className="search__button" >Search</button>
                </form>                
                {searchFailed && <p>Nothing is found...</p> }
                { showFilter && < GenresFilter onClick={this.filterByGenre} />}
                {/* { !searchFailed && < GenresFilter onClick={this.filterByGenre} />} */}
                { loader ? <MovieLoader /> 
                : <MoviesList movies={findedMovies} />}
                { filteredMovies.length > 0 && <MoviesList movies={filteredMovies} />}
            </section>
        )
    }
} 

export default withRouter(SearchMovies);