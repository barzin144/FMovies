import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getGenres } from "../helper";
import Casts from "./casts";
import Genres from "./genres";
import Header from "./header";
import Home from "./home";
import Movies from "./movies";
import NotFound from "./notFound";

interface Genre {
  id: number;
  name: string;
}

const App = () => {
  const [genres, setGenres] = React.useState([] as Genre[]);

  React.useEffect(() => {
    getGenres().then((respone) => {
      setGenres(respone.data.genres.map((genre: any) => ({ id: genre.id, name: genre.name })));
    });
  }, []);

  return (
    <Router>
      <Header genres={genres} />
      <Switch>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/genres">
          <Genres genres={genres} />
        </Route>
        <Route path="/casts">
          <Casts />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
