import { Button } from "@nextui-org/react";
import { CartContext } from "../../context/contextCart";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import PaymentTest from "./PaymentTest";

import { RemoveFromCartIcon } from "../../icono/icono";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import axios from "axios";

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
    <div className="w-[90%]">
      <div className="max-w-[600px] sm:mx-auto sm:mt-0 lg:w-full lg:flex gap-8 lg:max-w-7xl justify-between">
        <div className="flex flex-col pb-16 sm:w-[600px]">
          <div className="w-full h-[140px] py-4 flex gap-4 border-b-1 sm:h-[270px] sm:py-8">
            <div>
              <img
                className="h-full w-[100px] object-cover sm:w-[200px]"
                src={image}
                alt={name}
              />
            </div>
            <div className="flex-1 flex flex-col h-full justify-between">
              <div>
                <h3 className="font-medium">{name}</h3>
                <p>Fisico</p>
                <h1 className="font-medium">Subtotal</h1>
                <h1 className="font-medium">${subTotal.toFixed(2)}</h1>
              </div>
              <div className="flex justify-between items-center">
                <p>Cantidad: {quantity}</p>
                <div>
                  <Button
                    onClick={addToCart}
                    isIconOnly
                    size="sm"
                    color="primary"
                    variant="light"
                  >
                    <FaPlus />
                  </Button>
                  <Button
                    onClick={removeItem}
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
              <p className="font-medium">${price}</p>
              <Button
                size="sm"
                variant="light"
                color="danger"
                onClick={removeIdCart}
              >
                <RemoveFromCartIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Carrito = () => {
  //const cartRedux = useSelector((state) => state.cart);
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
        videogamesIds
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
      };
    });
    setItemsPayment(auxItemsPayment);
  };

  useEffect(() => {
    getCartVideogamesData(cart);
  }, [updateFlag]);

  return (
    <div>
      {!cartData.length ? (
        <h1 className="text-xl font-semibold mb-4">Carrito de Compra Vacio</h1>
      ) : (
        <h1 className="text-xl font-semibold mb-4">Carrito de Compra</h1>
      )}
      <ul>
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
        <Button
          radius="sm"
          color="error"
          className="text-white py-3 w-full mt-4"
          onClick={() => clearCart(updateFlagHandler)}
        >
          Vaciar Carrito
        </Button>
      </ul>
      <Button
        radius="sm"
        color="error"
        className="text-danger py-3 w-full mt-4"
        onClick={() => clearCart(updateFlagHandler)}
      >
        Vaciar Carrito <RemoveFromCartIcon />
      </Button>
      <div className="flex flex-col p-3 mb-4 w-full border-t-1 justify-between items-center sm:w-[600px] lg:w-[500px] bg-[#f7edff] h-fit lg:p-6 gap-4 rounded-2xl">
        <div className="flex justify-between w-full">
          <div>
            {/* <h1 className="font-medium">Subtotal</h1> */}
            <h1 className="font-medium">Total</h1>
            <p>Shipping and taxes calculated at checkout</p>
          </div>
          <div>
            {/* <h1 className="font-medium">${total.toFixed(2)}</h1> */}
            <h1 className="font-medium">${total.toFixed(2)}</h1>
          </div>
        </div>
        <Button
          radius="sm"
          color="primary"
          className="text-white py-5 w-full"
          onClick={() => checkoutHandler()}
        >
          <p className="text-base">Comprar</p>
        </Button>
        <div className="h-[50px] flex items-center justify-center">
          <p className="mr-2">ó</p>
          <span className="text-violet-400 cursor-pointer">
            Continuar Comprando...
          </span>
        </div>
      </div>
      <div>
        {itemsPayment.length && (
          <PaymentTest
            userID={loginUser.id}
            //userID={"87bfab07-3db0-4d3d-8b59-9315fc03fa1a"}
            arrayItems={itemsPayment}
          />
        )}
      </div>
    </div>
  );
};

export default Carrito;
