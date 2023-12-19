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
      <section className="relative flex w-full h-[90vh] items-center justify-center bg-[url('/src/views/Landing/all_games.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          data-aos-duration="2000"
          data-aos="fade-in"
          className="max-w-[700px] gap-10 flex items-center justify-evenly flex-col z-10"
        >
          <h1 className="text-3xl sm:text-7xl font-bold text-white">
            LA TIENDA DE GAMERS PARA GAMERS
          </h1>
          <p className="text-base sm:text-xl max-w-xs text-white">
            compra juegos digitales y fisicos al mejor precio del mercado
          </p>
          <div className="w-[250px] sm:w-[420px] flex items-center justify-between">
            <Link to="/join">
              <button className="w-[120px] h-[35px] sm:w-[190px] sm:h-[50px] bg-gradient-to-r from-violet-600 to-orange-600 text-white text-base sm:text-xl">
                Join now
              </button>
            </Link>
            <Link to="/home">
              <button className="w-[120px] h-[35px] sm:w-[190px] sm:h-[50px] border-[#8f00ff] border-2 text-white text-base sm:text-xl">
                Home
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section
        data-aos-duration="2000"
        data-aos="fade-up"
        className="flex w-full h-fit py-20 sm:p-0 sm:h-[100vh] items-start justify-center overflow-hidden"
      >
        <div className="flex items-center justify-evenly gap-8 flex-col overflow-hidden h-full">
          <h1 className="text-2xl sm:text-5xl font-bold">
            ACCEDE A +1000 JUEGOS
          </h1>
          <div className="w-full">
            <Carousel />
          </div>
        </div>
      </section>
      <section
        data-aos-duration="2000"
        data-aos="fade-up"
        className="hidden sm:grid grid-cols-2 grid-rows-3	w-10/12 h-[100vh] items-center justify-center py-12"
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
        className="flex w-full h-[90vh] items-center justify-center bg-[url('/src/views/Landing/community.jpg')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex items-center gap-8 flex-col mt-[50px] z-10">
          <h1 className="text-3xl sm:text-7xl font-bold text-white">
            SE PARTE DE LA COMUNIDAD
          </h1>
          <div className=" w-auto flex items-center justify-center">
            <Link to="/join">
              <button className="w-[120px] h-[35px] sm:w-[190px] sm:h-[50px] bg-gradient-to-r from-violet-600 to-orange-600 text-white text-base sm:text-xl">
                Join now
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Nuestro Equipo Colaborador
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-medium mr-4"
                  src="https://res.cloudinary.com/dmhxl1rpc/image/upload/v1702685833/antonio_wbzjyu.jpg"
                />
                <div className="flex-grow">
                  <h2 className="text-white title-font font-medium">
                    Antonio Ricardo Rodriguez Gramajo
                  </h2>
                  <p className="text-gray-600">Argentina</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-medium mr-4"
                  src="https://res.cloudinary.com/dmhxl1rpc/image/upload/v1702689533/vladimir_jd4ldg.jpg"
                />
                <div className="flex-grow">
                  <h2 className="text-white title-font font-medium">
                    Vladimir Esquivel Andrade
                  </h2>
                  <p className="text-gray-600">Colombia</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-medium mr-4"
                  src="https://res.cloudinary.com/dmhxl1rpc/image/upload/v1702687018/victor_j1yzvz.jpg"
                />
                <div className="flex-grow">
                  <h2 className="text-white title-font font-medium">
                    Victor javier Del Castillo Holguin
                  </h2>
                  <p className="text-gray-600">Perú</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-medium mr-4"
                  src="https://res.cloudinary.com/dmhxl1rpc/image/upload/v1702686394/franco_zfhkpw.jpg"
                />
                <div className="flex-grow">
                  <h2 className="text-white title-font font-medium">
                    Jhoan Alexander Franco Murcia
                  </h2>
                  <p className="text-gray-600">Colombia</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-medium mr-4"
                  src="https://res.cloudinary.com/dmhxl1rpc/image/upload/v1702685892/denis_oxzjdj.jpg"
                />
                <div className="flex-grow">
                  <h2 className="text-white title-font font-medium">
                    Denis Alexander Piña Rodriguez
                  </h2>
                  <p className="text-gray-600">Venezuela</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-medium mr-4"
                  src="https://res.cloudinary.com/dmhxl1rpc/image/upload/v1702685903/eduardo_brhcpu.jpg"
                />
                <div className="flex-grow">
                  <h2 className="text-white title-font font-medium">
                    Eduardo Alejandro Mario Abrego
                  </h2>
                  <p className="text-gray-600">Argentina</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-medium mr-4"
                  src="https://res.cloudinary.com/dmhxl1rpc/image/upload/v1702686394/lautaro_qtbs3x.jpg"
                />
                <div className="flex-grow">
                  <h2 className="text-white title-font font-medium">
                    Eduardo Lautaro Bunkowski
                  </h2>
                  <p className="text-gray-600">Argentina</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
    </section>
  );
};

export default Landing;
