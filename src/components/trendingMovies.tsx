import React from "react";
import { getTrendingMovies } from "../helper";
import MovieCard from "./movieCard";

interface Movie {
    id: number,
    title: string,
    release_date: string,
    poster_path: string,
    vote_average: number
}

const TrendingMovies = () => {
    const [trendingMovies, setTrendingMovies] = React.useState(null as Movie[]);

    React.useEffect(() => {
        getTrendingMovies().then((respone) => {
            setTrendingMovies(respone.data.results.slice(0, 15));
        });
    }, []);

    return (
        <section className="container container--pall">
            {!!trendingMovies &&
                <div className="trending">
                    <h2 className="trending__title">Trending movies</h2>
                    <div className="trending__movies">
                        {trendingMovies.map((movie) => {
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

export default TrendingMovies;