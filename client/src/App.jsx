// hooks ----------------------------------------
import { Routes, useNavigate } from "react-router-dom";
import { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { changeBg, getGames, login, limpiarLogin } from "./redux/actions";
// views ----------------------------------------
import { CartProvider } from "./context/contextCart";
import { NextUIProvider, Spinner } from "@nextui-org/react";
import { renderRoutes, routes } from "./routes";
import userLog from "./components/Auth0/Send";

import { Footer, NavBar } from "./views/index";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  // console.log(isAuthenticated);
  // console.log(user);

  const bgPage = useSelector((state) => state.bgPage);
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
  //-----------------------------------------------------
  //    Estas funciones son para enviar datos al reducer

  useEffect(() => {
    const fetchUserLog = async () => {
      if (isAuthenticated) {
        try {
          const result = await userLog(user);
          dispatch(login(result));
        } catch (error) {
          // Maneja el error según tus necesidades
          console.error("Error al obtener información del usuario:", error);
        }
      } else {
        dispatch(limpiarLogin());
      }
    };

    fetchUserLog();
  }, [isAuthenticated, user, dispatch]);

  return (
    <CartProvider>
      <NextUIProvider navigate={navigate}>
        <Suspense
          fallback={
            <Spinner
              color="secondary"
              size="lg"
              className="absolute top-[50%] left-[50%]"
            />
          }
        >
          <div className="my-0 mx-auto flex flex-col items-center justify-between min-h-screen dark:bg-[#1F0A4D]">
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
