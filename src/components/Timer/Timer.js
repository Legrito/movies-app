import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUpcoming } from '../../services/ApiServices';
import { timeCounter } from './helpers';

import '../../styles/timer.css';

const Timer = () => {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [mins, setMins] = useState('00');
  const [secs, setSecs] = useState('00');
  const [popularMovie, setPopularMovie] = useState({});
  const { isLoading, isError, data, error } = useQuery(['upcoming'], getUpcoming);

  useEffect(() => {
    if (data?.results) {
      const maxRate = data.results.reduce((acc, movie) => {
        if (acc < movie.popularity) {
          acc = movie.popularity;
        }
        return acc;
      }, 0);

      setPopularMovie(data?.results.find((el) => el.popularity === maxRate));
    }

    const setTime = () => {
      const time = timeCounter(popularMovie);
      setDays(() => time.days);
      setHours(() => time.hours);
      setMins(() => time.mins);
      setSecs(() => time.secs);
    };
    setTime();
    const intervalId = setInterval(setTime, 1000);

    return () => clearInterval(intervalId);
  }, [data, popularMovie]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="timer">
      <h2>{popularMovie.title}</h2>
      <h3>Premiere in...</h3>
      {days !== '00' && <span>{days} days </span>}
      <span>{hours} : </span>
      <span>{mins} : </span>
      <span>{secs}</span>
      <div className='poster'>
        <img src={`https://image.tmdb.org/t/p/original${popularMovie.poster_path}`} alt={popularMovie.title}/>
      </div>
    </div>
  );
};

export default Timer;
