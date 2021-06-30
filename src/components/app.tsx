import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Casts from "./Casts";
import Genres from "./genres";
import Header from "./header";
import Home from "./home";
import Movies from "./movies";
import NotFound from "./notFound";

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/movies">
                    <Movies />
                </Route>
                <Route path="/genres">
                    <Genres />
                </Route>
                <Route path="/casts">
                    <Casts />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="*">
                   <NotFound/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;