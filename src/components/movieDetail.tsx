import React from "react";
import { backdropPath, getMovieDetail, posterPath } from "../helper";
import { Link, useHistory, useParams } from "react-router-dom";
import SimilarMovies from "./similarMovies";

interface Movie {
    genres: [{
        id: number,
        name: string
    }],
    production_countries: [{
        iso_3166_1: string,
        name: string
    }],
    credits: {
        cast: Cast[],
        crew: Crew[]
    },
    overview: string,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    runtime: number,
    title: string,
    vote_average: number
}
interface Cast {
    id: number,
    name: string,
    known_for_department: string,
    order: number
}
interface Crew {
    id: number,
    name: string,
    job: string
}
const MovieDetail = () => {
    const { id } = useParams<{ id?: string }>();
    const history = useHistory();
    const [movieDetail, setMovieDetail] = React.useState(null as Movie);
    let cast: Cast[] = null;
    let directors: Crew[] = null;

    React.useEffect(() => {
        getMovieDetail(Number(id)).then((respone) => {
            setMovieDetail(respone.data);
            document.title = `${respone.data.title} - FMovies`;
        }).catch(() => history.push('/404'));
    }, [id]);

    if (!!movieDetail) {
        directors = movieDetail.credits.crew.filter((person) => person.job === 'Director');
        cast = movieDetail.credits.cast.filter((person) => person.known_for_department === 'Acting' && person.order < 10);
    }

    return (
        <>
            {!!movieDetail && <section className="movieDetail" style={{ backgroundImage: `url(${backdropPath}/${movieDetail.backdrop_path})` }}>
                <div className="container container--pall">
                    <div className="movieDetail__info flex">
                        {!!movieDetail.poster_path && <div>
                            <img src={`${posterPath}/${movieDetail.poster_path}`} />
                        </div>}
                        <div className="movieDetail__info__desc">
                            <a className="movieDetail__info__title">{movieDetail.title}</a>
                            <a className="movieDetail__info__meta"><i className="fas fa-star"></i> {movieDetail.vote_average}</a>
                            <a className="movieDetail__info__meta"><i className="far fa-clock"></i> {movieDetail.runtime} mins</a>
                            <a className="movieDetail__info__overview">{movieDetail.overview}</a>
                            <div className="movieDetail__info__details"><span>Country:</span><span>{movieDetail.production_countries.map((country) => country.name).join(', ')}</span></div>
                            <div className="movieDetail__info__details"><span>Genre:</span>
                                <span>
                                    {movieDetail.genres.map((genre) => <Link to={`/genres/${genre.id}`} key={genre.id}>{genre.name}, </Link>)}
                                </span>
                            </div>
                            <div className="movieDetail__info__details"><span>Release:</span><span>{movieDetail.release_date}</span></div>
                            <div className="movieDetail__info__details"><span>Director:</span><span>{directors.map((person) => person.name).join(', ')}</span></div>
                            <div className="movieDetail__info__details">
                                <span>Cast:</span>
                                <span>
                                    {cast.map((person) => <Link to={`/casts/${person.id}`} key={person.id}>{person.name}, </Link>)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
            <SimilarMovies id={Number(id)} />
        </>
    );
}

export default MovieDetail;