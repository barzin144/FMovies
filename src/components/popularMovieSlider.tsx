import React from "react";
import { Link, useHistory } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { getPopularMovies, backdropPath } from "../helper";

interface Movie {
  id: number,
  backdrop_path: string,
  title: string,
  vote_average: number,
  release_date: string,
  overview: string
}

const PopularMovieSlider = () => {
  const [popularMovies, setPopularMovies] = React.useState(null as Movie[]);
  const history = useHistory();

  React.useEffect(() => {
    getPopularMovies().then((respone) => {
      setPopularMovies(respone.data.results.slice(0, 5));
    });
  }, []);

  const settings: Settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="slider">
      {!!popularMovies && <Slider {...settings}>
        {popularMovies.map((movie) => {
          return <div key={movie.id} className="slider__slide">
            <div className="slider__slide__image" style={{ backgroundImage: `url(${backdropPath}/${movie.backdrop_path})` }}>
              <div className="container">
                <div className="slider__info" >
                  <Link to={`/movies/${movie.id}`} className="slider__info__link">
                    <h1>{movie.title}</h1>
                  </Link>
                  <div className="slider__info__meta">
                    <a><i className="far fa-calendar-alt"></i> {movie.release_date}</a>
                    <a><i className="fas fa-star"></i> {movie.vote_average}</a>
                  </div>
                  <div className="slider__info__desc">{movie.overview}</div>
                </div>
              </div>
            </div>
          </div>
        })}
      </Slider>}
    </div>
  );
}

export default PopularMovieSlider;