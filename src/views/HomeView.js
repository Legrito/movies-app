import { useInfiniteQuery } from '@tanstack/react-query';
import { LoadMore } from '../components/LoadMore/LoadMore';
import MovieCard from '../components/MovieCard/MovieCard';
import Timer from '../components/Timer';
import { MovieLoader } from '../components/Loader';
import { getMovieTrends } from '../services/ApiServices';
import { useEffect } from 'react/cjs/react.development';

const HomeView = () => {
  const { data, isLoading, error, isError, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery(
    ['movies'],
    getMovieTrends,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage
    }
  );

  useEffect(() => {
    if (data?.pages && data?.pages?.length > 1) {
      window.scrollBy({ top: 550, behavior: 'smooth' });
    }
  }, [data]);

  if (isLoading) {
    return <MovieLoader />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <>
      <Timer />
      <section className="trend__section">
        <h1 className="trend__title">Trending today</h1>
        <ul className="trend-list">
          {data.pages.map((page) => (
            <MovieCard movies={page.results} key={page.nextPage} />
          ))}
        </ul>
        {isFetching && <span>Data is loading...</span>}
        <LoadMore onClick={handleLoadMore} isDisabled={!hasNextPage} />
      </section>
    </>
  );
};

export default HomeView;
