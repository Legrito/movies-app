import { useEffect, useState } from 'react';
import { MovieLoader } from '../components/Loader';
import { getMovieAdditionalInfo } from '../services/ApiServices';

const CastView = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getMovieAdditionalInfo(movieId, 'credits');
        const filteredImg = response.data.cast.filter((actor) => actor.profile_path);
        setCast(filteredImg);
        window.scrollBy({
          top: 400,
          behavior: 'smooth'
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <>
      <h2>Actors</h2>
      {isLoading && <MovieLoader />}
      <ul className="actors__list">
        {cast.length === 0 && "No actors found"}
        {cast.map((actor) => (
          <li key={actor.id} className="actor__card">
            <img
              src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
              className="actor__avatar"
              alt={actor.name}
            />
            <h3 className="actor__title">{actor.name}</h3>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CastView;
