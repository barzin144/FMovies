import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import CastDetail from "./castDetail";


const Casts = () => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:id`}>
                <CastDetail />
            </Route>
            <Route path={match.path}>
                <h3>Please select a cast.</h3>
            </Route>
        </Switch>
    );
}

export default Casts;