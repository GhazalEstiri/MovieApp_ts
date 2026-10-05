import { useState } from "react";
import MovieCard from "./Components/MovieCard.js";
import { Link } from "react-router-dom";
import BackButton from "./Components/ButtonBack.js";

function Favorite() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  return (
    <div className="text-white px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col items-start">
        <div className="w-fit p-3 mb-5 sm:mb-6 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm text-gray-200 hover:bg-red-600/80 hover:border-red-500 transition duration-300">
          <BackButton />
        </div>

        <h1 className="text-white font-bold text-[28px] sm:text-[38px] md:text-[45px] lg:text-[50px] mt-2 mb-8 sm:mb-10 uppercase mx-auto">
          Favorite
        </h1>
      </div>

      {favorites.length === 0 ? (
        <h1 className="text-center text-gray-400 text-xl mt-20">
          No film
        </h1>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {favorites.map((movie) => {
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
      )}
    </div>
  );
}

export default Favorite;

