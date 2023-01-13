import './App.css';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { MovieLoader } from './components/Loader';
import { routes } from './services/routes';

const HomeView = lazy(() => import('./views/HomeView') /* webpackChunkName: "home-view" */);
// const SearchMovies = lazy(() => import('./views/SearchMovies') /* webpackChunkName: "search-movies" */);
const SearchMovies = lazy(() => import('./views/SearchMovies') /* webpackChunkName: "search-movies" */);
const MovieDetailsView = lazy(() => import('./views/MovieDetailsView') /* webpackChunkName: "movie-details-view" */);
const NotFoundView = lazy(() => import('./views/NotFoundView') /* webpackChunkName: "not-found-view" */);


export const App = () => (
  <>
    <Header />
    <Suspense fallback={<MovieLoader />}>
    <Routes>
    <Route path={routes.home} element={<HomeView />}/>
    <Route path={routes.movie} element={<MovieDetailsView />} />
    {/* <Route path={routes.search} component={SearchMovies} /> */}
    <Route path={routes.search} element={<SearchMovies />} />
    <Route element={<NotFoundView />} />
    </Routes>
    </Suspense>
  </>
);

export default App;
