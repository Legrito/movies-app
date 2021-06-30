import { Component } from 'react';
import MoviesList from '../components/MoviesList/MoviesList';
import { MovieLoader } from '../components/Loader';
import { getMovieTrends } from '../services/ApiServices';

class HomeView extends Component {
    state = {
        movies: [],
        loader: false,
    }

    async componentDidMount() {
        try {
            this.setState({loader: true, });
            const response = await getMovieTrends('day');       
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