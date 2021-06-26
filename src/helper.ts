import axios, { AxiosResponse, CancelTokenSource } from "axios";

let cancelTokenSource: CancelTokenSource;

const config = {
    baseURL: 'https://api.themoviedb.org/3',
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmRjZGZlMjJiN2M5ODIwMmMwY2FiOGM0YWFhNGE0ZCIsInN1YiI6IjYwZDMwODJlMzVjMzBhMDA3M2Q5YjQ0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lXL2hpo8gSurs41a1xLIZGzcoCj9wanresHwGv_apPs` }
};

export const thumbnailPath = "https://image.tmdb.org/t/p/w154";
export const backdrop_path = "https://image.tmdb.org/t/p/w1280";

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

export const getPopularMovies = ():Promise<AxiosResponse<any>> => {
    return axios.get('/discover/movie?sort_by=popularity.desc&include_adult=false&page=1', config);
}