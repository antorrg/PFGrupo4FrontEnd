// hooks ----------------------------------------
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getGames } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
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
  Admin,
} from "./views/index";

function App() {
  const dispatch = useDispatch();

  const bgPage = useSelector((state) => state.bgPage);
  console.log(bgPage)
  const backgroundImage = {
    backgroundImage: `url(${bgPage})`,
  };

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
    <NextUIProvider>
      <div className="my-0 mx-auto flex flex-col items-center justify-between min-h-screen">
        <div className="bg-cover bg-center opacity-70 w-full h-screen absolute -z-10 top-0 left-0" style={backgroundImage}>
          <div className="bg-gradient-to-t from-white to-transparent w-full h-[50%] bottom-0 absolute"></div>
        </div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </NextUIProvider>
  );
}

export default App;
