import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "./MovieAPI.js";
import { Heart, Move, Star } from "lucide-react";
import BackButton from "./ButtonBack.js";

function MovieDetail() {
  const { id } = useParams();
  interface Genres {
    id: number;
    name: string;
  }
  interface Movie {
    id: number;
    poster_path: string;
    title: string;
    genres: Genres[] ;
    vote_average: number;
    release_date: string;
    overview:string;
  }
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]");
    return favorites.some((item: Movie) => item.id === Number(id));
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        setMovie(null);
        setError(false);

        const data = await getMovieDetails(Number(id));
        console.log("data:", data);
        setMovie(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  const handlrFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]");

    if (isFavorite) {
      const newFavorite = favorites.filter(
        (item: Movie) => item.id !== movie?.id,
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorite));
      setIsFavorite(false);
      console.log(newFavorite);
    } else {
      const newFavorite = [...favorites, movie];
      localStorage.setItem("favorites", JSON.stringify(newFavorite));
      setIsFavorite(true);
      console.log(newFavorite);
    }
  };
  const genres: Genres[] = movie?.genres ?? [];
  console.log(isFavorite);

  return (
    <section className="w-full">
      {loading ? (
        <div className="text-center text-xl text-[#A8B6D8] py-20">
          Loading...
        </div>
      ) : error ? (
        <div className="text-center text-xl text-red-500 py-20">
          Something went wrong!
        </div>
      ) : !movie ? (
        <div className="text-center text-xl text-[#A8B6D8] py-20">
          Movie not found.
        </div>
      ) : (
        <div className="min-h-screen relative overflow-hidden text-white rounded-xl mx-auto">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/70"></div>

          <div className="relative z-10 px-5 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8">
            <div className="w-fit  h-5 p-5 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm text-gray-200 hover:bg-red-600/80 hover:border-red-500 transition duration-300 ">
              <BackButton />
            </div>

            <section className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20 pt-8 sm:pt-10 lg:pt-6">
              <div className="w-full lg:w-1/2 flex flex-col justify-center items-start">
                <h1 className="text-red-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold text-[30px] sm:text-[38px] md:text-[45px] lg:text-[50px] mb-6 lg:mb-10 break-words w-full max-w-2xl">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-4 sm:gap-6 mb-6 text-sm sm:text-base flex-wrap">
                  <p className="text-yellow-400 font-semibold flex flex-row items-center gap-1">
                    <Star color="#FDC704" size={23} />
                    {movie.vote_average.toFixed(1)}
                  </p>

                  <p className="text-gray-300">{movie.release_date}</p>
                </div>
                <div className="flex flex-col gap-3 mb-8 w-full">
                  <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">
                    genres
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 sm:px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs sm:text-sm text-gray-200 hover:bg-red-600/80 hover:border-red-500 transition duration-300"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col mb-8 w-full">
                  <p className="text-gray-400 text-sm uppercase tracking-widest mb-3">
                    Summary
                  </p>

                  <p className="text-gray-200 leading-7 text-sm sm:text-base max-w-xl">
                    {movie.overview}
                  </p>
                </div>

                <button
                  onClick={handlrFavorite}
                  className="flex items-center w-fit p-3 sm:p-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:bg-red-600  hover:border-red-500 transition duration-300 font-medium cursor-pointer"
                >
                  {isFavorite ? (
                    <Heart color="#d60000" />
                  ) : (
                    <Heart color="#fff" />
                  )}
                </button>

                {/* <button
                  onClick={handlrFavorite}
                  className="flex items-center w-fit p-3 sm:p-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:bg-red-600 hover:border-red-500 transition duration-300 font-medium cursor-pointer"
                >
                  <Heart
                    className={`transition duration-300 ${
                      isFavorite
                        ? "text-red-600 hover:text-white"
                        : "text-white"
                    }`}
                  />
                </button> */}
              </div>

              <div className="w-full sm:w-3/4 md:w-1/2 lg:w-[350px] xl:w-[400px] flex justify-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full max-w-[350px] lg:max-w-none rounded-xl shadow-2xl"
                />
              </div>
            </section>
          </div>
        </div>
      )}
    </section>
  );
}

export default MovieDetail;
