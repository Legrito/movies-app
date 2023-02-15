import axios from 'axios';

const API_KEY = 'a9bb7243d3a710c2ab16652dca81dddb';
const BASE_URL = `https://api.themoviedb.org/3/`;

export const getUpcoming = async () => {
  const apiRes = await axios.get(`${BASE_URL}movie/upcoming?api_key=${API_KEY}&page=10`);

  if (!apiRes || apiRes.status !== 200) {
    throw new Error(`movie/upcoming not OK`);
  } else {
    return apiRes.data;
  }

};

export const getMovieTrends = async ({ pageParam = 1 }) => {
  const apiRes = await axios.get(`${BASE_URL}trending/movie/week?api_key=${API_KEY}&page=${pageParam}`);

  if (!apiRes || apiRes.status !== 200) {
    throw new Error(`movies page ${pageParam} not OK`);
  } else {
    return { results: apiRes.data.results, nextPage: pageParam + 1 };
  }
};

export const getMoviesByQuery = async (query) => {

  const apiRes = await axios.get(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}`);

  if (!apiRes || apiRes.status !== 200) {
    throw new Error(`${query} not OK`);
  } else {
    console.log(apiRes.data);
    return apiRes.data;
  }
};

// export const getMoviesById = (id) => {
//     return axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);
// }
export const getMoviesById = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiRes = await axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);

  if (!apiRes || apiRes.status !== 200) {
    throw new Error(`movie/${id} not OK`);
  } else {
    return apiRes.data;
  }
};

export const getMovieByGenre = () => {
  return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
};

export const getMovieAdditionalInfo = (id, type) => {
  return axios.get(`${BASE_URL}movie/${id}/${type}?api_key=${API_KEY}`);
};
