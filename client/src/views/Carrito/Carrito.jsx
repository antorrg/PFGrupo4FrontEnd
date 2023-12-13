import { Button } from "@nextui-org/react";
import { CartContext } from "../../context/contextCart";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import PaymentTest from "./PaymentTest";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { RemoveFromCartIcon } from "../../icono/icono";
import { useAuth0 } from "@auth0/auth0-react";
import { Select, SelectItem } from "@nextui-org/react";
import { useSelector } from "react-redux";
import axios from "axios";
import setAuthHeader from "../../utils/AxiosUtils";

// export const animals = [
//   {
//     label: "Cat",
//     value: "cat",
//     description: "The second most popular pet in the world",
//   },
// ];

const CartItem = ({
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
                <p>Fisico</p>
                <p className="pl-4 ml-4 border-l">${price}</p>
              </div>
            </div>
            <button className="p-0 m-0 w-5 h-5" onClick={removeIdCart}>
              <XMarkIcon className="w-full h-full text-gray-500 hover:text-danger dark:text-white" />
            </button>
          </div>
          <div className="flex justify-between items-center">
            {/* <Select
              classNames={{
                mainWrapper: "h-4 w-20",
              }}
            >
              {animals.map((animal) => (
                <SelectItem key={animal.value} value={animal.value}>
                  {animal.label}
                </SelectItem>
              ))}
            </Select> */}
            <h1 className="font-medium lg:text-base">${subTotal.toFixed(2)}</h1>
            {/* <p>Cantidad: {quantity}</p> */}
            <div>
              <Button
                onClick={addToCart}
                isIconOnly
                size="sm"
                color="primary"
                // variant="light"
              >
                <FaPlus className="lg:w-4 h-4" />
              </Button>
              <Button
                onClick={removeItem}
                isIconOnly
                size="sm"
                color="primary"
                variant="light"
                className="lg:ml-4"
              >
                <FaMinus className="lg:w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const Carrito = () => {
  //const cartRedux = useSelector((state) => state.cart);
  const token = localStorage.getItem("validToken");
  const loginUser = useSelector((state) => state.loginUser);
  const { isAuthenticated } = useAuth0();
  const { cart, removeItem, addToCart, removeIdCart, clearCart } =
    useContext(CartContext);
  const [cartData, setCartData] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [itemsPayment, setItemsPayment] = useState([]);
  // const [cartInfo, setCartInfo] = useState({});
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
    //console.log("ids: " + JSON.stringify(videogamesIds));
    try {
      const data = await axios.post(
        `/post/videogamesByIds`,
        videogamesIds,
        setAuthHeader(token)
      );

      //const auxObj = {...data.data[0], quantity: 1};
      const auxObj = data.data.map((item) => {
        return {
          ...item,
          quantity: auxCart.find((obj) => obj.id === item.id).quantity,
        };
      });
      //console.log("auxObj 2: " + JSON.stringify(auxObj));
      setCartData(auxObj);
      //console.log(data.data);
      //dispatch(updateCart(data.data));
    } catch (error) {
      window.alert(error.message);
    }
  };

  const updateFlagHandler = () => {
    setUpdateFlag(!updateFlag);
  };

  const checkoutHandler = () => {
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
  };

  useEffect(() => {
    getCartVideogamesData(cart);
  }, [updateFlag]);

  return (
    <div className="flex-1 w-full">
      <div className="pt-8 pb-8 px-4 max-w-[42rem] w-full lg:max-w-[80rem] lg:px-8 my-0 mx-auto">
        {!cartData.length ? (
          <h1 className="text-3xl font-bold">Carrito de Compra Vacio</h1>
        ) : (
          <div className="flex-col items-center flex justify-between lg:flex-row">
            <h1 className="text-3xl font-bold">Carrito de Compra</h1>
            <Button
              radius="sm"
              color="error"
              className="text-danger w-fit"
              onClick={() => clearCart(updateFlagHandler)}
            >
              Vaciar Carrito <RemoveFromCartIcon />
            </Button>
          </div>
        )}
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
          <section className="col-span-7 dark:bg-[#2b0c72] lg:p-8 lg:rounded-xl">
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

          <section className="p-3 mb-4 mt-8 w-full h-fit lg:col-span-5 lg:p-0 lg:mt-0">
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
                color="primary"
                className="text-white py-6 w-full"
                onClick={() => checkoutHandler()}
              >
                <p className="text-base">Comprar</p>
              </Button>
            </div>
            <div>
              {itemsPayment.length && (
                <PaymentTest
                  userID={loginUser.id}
                  userEmail={loginUser.email}
                  //userID={"87bfab07-3db0-4d3d-8b59-9315fc03fa1a"}
                  arrayItems={itemsPayment}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
