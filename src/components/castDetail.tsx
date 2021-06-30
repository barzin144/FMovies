import React from "react";
import { getCastDetail, profilePath } from "../helper";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./movieCard";

interface Movie {
    id: number,
    title: string,
    vote_average: number,
    release_date: string,
    poster_path: string
}
interface Cast {
    id: number,
    name: string,
    biography: string,
    birthday: string,
    profile_path: string,
    movie_credits: { cast: Movie[] }
}

const CastDetail = () => {
    const { id } = useParams<{ id?: string }>();
    const history = useHistory();
    
    const [castDetail, setCastDetail] = React.useState(null as Cast);
    let movies: Movie[] = null;

    React.useEffect(() => {
        getCastDetail(Number(id)).then((respone) => {
            setCastDetail(respone.data);
            document.title = `${respone.data.name} - FMovies`;
        }).catch(()=> history.push('/404'));
    }, [id]);

    if (!!castDetail) {
        movies = castDetail.movie_credits.cast
            .filter((movie) => movie.vote_average > 0 && movie.poster_path !== null);
    }

    return (
        <>
            {!!castDetail && <section className="castDetail">
                <div className="container container--pall">
                    <div className="castDetail__info flex">
                        {!!castDetail.profile_path && <div>
                            <img src={`${profilePath}/${castDetail.profile_path}`} />
                        </div>}
                        <div className="castDetail__info__desc">
                            <a className="castDetail__info__name">{castDetail.name}</a>
                            <div ><span>Birthday:</span><span>{castDetail.birthday}</span></div>
                            <div className="castDetail__info__bio"><span>{castDetail.biography}</span></div>
                        </div>
                    </div>
                    <div className="castDetail__movies">
                        <a className="castDetail__info__name">{castDetail.name}'s movies</a>
                        <div className="trending__movies">
                            {movies.map((movie) => {
                                return (
                                    <MovieCard key={movie.id}
                                        poster={movie.poster_path}
                                        releaseDate={movie.release_date}
                                        title={movie.title} id={movie.id}
                                        voteAverage={movie.vote_average} />)
                            })}
                        </div>
                    </div>
                </div>
            </section>}
        </>
    );
}

export default CastDetail;