import { useEffect, useState } from 'react';
import { LoadMore } from '../components/LoadMore/LoadMore';
import MovieCard from '../components/MovieCard/MovieCard';
import { MovieLoader } from '../components/Loader';
import { getMovieTrends } from '../services/ApiServices';

const HomeView = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getMovieTrends('day', page);
        setMovies(response.data.results);
      } catch (err) {
        console.log(err.messsage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onLoadMore = () => {
    setIsLoading(true);
    getMovieTrends('day', page + 1)
      .then((response) => {
        setMovies(prevState => [...prevState, ...response.data.results]);
        setPage(prevState => prevState + 1);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        window.scrollTo({
          top: document.querySelector('.trend-list').scrollHeight,
          behavior: 'smooth'
        });
      });
  };

  return (
    <section className="trend__section">
      <h1 className="trend__title">Trending today</h1>
      {/* { this.state.loader ? <MovieLoader />
                : <MoviesList movies={this.state.movies} /> } */}
      {isLoading ? <MovieLoader /> : <MovieCard movies={movies} />}
      {movies.length > 0 && <LoadMore onClick={onLoadMore} />}
    </section>
  );
};

export default HomeView;
