import { Link } from "react-router-dom";
import ConsoleLogos from "../ConsoleLogos/ConsoleLogos";
import { AddToCartIcon, RemoveFromCartIcon } from "../../icono/icono";
import { useContext } from "react";
import { CartContext } from "../../context/contextCart";

const Card = ({ game }) => {
  const { id, Platforms, name, image, price, physicalGame } = game;
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const isProductInCart = cart.some((item) => item.id === game.id);

  return (
    <div className="w-[220px] h-[400px] bg-primary dark:bg-secondary text-white flex flex-col">
      <img className="w-full h-[65%] object-cover" src={image} alt={name} />
      <div className="text-left p-2 h-[35%] flex flex-col justify-evenly">
        <ConsoleLogos Platforms={Platforms} />
        <Link to={`/detail/${id}`}>
          <h3 className="text-sm font-bold">{name}</h3>
        </Link>
        <h3 className="text-accent">{physicalGame ? "FISICO" : "DIGITAL"}</h3>
        <div className="flex w-full justify-between">
          <h4 className="text-2xl font-extrabold w-min">${price}</h4>
          <button
            // style={{ backgroundColor: isProductInCart ? "red" : "#09f" }}
            onClick={() => {
              isProductInCart ? removeFromCart(game) : addToCart(game);
            }}
          >
            {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
