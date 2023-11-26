import { useState } from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const Cards = (props) => {
  //const games = useSelector((state) => state.games);
  const { videogames } = props;
  return (
    <div className="flex justify-start items-center flex-wrap gap-4">
      {videogames.map((element) => (
        <Card key={element.id} game={element} />
      ))}
    </div>
  );
};

export default Cards;
