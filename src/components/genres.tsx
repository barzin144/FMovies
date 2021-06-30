import React from "react";
import { Route, Switch, useHistory, useParams, useRouteMatch, useLocation } from "react-router-dom";
import { getGenreMovies } from "../helper";
import MovieCard from "./movieCard";
import NotFound from "./notFound";
import Pagination from "./pagination";

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
  const { id, page } = useParams<{ id?: string, page?: string }>();

  const [genreMovies, setGenreMovies] = React.useState(null as Movie[]);
  const [totalPages, setTotalPages] = React.useState(0);
  const currentPage: number = !!page ? Number(page) : 1;

  const history = useHistory();

  React.useEffect(() => {
    getGenreMovies(currentPage, Number(id)).then((respone) => {
      setGenreMovies(respone.data.results.slice(0, 15));
      setTotalPages(respone.data.total_pages);
      document.title = `${genreTitle} movies - FMovies`;
    }).catch(() => history.push('/404'));
  }, [id, page]);

  const genreTitle = props.genres.length > 0 ? props.genres.filter(x => x.id === Number(id))[0]?.name : '';

  return (
    <>
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
      <Pagination page={currentPage} totalPages={totalPages} url={`/Genres/${id}`} />
    </>
  );
}

const Genres = (props: Props) => {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:id/page/:page`}>
          <Genre {...props} />
        </Route>
        <Route path={`${match.path}/:id`}>
          <Genre {...props} />
        </Route>
        <Route path={match.path}>
         <NotFound/>
        </Route>
      </Switch>
    </>
  );
}

export default Genres;