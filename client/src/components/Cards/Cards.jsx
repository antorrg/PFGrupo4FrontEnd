import { useState } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const Cards = () => {
  const games = useSelector((state) => state.games);

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {games.map((game) => (
        <Card game={game} />
      ))}
    </div>
  );
};

export default Cards;
