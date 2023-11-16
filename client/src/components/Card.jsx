import style from "./style/Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ game }) => {
  const { plataform, name, image, price } = game;

  return (
    <div>
      <h3>{plataform}</h3>
      <img src={image} alt="" />
      <Link to={`/detail/${Id}`}>
        <h3>{name}</h3>
      </Link>
      <h4> {price} </h4>
    </div>
  );
};

export default Card;
