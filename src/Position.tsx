import { useState, useEffect } from "react";
import {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
} from "./Components/MovieAPI.js";
import { useParams, Link } from "react-router-dom";
import MovieCard from "./Components/MovieCard.js";
import BackButton from "./Components/ButtonBack.js";
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}
function Position() {
  const { position } = useParams();
  const [popular, setPopular] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [topraited, setTopRaited] = useState<Movie[]>([]);

  async function getApi() {
    if (position === "popular") {
      const popularData = await getPopularMovies();
      setPopular(popularData);
    } else if (position === "trending") {
      const trendingData = await getTrendingMovies();
      setTrending(trendingData);
    } else if (position === "top-rated") {
      const topRatedData = await getTopRatedMovies();
      setTopRaited(topRatedData);
    }
  }

  useEffect(() => {
    getApi();
  }, [position]);

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col items-start justify-between">
        <div className="w-fit p-3 mb-5 sm:mb-6 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm text-gray-200 hover:bg-red-600/80 hover:border-red-500 transition duration-300 cursor-pointer">
          <BackButton />
        </div>

        <h1 className="text-white font-bold text-[28px] sm:text-[38px] md:text-[45px] lg:text-[50px] mt-2 mb-8 sm:mb-10 uppercase flex justify-center items-center mx-auto">
          {position}
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 text-white">
        {position === "popular" &&
          popular.map((movie) => {
            return (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="block mx-auto text-center p-2 rounded-2xl hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:-translate-y-2 hover:scale-105 transition-all duration-300"
              >
                <MovieCard movie={movie} />
              </Link>
            );
          })}

        {position === "trending" &&
          trending.map((movie) => {
            return (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="block mx-auto text-center p-2 rounded-2xl hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:-translate-y-2 hover:scale-105 transition-all duration-300"
              >
                <MovieCard movie={movie} />
              </Link>
            );
          })}

        {position === "top-rated" &&
          topraited.map((movie) => {
            return (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="block mx-auto text-center p-2 rounded-2xl hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:-translate-y-2 hover:scale-105 transition-all duration-300"
              >
                <MovieCard movie={movie} />
              </Link>
            );
          })}
      </div>
    </section>
  );
}

export default Position;
