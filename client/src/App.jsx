// hooks ----------------------------------------
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getGames } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
// components ----------------------------------------
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import { renderRoutes } from "./routes/index.jsx";

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
    <div className="my-0 mx-auto flex flex-col items-center justify-between min-h-screen">
      <div
        className="bg-cover bg-center opacity-70 w-full h-screen absolute -z-10 top-0 left-0"
        style={backgroundImage}
      >
        <div className="bg-gradient-to-t from-white to-transparent w-full h-[50%] bottom-0 absolute"></div>
      </div>
      <NavBar />
      <Routes>{renderRoutes()}</Routes>
      <Footer />
    </div>
  );
}

export default App;
