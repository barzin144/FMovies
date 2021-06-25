import axios, { AxiosResponse } from "axios";

const config = {
    baseURL: 'https://api.themoviedb.org/3',
    headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmRjZGZlMjJiN2M5ODIwMmMwY2FiOGM0YWFhNGE0ZCIsInN1YiI6IjYwZDMwODJlMzVjMzBhMDA3M2Q5YjQ0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lXL2hpo8gSurs41a1xLIZGzcoCj9wanresHwGv_apPs` }
};

export const getGenres = (): Promise<AxiosResponse<any>> => {
    return axios.get('/genre/movie/list', config);
}
