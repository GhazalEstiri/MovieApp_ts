import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.js";
import MovieCard from "./Components/MovieCard.js";
import MovieDetail from "./Components/MovieDetail.js";
// import Search from "./Components/Search"
import Category from "./Components/Category.js";
import Position from "./Position.js";
import Favorite from "./Favotite.js";
import Login from "./Components/Login.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/position/:position" element={<Position />} />
        <Route path="/category/:CategoryId" element={<Category />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
