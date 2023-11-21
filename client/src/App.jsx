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
  const pageProperties = `bg-[url(${bgPage})] bg-cover bg-center opacity-20 w-screen h-screen absolute -z-[1] top-0 left-0`;

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
    <div className="my-0 mx-auto flex flex-col items-center justify-between min-h-screen">
      <div className={pageProperties}>
        <div className="bg-gradient-to-t from-white to-transparent w-full h-[30%] bottom-0 absolute"></div>
      </div>
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
