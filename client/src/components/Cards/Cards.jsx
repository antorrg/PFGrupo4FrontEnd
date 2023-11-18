import { useState } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const Cards = () => {
  const games = useSelector((state) => state.games);
  let [numPag, setNumPag] = useState(1);

  const handlerAnt = () => {
    if (numPag > 1) setNumPag(numPag - 1);
  };

  const handlerNext = () => {
    setNumPag(numPag + 1);
  };

  const handlerHome = () => {
    setNumPag(1);
  };

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-4">
        {games.map((game) => (
          <Card game={game} />
        ))}
      </div>
      <div className="flex items-center justify-center p-4 gap-4">
        <button onClick={handlerHome}>Inicio</button>
        {numPag > 1 && <button onClick={handlerAnt}>Anterior</button>}
        <p> Página {numPag}</p>
        <button onClick={handlerNext}>Siguiente</button>
      </div>
    </div>
  );
};

export default Cards;
