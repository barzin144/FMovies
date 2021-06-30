import React from "react";
import { Link } from "react-router-dom";
import { getPopularMovies } from "../helper";
import MovieCard from "./movieCard";

interface Movie {
    id: number,
    title: string,
    release_date: string,
    poster_path: string,
    vote_average: number
}

const PopularMovies = () => {
    const [popularMovies, setPopularMovies] = React.useState(null as Movie[]);

    React.useEffect(() => {
        getPopularMovies().then((respone) => {
            setPopularMovies(respone.data.results.slice(0, 15));
        });
    }, []);

    return (
        <section className="container container--pall">
            {!!popularMovies &&
                <div className="trending">
                    <Link className="trending__viewAll" to='/Movies/Filter/Pop'>View All <i className="fas fa-chevron-circle-right"></i></Link>
                    <h2 className="trending__title">Popular movies</h2>
                    <div className="trending__movies">
                        {popularMovies.map((movie) => {
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

export default PopularMovies;