import React from "react";
import Slider, { Settings } from "react-slick";
import { getPopularMovies, backdrop_path } from "../helper";

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

  React.useEffect(() => {
    getPopularMovies().then((respone) => {
      setPopularMovies(respone.data.results.slice(0, 5));
    });
  }, []);

  const settings: Settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    arrows:false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="slider">
      {!!popularMovies && <Slider {...settings}>
        {popularMovies.map((movie) => {
          return <div key={movie.id} className="slider__slide">
            <div className="slider__slide__image" style={{backgroundImage:`url(${backdrop_path}/${movie.backdrop_path})`}}>
            <div className="slider__info" >
              <h1>{movie.title}</h1>
              <small><i className="far fa-calendar-alt"></i> {movie.release_date}</small>
              <small><i className="fas fa-star"></i> {movie.vote_average}</small>
              <p className="hide-for-mobile">{movie.overview}</p>
            </div>
            </div> 
          </div>
        })}
      </Slider>}
    </div>
  );
}

export default PopularMovieSlider;