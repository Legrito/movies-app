import axios from "axios";

const API_KEY = 'a9bb7243d3a710c2ab16652dca81dddb';
const BASE_URL = `https://api.themoviedb.org/3/`;

export const getMovieTrends = (period, page) => {
    return axios.get(`${BASE_URL}trending/movie/${period}?api_key=${API_KEY}&page=${page}`);  
}

export const getMoviesByQuery = (query) => {
    return axios.get(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`);  
}

// export const getMoviesById = (id) => {
//     return axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);  
// }
export const getMoviesById = async ({ queryKey }) => {
    const id = queryKey[1];

    const apiRes = await axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);
   
    if(!apiRes || apiRes.status !== 200) {
        throw new Error(`movie/${id} not OK`);
    } else {
        return apiRes.data;
    }

}


export const getMovieByGenre = () => {
    return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`); 
}

export const getMovieAdditionalInfo = (id, type) => {
    return axios.get(`${BASE_URL}movie/${id}/${type}?api_key=${API_KEY}`);;  
}
