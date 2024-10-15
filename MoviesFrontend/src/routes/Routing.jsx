import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "../pages/auth/login";
import { ROUTES } from "../constants/api";
import AddNewMovie from "../pages/movies/AddNewMovie";
import MovieList from "../pages/movies/movieslist";
import NewMovie from "../pages/movies/NewMovie";

const Routing = () => {
  useEffect(() => {
    localStorage.setItem("isAuthenticated", true);
  }, []);

  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.ADDNEWMOVIE} element={<AddNewMovie />} />
      <Route path={ROUTES.MOVIES_LIST} element={<MovieList />} />
      <Route path={ROUTES.NEW_MOVIE} element={<NewMovie />} />
    </Routes>
  );
};

export default Routing;
