import { Component } from 'react';
import { LoadMore } from '../components/LoadMore/LoadMore';
import MovieCard from '../components/MovieCard/MovieCard';
import { MovieLoader } from '../components/Loader';
import { getMovieTrends } from '../services/ApiServices';

class HomeView extends Component {
  state = {
    movies: [],
    loader: false,
    page: 1
  };

  async componentDidMount() {
    try {
      this.setState({ loader: true });
      const response = await getMovieTrends('day', this.state.page);
      this.setState({ movies: response.data.results });
    } catch (err) {
      console.log(err.messsage);
    } finally {
      this.setState({ loader: false });
    }
  }

  onLoadMore = () => {
    this.setState({ loader: true });
    getMovieTrends('day', this.state.page + 1)
      .then((response) => {
        this.setState((prevState) => ({
          movies: [...prevState.movies, ...response.data.results],
          page: prevState.page + 1
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({ loader: false });
        window.scrollTo({
          top: document.querySelector('.trend-list').scrollHeight,
          behavior: 'smooth'
        });
      });
  };

  render() {
    return (
      <section className="trend__section">
        <h1 className="trend__title">Trending today</h1>
        {/* { this.state.loader ? <MovieLoader /> 
                : <MoviesList movies={this.state.movies} /> } */}
        {this.state.loader ? <MovieLoader /> : <MovieCard movies={this.state.movies} />}
        {this.state.movies.length > 0 && <LoadMore onClick={this.onLoadMore} />}
      </section>
    );
  }
}

export default HomeView;
