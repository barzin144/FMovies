import axios, { AxiosResponse, CancelTokenSource } from "axios";

let cancelTokenSource: CancelTokenSource;

const config = {
    baseURL: 'https://api.themoviedb.org/3',
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmRjZGZlMjJiN2M5ODIwMmMwY2FiOGM0YWFhNGE0ZCIsInN1YiI6IjYwZDMwODJlMzVjMzBhMDA3M2Q5YjQ0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lXL2hpo8gSurs41a1xLIZGzcoCj9wanresHwGv_apPs` }
};

export const thumbnailPath = "https://image.tmdb.org/t/p/w342";
export const backdropPath = "https://image.tmdb.org/t/p/w1280";
export const posterPath = "https://image.tmdb.org/t/p/w342";
export const profilePath = "https://image.tmdb.org/t/p/w185";

export const getGenres = (): Promise<AxiosResponse<any>> => {
    return axios.get('/genre/movie/list', config);
}

export const getMoviesByKeyword = (keyword: string): Promise<AxiosResponse<any>> => {
    if (typeof cancelTokenSource != typeof undefined) {
        cancelTokenSource.cancel("Operation canceled due to new request.");
    }

    cancelTokenSource = axios.CancelToken.source();

    return axios.get(`/search/movie?query=${keyword}`, { ...config, cancelToken: cancelTokenSource.token });
}

export const cancelMovieSearchToken = () => {
    cancelTokenSource.cancel("Operation canceled due to new request.");
}

export const getPopularMovies = (page: number = 1):Promise<AxiosResponse<any>> => {
    return axios.get(`/discover/movie?sort_by=popularity.desc&vote_average.gte=1&include_adult=false&page=${page}`, config);
}

export const getTrendingMovies = ():Promise<AxiosResponse<any>> => {
    return axios.get('/trending/movie/week', config);
}

export const getMovieDetail = (id: number):Promise<AxiosResponse<any>> => {
    return axios.get(`/movie/${id}}?language=en-US&append_to_response=credits`, config);
}

export const getTopMovies = (page:number = 1):Promise<AxiosResponse<any>> => {
    return axios.get(`/discover/movie?language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${page}&vote_count.gte=10000`, config);
}

export const getSimilarMovies = (id: number):Promise<AxiosResponse<any>> => {
    return axios.get(`/movie/${id}/similar?language=en-US`, config);
}

export const getCastDetail = (id: number):Promise<AxiosResponse<any>> => {
    return axios.get(`/person/${id}}?language=en-US&append_to_response=movie_credits`, config);
}

export const getGenreMovies = (page: number, genre: number):Promise<AxiosResponse<any>> => {
    return axios.get(`/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&vote_average.gte=1&with_genres=${genre}`, config);
}