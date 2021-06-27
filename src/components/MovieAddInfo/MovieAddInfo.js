import { NavLink, Switch, Route, withRouter } from "react-router-dom";
import CastView from '../../views/CastView';
import ReviewsView from '../../views/ReviewsView';

const MovieAddInfo = ({movieId, location}) => {
    return (
        <>
        <div>
        <h3 className="movie__card__title">Additional information</h3>
            <NavLink to={{
                          pathname: `/movies/${movieId}/cast`,
                          state: {
                              from:  location.state.from ,
                            }}} 
                     className="MovieLink additional__link" >Cast</NavLink>
            <NavLink to={{
                        pathname: `/movies/${movieId}/reviews`,
                        state: {
                            from:  location.state.from ,
                        }}} 
                     className="MovieLink additional__link" >Reviews</NavLink>
        </div>
        <div className="additional__movies__info">
        <Switch>
        <Route path="/movies/:movieId/cast" component={() => <CastView movieId={movieId} />} />
        <Route path="/movies/:movieId/reviews" component={() => <ReviewsView movieId={movieId} />} />
        </Switch>
        </div>
        </>
    )
}

export default withRouter(MovieAddInfo);

