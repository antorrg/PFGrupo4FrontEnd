import React from 'react'

const Landing = () => {
  return (
    <section className="w-screen flex flex-col items-center justify-center text-center">
        <section className="flex w-10/12 h-[85vh] items-start justify-center">
          <div className="max-w-[700px] flex items-center gap-8 flex-col mt-[50px]">
            <h1 className="text-7xl font-bold">LA TIENDA DE GAMERS PARA GAMERS</h1>
            <p className="text-xl max-w-xs">compra juegos digitales y fisicos al mejor precio del mercado</p>
            <div className=" w-[420px] flex items-center justify-between">
              <button className="w-[190px] h-[50px] bg-gradient-to-r from-violet-600 to-orange-600 text-white text-xl">Join now</button>
              <button className="w-[190px] h-[50px] border-[#8f00ff] border-2 text-xl">Home</button>
            </div>
          </div>
        </section>
        <section className="flex w-10/12 h-[85vh] items-start justify-center">
          <div className="flex items-center gap-8 flex-col mt-[50px]">
            <h1 className="text-7xl font-bold">MORE THAN 1000 GAMES</h1>
          </div>
        </section>
        <section className="flex w-10/12 h-[85vh] items-start justify-center">
          <div className="flex items-center gap-8 flex-col mt-[50px]">
            <h1 className="text-7xl font-bold">OF ALL CONSOLES</h1>
          </div>
        </section>
        <section className="flex w-10/12 h-[85vh] items-center justify-center">
          <div className="flex items-center gap-8 flex-col mt-[50px]">
            <h1 className="text-7xl font-bold">BECOME A PART OF THE COMMUNITY</h1>
          </div>
        </section>
    </section>
  )
}

export default Landing
