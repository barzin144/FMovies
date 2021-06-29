import React from "react";
import { backdropPath, getMovieDetail, posterPath } from "../helper";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";

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
        cast: [{
            id: number,
            name: string,
            known_for_department: string,
            order: number
        }],
        crew: [{
            id: number,
            name: string,
            job: string
        }]
    },
    overview: string,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    runtime: number,
    title: string,
    vote_average: number
}
const MovieDetail = () => {
    const { id } = useParams<{ id?: string }>();
    
    const [movieDetail, setMovieDetail] = React.useState(null as Movie);

    React.useEffect(() => {
        getMovieDetail(Number(id)).then((respone) => {
            setMovieDetail(respone.data);
        });
    }, [id]);

    return (
        <>
            {!!movieDetail && <section className="movieDetail" style={{ backgroundImage: `url(${backdropPath}/${movieDetail.backdrop_path})` }}>
                <div className="container container--pall">
                    <div className="movieDetail__info flex">
                        <div>
                            <img src={`${posterPath}/${movieDetail.poster_path}`} />
                        </div>
                        <div className="movieDetail__info__desc">
                            <a className="movieDetail__info__title">{movieDetail.title}</a>
                            <a className="movieDetail__info__meta"><i className="fas fa-star"></i> {movieDetail.vote_average}</a>
                            <a className="movieDetail__info__meta"><i className="far fa-clock"></i> {movieDetail.runtime} mins</a>
                            <a className="movieDetail__info__overview">{movieDetail.overview}</a>
                            <div className="movieDetail__info__details"><span>Country:</span><span>{movieDetail.production_countries.map((country) => country.name).join(', ')}</span></div>
                            <div className="movieDetail__info__details"><span>Genre:</span><span>{movieDetail.genres.map((genre) => genre.name).join(', ')}</span></div>
                            <div className="movieDetail__info__details"><span>Release:</span><span>{movieDetail.release_date}</span></div>
                            <div className="movieDetail__info__details"><span>Director:</span><span>{movieDetail.credits.crew.filter((person) => person.job === 'Director').map((person) => person.name).join(', ')}</span></div>
                            <div className="movieDetail__info__details"><span>Cast:</span><span>{movieDetail.credits.cast.filter((person) => person.known_for_department === 'Acting' && person.order < 10).map((person) => person.name).join(', ')}</span></div>
                        </div>
                    </div>
                </div>
            </section>}
        </>
    );
}

const Movies = () => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:id`}>
                <MovieDetail />
            </Route>
            <Route path={match.path}>
                <h3>Please select a movie.</h3>
            </Route>
        </Switch>
    );
}

export default Movies;