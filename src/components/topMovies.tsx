import React from "react";
import { Link } from "react-router-dom";
import { getTopMovies } from "../helper";
import MovieCard from "./movieCard";

interface Movie {
    id: number,
    title: string,
    release_date: string,
    poster_path: string,
    vote_average: number
}

const TopMovies = () => {
    const [topMovies, setTopMovies] = React.useState(null as Movie[]);

    React.useEffect(() => {
        getTopMovies().then((respone) => {
            setTopMovies(respone.data.results.slice(0, 15));
        });
    }, []);

    return (
        <section className="container container--pall">
            {!!topMovies &&
                <div className="trending">
                    <Link className="trending__viewAll" to='/Movies/Filter/Top'>View All <i className="fas fa-chevron-circle-right"></i></Link>
                    <h2 className="trending__title">Top IMDb movies</h2>
                    <div className="trending__movies">
                        {topMovies.map((movie) => {
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

export default TopMovies;