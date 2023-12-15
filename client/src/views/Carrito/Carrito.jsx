import { Button } from "@nextui-org/react";
import { CartContext } from "../../context/contextCart";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Swal from "sweetalert2";
import { Spinner } from "@nextui-org/react";

import PaymentTest from "./PaymentTest";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { RemoveFromCartIcon } from "../../icono/icono";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import axios from "axios";
import setAuthHeader from "../../utils/AxiosUtils";

const CartItem = ({
  physicalGame,
  image,
  price,
  name,
  quantity,
  addToCart,
  removeItem,
  removeIdCart,
}) => {
  const subTotal = quantity * price;

  return (
    <li className="p-6 flex border-t dark:bg-secondary mb-4 dark:border-none rounded-2xl shadow-xl">
      <div>
        <img
          className="h-24 w-24 rounded-md object-cover sm:w-48 sm:h-48"
          src={image}
          alt={name}
        />
      </div>
      <div className="flex-1 ml-4 flex flex-col justify-between">
        <div className="flex-1 flex flex-col h-full justify-between">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-sm lg:text-lg">{name}</h3>
              <div className="flex text-sm lg:text-base">
                <p className="text-accent">
                  {physicalGame ? "FISICO" : "DIGITAL"}
                </p>
                <p className="pl-4 ml-4 border-l">${price}</p>
              </div>
            </div>
            <button className="p-0 m-0 w-5 h-5" onClick={removeIdCart}>
              <XMarkIcon className="w-full h-full text-gray-500 hover:text-danger dark:text-white" />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div>
                <Button
                  onClick={removeItem}
                  isIconOnly
                  size="sm"
                  color="primary"
                  variant="light"
                  className=""
                >
                  <FaMinus className="lg:w-4 h-4" />
                </Button>
                <Button
                  onClick={addToCart}
                  isIconOnly
                  size="sm"
                  color="primary"
                >
                  <FaPlus className="lg:w-4 h-4" />
                </Button>
              </div>
              <p className="ml-4 text-sm">Cantidad: {quantity}</p>
            </div>
            <h1 className="font-medium lg:text-base">${subTotal.toFixed(2)}</h1>
          </div>
        </div>
      </div>
    </li>
  );
};

const Carrito = () => {
  const token = localStorage.getItem("validToken");
  const loginUser = useSelector((state) => state.loginUser);
  const { cart, removeItem, addToCart, removeIdCart, clearCart } =
    useContext(CartContext);
  const [cartData, setCartData] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [itemsPayment, setItemsPayment] = useState([]);
  let total = cartData.reduce(
    (acc, el) => acc + Number(el.price) * el.quantity,
    0
  );

  const getCartVideogamesData = async (auxCart) => {
    const videogamesIds = {
      ids: auxCart.map((item) => {
        return item.id;
      }),
    };
    try {
      const data = await axios.post(
        `/post/videogamesByIds`,
        videogamesIds,
        setAuthHeader(token)
      );

      const auxObj = data.data.map((item) => {
        return {
          ...item,
          quantity: auxCart.find((obj) => obj.id === item.id).quantity,
        };
      });
      setCartData(auxObj);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const updateFlagHandler = () => {
    setItemsPayment([]);
    setUpdateFlag(!updateFlag);
  };

  const checkoutHandler = () => {
    if (loginUser.token) {
      const auxItemsPayment = cartData.map((item) => {
        return {
          id: item.id,
          title: item.name,
          unit_price: Math.round(item.price),
          quantity: item.quantity,
          currency_id: "USD",
          picture_url: item.image,
        };
      });
      setItemsPayment(auxItemsPayment);
    } else {
      Swal.fire({
        icon: "error",
        title: "debes iniciar secion para comprar",
        // text: "Something went wrong!",
        showConfirmButton: false,
        footer:
          '<button onclick="window.location.href=' /
          '"class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Click para iniciar sesiÃ³n</button>',
      });
    }
  };

  useEffect(() => {
    getCartVideogamesData(cart);
  }, [updateFlag]);

  return (
    <div className="flex-1 w-full h-full flex">
      <div className="pt-8 pb-8 px-4 max-w-[42rem] w-full lg:max-w-[80rem] lg:px-8 my-0 mx-auto flex flex-col">
        {!cartData.length ? (
          <h1 className="text-3xl font-bold">Carrito de Compra Vacio</h1>
        ) : (
          <div className="items-center flex justify-between flex-row">
            <h1 className="text-3xl font-bold">Carrito de Compra</h1>
            <button
              className="w-fit rounded-xl bg-secondary p-1"
              onClick={() => clearCart(updateFlagHandler)}
            >
              <RemoveFromCartIcon />
            </button>
          </div>
        )}
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 flex-1 h-full justify-between flex flex-col">
          <section className="col-span-7 lg:dark:bg-[#2b0c72] lg:p-8 lg:rounded-xl">
            <ul className="border-b dark:border-none">
              {cartData.map((game) => (
                <CartItem
                  key={game.id}
                  addToCart={() => addToCart(game, updateFlagHandler)}
                  removeItem={() => removeItem(game.id, updateFlagHandler)}
                  total={total}
                  removeIdCart={() => removeIdCart(game.id, updateFlagHandler)}
                  {...game}
                />
              ))}
            </ul>
          </section>

          <section className="p-3 mb-4 mt-8 w-full h-fit lg:col-span-5 lg:p-0 lg:mt-0 ">
            <div className="text-black dark:text-white flex flex-col p-4 shadow-xl dark:bg-secondary justify-between items-center  lg:p-6 gap-4 rounded-xl">
              <div className="flex justify-between w-full">
                <div>
                  {/* <h1 className="font-medium">Subtotal</h1> */}
                  <h1 className="font-medium">Total</h1>
                </div>
                <div>
                  {/* <h1 className="font-medium">${total.toFixed(2)}</h1> */}
                  <h1 className="font-medium">${total.toFixed(2)}</h1>
                </div>
              </div>
              <Button
                radius="sm"
                // color="primary"
                className="text-white py-6 w-full bg-secondary dark:bg-primary"
                onClick={() => checkoutHandler()}
              >
                <p className="text-base">Comprar</p>
              </Button>
              <div className="w-full">
                {itemsPayment.length ? (
                  <PaymentTest
                    userID={loginUser.id}
                    userEmail={loginUser.email}
                    //userID={"87bfab07-3db0-4d3d-8b59-9315fc03fa1a"}
                    arrayItems={itemsPayment}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
