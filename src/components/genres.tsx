import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";

const Genre = ()=>{
    const param = useParams();
    return(
    <>

    </>);
}

const Genres = () => {
    const match = useRouteMatch();

    return (
        <>
         <Switch>
        <Route path={`${match.path}/:id`}>
          <Genre/>
        </Route>
        <Route path={match.path}>
          <h3>Please select a genre.</h3>
        </Route>
      </Switch>
        </>
    );
}

export default Genres;