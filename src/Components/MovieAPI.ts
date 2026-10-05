const API_KEY = "6504d1950ef26156ed61ff1f952a4d7e";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}

export async function getTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  );
  const data = await response.json();
  return data.results;
}
export async function getTopRatedMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  );
  const data = await response.json();
  return data.results;
}
export async function getMovieDetails(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();

  return data;
}
export async function searchmovie(title) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${title}`,
  );
  const data = await response.json();
  return data.results;
}

export async function getCategory() {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en`,
  );
  const data = await response.json();
  return data.genres;
}
export async function getMoveOfCategory(categoryId) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en&with_genres=${categoryId}`,
  );
  const data = await response.json();
  return data.results;
}
