import { useState } from "react";
function MovieCard({ movie }) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  return (
    <div className="flex gap-1 flex-col">
      <img src={imageUrl} alt={movie.title} className="rounded-xl" />

      <h3 className="mt-2 text-sm  md:text-lg">{movie.title}</h3>

      <p>⭐ {movie.vote_average}</p>

     
    </div>
  );
}
export default MovieCard;
