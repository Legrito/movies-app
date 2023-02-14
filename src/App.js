import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import { MovieLoader } from './components/Loader';
import { routes } from './services/routes';

import './App.css';

const HomeView = lazy(() => import('./views/HomeView') /* webpackChunkName: "home-view" */);
const SearchMovies = lazy(() => import('./views/SearchMovies') /* webpackChunkName: "search-movies" */);
const MovieDetailsView = lazy(() => import('./views/MovieDetailsView') /* webpackChunkName: "movie-details-view" */);
const NotFoundView = lazy(() => import('./views/NotFoundView') /* webpackChunkName: "not-found-view" */);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
});


const App = () => (
  <QueryClientProvider client={queryClient}>
    <Header />
    <Suspense fallback={<MovieLoader />}>
    <Routes>
    <Route path={routes.home} element={<HomeView />}/>
    <Route path={routes.movie} element={<MovieDetailsView />} />
    <Route path={routes.search} element={<SearchMovies />} />
    <Route element={<NotFoundView />} />
    </Routes>
    </Suspense>
  </QueryClientProvider>
);

export default App;
