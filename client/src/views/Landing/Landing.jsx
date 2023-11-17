import React from "react";

const Landing = () => {
  return (
    <section className="w-[100%] flex flex-col items-center justify-center text-center">
      <section className="relative flex w-full h-[90vh] items-center justify-center bg-[url('./src/views/Landing/all_games.jpg')] bg-cover bg-center">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div className="max-w-[700px] gap-10 flex items-center justify-evenly flex-col z-10">
          <h1 className="text-7xl font-bold text-white">
            LA TIENDA DE GAMERS PARA GAMERS
          </h1>
          <p className="text-xl max-w-xs text-white">
            compra juegos digitales y fisicos al mejor precio del mercado
          </p>
          <div className=" w-[420px] flex items-center justify-between">
            <button className="w-[190px] h-[50px] bg-gradient-to-r from-violet-600 to-orange-600 text-white text-xl">
              Join now
            </button>
            <button className="w-[190px] h-[50px] border-[#8f00ff] border-2 text-xl text-white">
              Home
            </button>
          </div>
        </div>
      </section>
      <section className="flex w-10/12 h-[85vh] items-start justify-center">
        <div className="flex items-center gap-8 flex-col mt-[50px]">
          <h1 className="text-7xl font-bold">ACCEDE A +1000 JUEGOS</h1>
        </div>
      </section>
      <section className="flex w-10/12 h-[85vh] items-start justify-center">
        <div className="flex items-center gap-8 flex-col mt-[50px]">
          <h1 className="text-7xl font-bold">DE TODAS LAS CONSOLAS</h1>
          <h1 className="text-7xl font-bold">EN FORMATO FISICO Y/O DIGITAL</h1>
        </div>
      </section>
      <section className="flex w-10/12 h-[85vh] items-center justify-center">
        <div className="flex items-center gap-8 flex-col mt-[50px]">
          <h1 className="text-7xl font-bold">SE PARTE DE LA COMUNIDAD</h1>
        </div>
      </section>
    </section>
  );
};

export default Landing;
