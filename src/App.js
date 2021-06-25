import './App.css';
// import { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import HomeView from './views/HomeView';
import SearchMovies from './views/SearchMovies';
import NotFoundView from './views/NotFoundView';
import MovieDetailsView from './views/MovieDetailsView';


export const App = () => (
  <>
    <Header />
    <Switch>
    <Route exact path="/" component={HomeView} />
    <Route path="/movies/:movieId" component={MovieDetailsView} />
    <Route path="/movies" component={SearchMovies} />
    <Route component={NotFoundView} />
    </Switch>
  </>
);

export default App;
