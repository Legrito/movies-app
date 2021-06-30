import axios from "axios";

const API_KEY = 'a9bb7243d3a710c2ab16652dca81dddb';
const BASE_URL = `https://api.themoviedb.org/3/`;

export const getMovieTrends = (period) => {
    return axios.get(`${BASE_URL}trending/movie/${period}?api_key=${API_KEY}`);  
}

export const getMoviesByQuery = (query) => {
    return axios.get(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`);  
}

export const getMoviesById = (id) => {
    return axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);  
}

export const getMovieAdditionalInfo = (id, type) => {
    return axios.get(`${BASE_URL}movie/${id}/${type}?api_key=${API_KEY}`);;  
}
