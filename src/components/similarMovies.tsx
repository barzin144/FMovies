import React from "react";
import { getSimilarMovies } from "../helper";
import MovieCard from "./movieCard";

interface Movie {
    id: number,
    title: string,
    release_date: string,
    poster_path: string,
    vote_average: number
}

const SimilarMovies = ({ id }: { id: number }) => {
    const [similarMovies, setSimilarMovies] = React.useState(null as Movie[]);

    React.useEffect(() => {
        getSimilarMovies(id).then((respone) => {
            const result: Movie[] = respone.data.results;
            setSimilarMovies(result.filter(x => x.poster_path !== null).slice(0, 12));
            window.scrollTo(0, 0);
        });
    }, [id]);

    return (
        <>
            {!!similarMovies && similarMovies.length > 0 && <section className="container container--pall">
                <div className="trending">
                    <h2 className="trending__title">Recommended</h2>
                    <div className="trending__movies">
                        {similarMovies.map((movie) => {
                            return (
                                <MovieCard key={movie.id}
                                    poster={movie.poster_path}
                                    releaseDate={movie.release_date}
                                    title={movie.title} id={movie.id}
                                    voteAverage={movie.vote_average} />)
                        })}
                    </div>
                </div>
            </section>}
        </>
    );
}

export default SimilarMovies;