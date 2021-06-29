import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MovieDetail from "./movieDetail";


const Movies = () => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:id`}>
                <MovieDetail />
            </Route>
            <Route path={match.path}>
                <h3>Please select a movie.</h3>
            </Route>
        </Switch>
    );
}

export default Movies;