import { useState, useEffect } from "react";
import {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  searchmovie,
  getCategory,
  getMoveOfCategory,
} from "./MovieAPI.js";
import MovieCard from "./MovieCard.js";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import { Clapperboard, Search, Menu, X, CircleUserRound } from "lucide-react";
// import ShutterIdalnd from "../assets/shutteriland.jpg";
interface Category {
  id: number;
  name: string;
}
interface Movies {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}
interface MovieSliderProps {
  title: string;
  movies: Movies[];
}
interface MovieCategory {
  id:number

}
function Home() {
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topraited, setTopRaited] = useState([]);

  const [search, setSearch] = useState<Movies[]>([]);
  const [query, setQuery] = useState("");

  const [category, setCategory] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [movieCategory, setMovieCategory] = useState<Movies[]>([]);

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { position } = useParams();

  async function getApi() {
    try {
      setLoading(true);
      setError(false);

      const popularData = await getPopularMovies();
      const trendingData = await getTrendingMovies();
      const topRatedData = await getTopRatedMovies();

      setPopular(popularData);
      setTrending(trendingData);
      setTopRaited(topRatedData);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getApi();
  }, []);

  async function handleSearch() {
    try {
      if (!query.trim()) {
        setSearch([]);
        setNotFound(false);
        alert("Please write something...");
        return;
      }

      setLoading(true);
      setError(false);
      setNotFound(false);

      const result = await searchmovie(query);
      setSearch(result);

      if (result.length === 0) {
        setNotFound(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function getCategories() {
    const categoryData = await getCategory();
    setCategory(categoryData);
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function handleSelectbox(e: any) {
    const categoryId = e.target.value;

    if (categoryId === "default") {
      setMovieCategory([]);
      setSelectedCategory(categoryId);
      return;
    }

    const moviesCategory = await getMoveOfCategory(categoryId);
    setMovieCategory(moviesCategory);
    setSelectedCategory(categoryId);
  }

  const MovieSlider = ({ title, movies }: MovieSliderProps) => {
    // console.log(position);

    return (
      <section className="w-full">
        <div className="flex flex-row justify-between items-center p-3 sm:p-5">
          <h1 className="text-sm md:text-2xl mb-3 sm:mb-6 font-bold">
            {title}
          </h1>
        </div>

        <Swiper
          loop={true}
          spaceBetween={12}
          slidesPerView={2}
          grabCursor={true}
          mousewheel={{ forceToAxis: true }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 15 },
            640: { slidesPerView: 3, spaceBetween: 15 },
            768: { slidesPerView: 4, spaceBetween: 18 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
          }}
          modules={[Mousewheel]}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="p-1">
              <Link
                to={`/movie/${movie.id}`}
                className="block mx-auto text-center hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300 p-1 sm:p-2 rounded-2xl hover:-translate-y-2 hover:scale-105"
              >
                <MovieCard movie={movie} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  };

  return (
    <section>
      <header className="w-[95%] mx-auto text-white p-5 sm:p-7 lg:p-8">
        <div className="flex items-center justify-between gap-4">
          <Link to="/">
            <h1 className="flex flex-row font-bold text-sm sm:text-3xl items-center gap-2">
              <Clapperboard
                size={35}
                className="text-red-700 sm:w-[50px] sm:h-[50px]"
              />
              <span className="text-sm md:text-3xl w-20 md:w-40">
                Movie Site
              </span>
            </h1>
          </Link>

          <Link
            to="/Login"
            className="flex items-center gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-xl
             border border-white/15 bg-white/10 backdrop-blur-md
             text-white  md:font-medium text-sm md:text-lg
             hover:bg-[#FB2332] hover:border-[#FB2332]
             transition-all duration-300 cursor-pointer"
          >
            <CircleUserRound size={30} strokeWidth={1} />
            Login
          </Link>
          <div className="hidden lg:flex items-center gap-2 xl:gap-5 text-sm xl:text-lg">
            <Link to="/" className="text-red-700">
              Home
            </Link>
            <Link to="/position/popular" className="hover:text-red-700">
              Popular
            </Link>
            <Link to="/position/trending" className="hover:text-red-700">
              Trending
            </Link>
            <Link to="/position/top-rated" className="hover:text-red-700">
              Top Rated
            </Link>
            <Link to="/favorite" className="hover:text-red-700">
              Favorite
            </Link>
          </div>

          <div className="hidden lg:flex w-[180px] xl:w-[250px]">
            <div className="flex flex-row items-center gap-2 justify-center text-white bg-[#0D1825] border border-[#1E3042] p-2 rounded-xl w-full">
              <Search size={20} className="shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="text-white bg-transparent placeholder:text-[#647181] outline-none w-full min-w-0"
                placeholder="Search Movies ..."
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <select
              name="Categories"
              id="Categories"
              value={selectedCategory}
              onChange={handleSelectbox}
              className="bg-[#0D1825] border-none text-[#F5F7FA] p-2 rounded-xl outline-none cursor-pointer"
            >
              <option value="default " className="hover:cursor-pointer">
                default
              </option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden mt-4 p-4 rounded-xl bg-[#0D1825] border border-[#1E3042] flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2 bg-[#101d2b] border border-[#1E3042] p-2 rounded-xl">
              <Search size={20} className="shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                    setMenuOpen(false);
                  }
                }}
                className="text-white bg-transparent placeholder:text-[#647181] outline-none w-full"
                placeholder="Search Movies ..."
              />
            </div>

            <select
              name="Categories"
              value={selectedCategory}
              onChange={handleSelectbox}
              className="bg-[#101d2b] border border-[#1E3042] text-[#F5F7FA] p-2 rounded-xl outline-none w-full"
            >
              <option value="default">default</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-red-700"
            >
              Home
            </Link>
            <Link
              to="/position/popular"
              onClick={() => setMenuOpen(false)}
              className="hover:text-red-700"
            >
              Popular
            </Link>
            <Link
              to="/position/trending"
              onClick={() => setMenuOpen(false)}
              className="hover:text-red-700"
            >
              Trending
            </Link>
            <Link
              to="/position/top-rated"
              onClick={() => setMenuOpen(false)}
              className="hover:text-red-700"
            >
              Top Rated
            </Link>
            <Link
              to="/favorite"
              onClick={() => setMenuOpen(false)}
              className="hover:text-red-700"
            >
              Favorite
            </Link>
          </div>
        )}
      </header>

      <div>
        {movieCategory.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 p-4 sm:p-6 md:p-10 text-white">
            {movieCategory.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="block mx-auto text-center hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300 p-2 rounded-2xl hover:-translate-y-2 hover:scale-105"
              >
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        )}

        {search.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 p-4 sm:p-6 md:p-10 text-white">
            {search.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="block mx-auto text-center hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300 p-2 rounded-2xl hover:-translate-y-2 hover:scale-105"
              >
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        )}
      </div>

      <section className="relative h-[500px] sm:h-[550px] md:h-[600px] overflow-hidden rounded-xl w-full md:w-[90%] flex mx-auto mt-5">
        <img
          src="shutteriland.jpg"
          alt="Shutter Island"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative xl:-bottom-20 xl:-left-30 z-10 text-white flex justify-center items-center flex-col text-center gap-4 sm:gap-5 bg-[#4d515589] h-auto min-h-[80%] w-[90%] sm:w-[80%] md:w-[70%] lg:w-[45%] mx-auto lg:ml-[8%] lg:mr-0 my-auto p-4 sm:p-6 md:p-8 rounded-xl">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Shutter Island
          </h1>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs md:text-sm lg:text-[15px]">
            <p>⭐ 8.197</p>
            <p>Release: 2010-02-14</p>
            <p>Drama - Thriller - Mystery</p>
          </div>

          <p className="w-full max-w-xl text-xs sm:text-sm md:text-base leading-6 sm:leading-7">
            World War II soldier-turned-U.S. Marshal Teddy Daniels investigates
            the disappearance of a patient from a hospital for the criminally
            insane, but his efforts are compromised by troubling visions and a
            mysterious doctor.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-red-600/80 hover:bg-red-600 px-4 py-2 sm:px-5 sm:py-2 rounded-lg transition duration-300 cursor-pointer">
              Watch trailer
            </button>

            <button className="border border-white hover:bg-white hover:text-black px-4 py-2 sm:px-5 sm:py-2 rounded-lg transition duration-300 cursor-pointer">
              More Details
            </button>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="text-center text-xl text-[#A8B6D8]">Loading...</div>
      ) : error ? (
        <div className="text-center text-xl text-[#A8B6D8]">
          something is wrong.
        </div>
      ) : search.length === 0 && notFound ? (
        <div className="text-center text-xl text-[#A8B6D8]">Not Found</div>
      ) : (
        <div className="text-white p-4 sm:p-6 md:p-10 gap-10 w-[95%] flex mx-auto flex-col">
          <MovieSlider title="Popular Movies" movies={popular} />
          <MovieSlider title="Trending Movies" movies={trending} />
          <MovieSlider title="Top Rated Movies" movies={topraited} />
        </div>
      )}
    </section>
  );
}

export default Home;
