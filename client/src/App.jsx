// hooks ----------------------------------------
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getGames } from "./redux/actions";
import { useDispatch } from "react-redux";
// views ----------------------------------------
import {
  Landing,
  Home,
  Detail,
  Carrito,
  Wishlist,
  NotFound,
  Footer,
  NavBar,
  Create,
} from "./views/index";
import "./app.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getGames({
        page: 0,
        platforms: "",
        genres: "",
        minPrice: -1,
        maxPrice: -1,
        name: "",
      })
    );
  }, []);

  return (
    <div className="app_container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
