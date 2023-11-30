import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";
import PaymentTest from "./PaymentTest";

export default function Carrito() {
  const [games, setGames] = useState({});

  useEffect(() => {
    const getGames = async () => {
      const { data } = await axios("/videogames?page=0&size=5");
      setGames(data);
    };
    getGames();
  }, []);
  return (
    <div className="w-[90%]">
      <h1 className="text-xl font-semibold mb-4">Shopping Cart</h1>
      <div className="flex flex-col pb-16">
        {games.videogames && games.videogames[4].image
          ? games.videogames.map((game) => {
              return (
                <div className="w-ful h-[140px] py-4 flex gap-4 border-b-1">
                  <div>
                    <img
                      className="h-full w-[100px] object-cover"
                      src={game.image}
                      alt={game.name}
                    />
                  </div>
                  <div className="flex-1 flex flex-col h-full justify-between">
                    <div>
                      <h3 className="font-medium">{game.name}</h3>
                      <p>Fisico</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Qty 1</p>
                      <div>
                        <Button
                          isIconOnly
                          size="sm"
                          color="primary"
                          variant="light"
                        >
                          <FaPlus />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          color="primary"
                          variant="light"
                        >
                          <FaMinus />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="w-fit h-full flex flex-col justify-between items-center">
                    <p className="font-medium">${game.price}</p>
                    <Button size="sm" variant="light" color="danger">
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <div className="flex flex-col w-full border-t-1 justify-between items-center">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="font-medium">Subtotal</h1>
            <p>Shipping and taxes calculated at checkout</p>
          </div>
          <div>
            <h1 className="font-medium">$999.00</h1>
          </div>
        </div>
        <Button radius="sm" color="primary" className="text-white py-5 w-full">
          <p className="text-base">Checkout</p>
        </Button>
        <div className="h-[50px] flex items-center justify-center">
          <p className="mr-2">or</p>
          <span className="text-violet-400 cursor-pointer">
            Continue Shopping...
          </span>
        </div>
      </div>
      <div>
        <PaymentTest />
      </div>
    </div>
  );
}
