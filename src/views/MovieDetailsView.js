import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MovieAddInfo from '../components/MovieAddInfo/MovieAddInfo';
import { MovieLoader } from '../components/Loader';
import { getMoviesById } from '../services/ApiServices';

const MovieDetailsView = ({ children }) => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { isLoading, isError, data: movie, error } = useQuery(['movie', movieId], getMoviesById);

  if (isLoading) {
    return <MovieLoader />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // const [movie, setMovie] = useState(results.data);
  // const [genres, setGenres] = useState(results.data.genres);
  // const [isLoading, setIsLoading] = useState(false);

  const date = new Date(movie.release_date);
  const year = date.getFullYear();
  const score = movie.vote_average * 10;

  // useEffect(async () => {
  //     try {
  //         setIsLoading(true);
  //         const response = await getMoviesById(movieId);
  //         setMovie(response.data);
  //         setGenres(response.data.genres);
  //     } catch(err) {
  //         console.log(err.message);
  //     } finally {
  //         setIsLoading(false);
  //     }
  // }, []);

  const handleGoBack = () => {
    // history.push(location?.state?.from || '/');
    navigate(-1);
  };

  return (
    <section className="movie__section">
      <button type="button" className="button--go-back" onClick={handleGoBack}>
        {' '}
        &#8592; Go back
      </button>
      <div className="movie__card">
        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="poster" alt={movie.tagline} />
        <div>
          <h2 className="movie__card__title">
            {movie.title} {`(${year})`}
          </h2>
          <p className="movie__card__desc">User score: {score}% </p>
          <h3 className="movie__card__title">Overview</h3>
          <p className="movie__card__desc">{movie?.overview}</p>
          <h3 className="movie__card__title">Genres</h3>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id} className="movie__card__desc">
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MovieAddInfo movieId={movieId}>{children}</MovieAddInfo>
    </section>
  );
};

export default MovieDetailsView;
