// hooks ----------------------------------------
import { Routes } from "react-router-dom";
import { useEffect, Suspense } from "react";
import { getGames } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { changeBg } from "./redux/actions";
// views ----------------------------------------
import { CartProvider } from "./context/contextCart";
import { NextUIProvider, Spinner } from "@nextui-org/react";
import { renderRoutes, routes } from "./routes";

import {
 
  Footer,
  NavBar,

} from "./views/index";

function App() {
  const dispatch = useDispatch();

  const bgPage = useSelector((state) => state.bgPage);
  console.log(bgPage);
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
    <CartProvider>
    <NextUIProvider>
      <Suspense
        fallback={
          <Spinner
            color="secondary"
            size="lg"
            className="absolute top-[50%] left-[50%]"
          />
        }
      >
        <div className="my-0 mx-auto flex flex-col items-center justify-between min-h-screen">
          <div
            className="bg-cover bg-center opacity-70 w-full h-screen absolute -z-10 top-0 left-0"
            style={backgroundImage}
          >
            <div className="bg-gradient-to-t from-white to-transparent w-full h-[50%] bottom-0 absolute"></div>
          </div>
          <NavBar />
          <Routes>{renderRoutes(routes)}</Routes>
          <Footer />
        </div>
      </Suspense>
    </NextUIProvider>
    </CartProvider>
  );
}

export default App;
