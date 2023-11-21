// hooks ----------------------------------------
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getGames } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { changeBg } from "./redux/actions";
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

function App() {
  const dispatch = useDispatch();
  const bgPage = useSelector((state) => state.bgPage);
  const pageProperties = `bg-${bgPage} my-0 mx-auto flex flex-col items-center justify-between min-h-screen`;
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
    <div className={pageProperties}>
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
