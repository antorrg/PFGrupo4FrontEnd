import { Link } from "react-router-dom";
import ConsoleLogos from "../ConsoleLogos/ConsoleLogos";
import { AddToCartIcon, RemoveFromCartIcon } from "../../icono/icono";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/contextCart";
import { showSuccess, showError } from "../../utils/Notifications";
import SkeletonCard from "./Skeleton";
import { Spinner } from "@nextui-org/react";

const Card = ({ game }) => {
  const { id, Platforms, name, image, price, physicalGame } = game;
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const isProductInCart = cart.some((item) => item.id === game.id);

  const [flagCard, setFlagCard] = useState(false)
  const [imagenCargada, setImagenCargada] = useState(false);

  useEffect(() => {
    const timeOutCard = setTimeout(() => {
      setFlagCard(true);
    }, 1000);
    return () => clearTimeout(timeOutCard);
  },[])

  useEffect(() => {
    const cargarImagen = () => {
      const imagen = new Image();
      imagen.src = image;

      imagen.onload = () => {
        setImagenCargada(true);
      };
    };

    cargarImagen();
  },[image])

  return (
    <>
      {flagCard === false ? (
        <SkeletonCard />
      ) : (
        <div className="shadow-xl w-full h-[150px] sm:w-[220px] sm:h-[400px] bg-secondary text-white flex flex-row sm:flex-col ">
          {
            imagenCargada?
            <Link to={`/detail/${id}`} className="w-[140px] h-full sm:w-full sm:h-[65%]">
              <img
                className="w-full h-full  object-cover duration-300 hover:brightness-75"
                src={image}
                alt={name}
              />
            </Link>
              :
            <div className="w-[100px] h-full sm:w-full sm:h-[65%] flex items-center justify-center">
              <Spinner
              color="secondary"
              size="lg"
            />
            </div>
          }
          <div className="text-left p-2 w-full sm:h-[35%] flex flex-col justify-evenly">
            <ConsoleLogos Platforms={Platforms} />
            <Link to={`/detail/${id}`}>
              <h3 className="text-sm font-bold hover:text-accent">{name}</h3>
            </Link>
            <h3 className="text-accent">
              {physicalGame ? "FISICO" : "DIGITAL"}
            </h3>
            <div className="flex w-full justify-between">
              <h4 className="text-2xl font-extrabold w-min">${price}</h4>
              <button
                // style={{ backgroundColor: isProductInCart ? "red" : "#09f" }}
                onClick={() => {
                  isProductInCart
                    ? (removeFromCart(game),
                      showError(
                        `El Video Juego ${game.name} se ha eliminado del carrito`
                      ))
                    : (addToCart(game),
                      showSuccess(
                        `El Video Juego ${game.name} se ha agregado al carrito`
                      ));
                }}
              >
                {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
