import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";

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
    <div className="w-[90%] ">
      <h1 className="text-xl font-semibold mb-4">Shopping Cart</h1>
      <div className="max-w-[600px] sm:mx-auto sm:mt-0 lg:w-full lg:flex gap-8 lg:max-w-7xl justify-between">  
      <div className="flex flex-col pb-16 sm:w-[600px]">
        {games.videogames && games.videogames[4].image
          ? games.videogames.map((game) => {
              return (
                <div className="w-full h-[140px] py-4 flex gap-4 border-b-1 sm:h-[270px] sm:py-8">
                  <div>
                    <img
                      className="h-full w-[100px] object-cover sm:w-[200px]"
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
      <div className="flex flex-col p-3 mb-4 w-full border-t-1 justify-between items-center sm:w-[600px] lg:w-[500px] bg-[#f7edff] h-fit lg:p-6 gap-4 rounded-2xl">
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
      </div>
    </div>
  );
}
