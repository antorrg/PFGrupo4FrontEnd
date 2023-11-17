import { useState } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import style from "./Cards.module.css";

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
      <div className={style.cards}>
        {games.map((game) => (
          <Card game={game} />
        ))}
      </div>
      <div>
        <button onClick={handlerHome}>Inicio</button>
        {numPag > 1 && <button onClick={handlerAnt}>Anterior</button>}
        <p> Página {numPag}</p>
        <button onClick={handlerNext}>Siguiente</button>
      </div>
    </div>
  );
};

export default Cards;
