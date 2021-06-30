import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { getPopularMovies, getTopMovies } from "../helper";
import MovieCard from "./movieCard";
import MovieDetail from "./movieDetail";
import Pagination from "./pagination";

interface Movie {
    id: number,
    title: string,
    release_date: string,
    poster_path: string,
    vote_average: number
}

const Movies = () => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/filter/:filter/Page/:page`}>
                <FilterdMovies />
            </Route>
            <Route path={`${match.path}/filter/:filter`}>
                <FilterdMovies />
            </Route>
            <Route path={`${match.path}/:id`}>
                <MovieDetail />
            </Route>
        </Switch>
    );
}

const FilterdMovies = () => {
    const { filter, page } = useParams<{ filter?: string, page?: string }>();

    const [movies, setmovies] = React.useState(null as Movie[]);
    const [totalPages, setTotalPages] = React.useState(0);
    const currentPage: number = !!page ? Number(page) : 1;
    const title = filter.toLowerCase() === 'top' ? 'Top IMDb movies' : 'Popular movies';

    React.useEffect(() => {
        if (filter.toLowerCase() === 'top') {
            getTopMovies(currentPage).then((respone) => {
                setmovies(respone.data.results);
                setTotalPages(respone.data.total_pages);
            });
        }
        else {
            getPopularMovies(currentPage).then((respone) => {
                setmovies(respone.data.results);
                setTotalPages(respone.data.total_pages);
            });
        }
        document.title = `${title} - FMovies`;
    }, [page, filter]);

    return (
        <>
            <section className="container container--pall">
                {!!movies &&
                    <div className="filteredMovies">
                        <h2 className="filteredMovies__title">{title}</h2>
                        <div className="filteredMovies__movies">
                            {movies.map((movie) => {
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
            <Pagination page={currentPage} totalPages={totalPages} url={`/Movies/Filter/${filter}`} />
        </>
    );
}

export default Movies;