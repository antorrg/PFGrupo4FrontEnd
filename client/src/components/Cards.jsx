import { useState } from "react";
import Card from "./Card";

const Cards = ({ games }) => {
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
      <div>
        {games.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
      <div>
        <button onClick={handlerHome}>Inicio</button>
        {numPag > 1 && <button onClick={handlerAnt}>Anterior</button>}
        <p className={style.styleButton1}> Página {numPag}</p>
        <button onClick={handlerNext}>Siguiente</button>
      </div>
    </div>
  );
};

export default Cards;
