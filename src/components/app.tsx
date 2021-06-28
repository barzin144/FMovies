import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Genres from "./genres";
import Header from "./header";
import Home from "./home";
import Movies from "./movies";

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
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;