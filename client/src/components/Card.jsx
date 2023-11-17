import style from "./Card.module.css"
import { Link } from "react-router-dom";

const Card = ({ game }) => {
  const {id, plataform, name, image, price } = game;

  return (
    <div className={style.card } >
      <h3>{plataform}</h3>
      <img src={image} alt="" />
      <Link to={`/detail/${id}`}>
        <h3>{name}</h3>
      </Link>
      <h4> {price} </h4>
    </div>
  );
};

export default Card;
