import React from "react";
import PopularMovies from "./popularMovies";
import PopularMovieSlider from "./popularMovieSlider";
import TopMovies from "./topMovies";
import TrendingMovies from "./trendingMovies";

const Home = () => {
    return (
        <>
        <PopularMovieSlider/>
        <TrendingMovies/>
        <TopMovies/>
        <PopularMovies/>
        </>
    );
}

export default Home;