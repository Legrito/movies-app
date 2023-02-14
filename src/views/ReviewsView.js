import { Component, useEffect } from 'react';
import { useState } from 'react';
import { MovieLoader } from '../components/Loader';
import { getMovieAdditionalInfo } from '../services/ApiServices';

const ReviewsView = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getMovieAdditionalInfo(movieId, 'reviews');
        setReviews(response.data.results);
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
  }, []);

  return (
    <>
      <h2>Reviews</h2>
      {isLoading && <MovieLoader />}
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        'No reviews'
      )}
    </>
  );
};

export default ReviewsView;
