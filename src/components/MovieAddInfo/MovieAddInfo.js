import { Link, Routes, Route, useLocation } from 'react-router-dom';
import CastView from '../../views/CastView';
import ReviewsView from '../../views/ReviewsView';
import { routes } from '../../services/routes';

const MovieAddInfo = ({ movieId, children }) => {
  const location = useLocation();

  return (
    <>
      <div>
        <h3 className="movie__card__title">Additional information</h3>
        <Link
          to={{
            pathname: `/movies/${movieId}/cast`,
            state: {
              from: location?.state?.from
            }
          }}
          className="MovieLink additional__link"
        >
          Cast
        </Link>
        <Link
          to={{
            pathname: `/movies/${movieId}/reviews`,
            state: {
              from: location?.state?.from
            }
          }}
          className="MovieLink additional__link"
        >
          Reviews
        </Link>
      </div>
      <div className="additional__movies__info">
        {children}
        <Routes>
          <Route path={routes.cast} element={<CastView movieId={movieId} />} />
          <Route path={routes.rewiews} element={<ReviewsView movieId={movieId} />} />
        </Routes>
      </div>
    </>
  );
};

export default MovieAddInfo;
