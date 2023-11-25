// styles -----------------------------
import "aos/dist/aos.css";
import consoles from "./consoles.png";
import videogames from "./videogames.png";
// hooks ------------------------------
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
// components -------------------------
import Carousel from "../../components/Carousel/Carousel.jsx";

const Landing = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className="w-[100%] flex flex-col items-center justify-center text-center">
      <section className="relative flex w-full h-[90vh] items-center justify-center bg-[url('./src/views/Landing/all_games.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          data-aos-duration="2000"
          data-aos="fade-in"
          className="max-w-[700px] gap-10 flex items-center justify-evenly flex-col z-10"
        >
          <h1 className="text-7xl font-bold text-white">
            LA TIENDA DE GAMERS PARA GAMERS
          </h1>
          <p className="text-xl max-w-xs text-white">
            compra juegos digitales y fisicos al mejor precio del mercado
          </p>
          <div className=" w-[420px] flex items-center justify-between">
            <Link to="/join">
              <button className="w-[190px] h-[50px] bg-gradient-to-r from-violet-600 to-orange-600 text-white text-xl">
                Join now
              </button>
            </Link>
            <Link to="/home">
              <button className="w-[190px] h-[50px] border-[#8f00ff] border-2 text-xl text-white">
                Home
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section
        data-aos-duration="2000"
        data-aos="fade-up"
        className="flex w-full h-[100vh] items-start justify-center overflow-hidden"
      >
        <div className="flex items-center justify-evenly gap-8 flex-col overflow-hidden h-full">
          <h1 className="text-5xl font-bold">ACCEDE A +1000 JUEGOS</h1>
          <div className="w-full">
            <Carousel />
          </div>
        </div>
      </section>
      <section
        data-aos-duration="2000"
        data-aos="fade-up"
        className="grid grid-cols-2 grid-rows-3	w-10/12 h-[100vh] items-center justify-center py-12"
      >
        <img
          data-aos="fade-right"
          data-aos-duration="2000"
          src={consoles}
          alt="consoles"
          className="col-start-1 col-end-2 row-start-1 row-end-3 w-[80%] h-auto object-contain justify-self-center"
        />
        <div className="flex items-end h-full gap-8 flex-col col-start-2 col-end-3 row-start-1 row-end-2 text-right">
          <h1 className="text-5xl font-bold w-[60%]">DE TODAS LAS CONSOLAS</h1>
        </div>
        <div className="flex items-start h-full gap-8 flex-col col-start-1 col-end-2 row-start-3 row-end-4 text-left">
          <h1 className="text-5xl font-bold w-[50%]">
            EN FORMATO FISICO Y/O DIGITAL
          </h1>
        </div>
        <img
          data-aos="fade-left"
          data-aos-duration="2000"
          src={videogames}
          alt="consoles"
          className="col-start-2 col-end-3 row-start-2 row-end-4 w-[70%] h-auto object-contain justify-self-center"
        />
      </section>
      <section
        data-aos-duration="2000"
        data-aos="fade-up"
        className="flex w-full h-[90vh] items-center justify-center bg-[url('./src/views/Landing/community.jpg')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex items-center gap-8 flex-col mt-[50px] z-10">
          <h1 className="text-7xl font-bold text-white">
            SE PARTE DE LA COMUNIDAD
          </h1>
          <div className=" w-auto flex items-center justify-center">
            <Link to="/join">
              <button className="w-[190px] h-[50px] bg-gradient-to-r from-violet-600 to-orange-600 text-white text-xl">
                Join now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Landing;
