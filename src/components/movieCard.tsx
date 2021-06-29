import React from "react";
import { Link } from "react-router-dom";
import { thumbnailPath } from "../helper";

interface Props {
    id: number,
    title: string,
    releaseDate: string,
    poster: string,
    voteAverage: number
}

const MovieCard = ({ poster, title, releaseDate, voteAverage, id }: Props) => {
    return (
        <div className="movieCard">
            <div>
                <Link to={`/movies/${id}`}>
                    <img src={`${thumbnailPath}/${poster}`} />
                </Link>
            </div>
            <div>
                <Link to={`/movies/${id}`} className="movieCard__title">{title}</Link>
                <a className="movieCard__releaseDate"><i className="far fa-calendar-alt"></i> {releaseDate}</a>
                <a><i className="fas fa-star"></i> {voteAverage}</a>
            </div>
        </div>
    );
}

export default MovieCard;