// import style from "./Card.module.css"
import { Link } from "react-router-dom";

const Card = ({ game }) => {
  const { id, plataform, name, image, price } = game;

  return (
    <div className="w-[220px] h-[400px] bg-[#1F0A4D] text-white">
      <img className="w-full h-[250px] object-cover" src={image} alt={name} />
      <Link to={`/detail/${id}`}>
        <h3>{name}</h3>
      </Link>
      <h4> {price} </h4>
    </div>
  );
};

export default Card;
