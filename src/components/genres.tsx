import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { getGenreMovies } from "../helper";
import MovieCard from "./movieCard";

interface Movie {
  id: number,
  title: string,
  release_date: string,
  poster_path: string,
  vote_average: number
}

interface Props {
  genres: { id: number, name: string }[]
}

const Genre = (props: Props) => {
  const { id } = useParams<{ id?: string }>();
  const [genreMovies, setGenreMovies] = React.useState(null as Movie[]);

  React.useEffect(() => {
    getGenreMovies(1, Number(id)).then((respone) => {
      setGenreMovies(respone.data.results.slice(0, 15));
    });
  }, [id]);

  const genreTitle = props.genres.length > 0 ? props.genres.filter(x => x.id === Number(id))[0].name : '';

  return (
    <section className="container container--pall">
      {!!genreMovies &&
        <div className="genreMovies">
          <h2 className="genreMovies__title">{genreTitle} movies</h2>
          <div className="genreMovies__movies">
            {genreMovies.map((movie) => {
              return (
                <MovieCard key={movie.id}
                  poster={movie.poster_path}
                  releaseDate={movie.release_date}
                  title={movie.title} id={movie.id}
                  voteAverage={movie.vote_average} />)
            })}
          </div>
        </div>}
    </section>
  );
}

const Genres = (props: Props) => {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:id`}>
          <Genre {...props} />
        </Route>
        <Route path={match.path}>
          <h3>Please select a genre.</h3>
        </Route>
      </Switch>
    </>
  );
}

export default Genres;