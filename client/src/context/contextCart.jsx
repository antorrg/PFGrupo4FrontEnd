import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { updateCart } from "../redux/actions";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();
  const loginUser = useSelector((state) => state.loginUser);
  const cartRedux = useSelector((state) => state.cart);

  const [cart, setCart] = useState([]);
  const [initUpdateCart, setInitUpdateCart] = useState(true);
  /*const [cart, setCart] = useState(() => {
    if (isAuthenticated) {
      const initValue = getUserCartDB();
      console.log("initValue: " + initValue);
      return initValue;
    } else {
      const storeCart = localStorage.getItem("cart");
      return storeCart ? JSON.parse(storeCart) : [];
    }
  });*/

  const updateCartDB = async (cart) => {
    const cartItems = {
      userID: loginUser.id,
      cartItems: cart,
    };

    try {
      const data = await axios.post(
        `http://localhost:3001/post/createShoppingCart`,
        cartItems
      );
      //console.log(data.data);
      dispatch(updateCart(data.data));
    } catch (error) {
      window.alert(error.message);
    }
  };

  const getUserCartDB = async () => {
    try {
      //const data = await axios.get(`http://localhost:3001/getUserShoppingCart/${loginUser.id}`);
      const data = await axios.get(
        `http://localhost:3001/getUserShoppingCart/90699e67-022a-4bb7-93ad-792672016456`
      );
      //dispatch(updateCart(data.data));
      setCart(data.data);
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    if (initUpdateCart) {
      //Initialize cart
      if (isAuthenticated) {
        //Initialize if user is login
        getUserCartDB();
      } else {
        //Initialize with local storage:
        const storeCart = localStorage.getItem("cart");
        //dispatch(storeCart ? JSON.parse(storeCart) : []);
        setCart(storeCart ? JSON.parse(storeCart) : []);
      }
      setInitUpdateCart(false);
    } else {
      if (isAuthenticated) {
        updateCartDB(cart);
        //localStorage.cart = [];
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      //console.log("JSON.stringify(cart): " + JSON.stringify(cart))
      //localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const getQuantityId = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const addToCart = (product, updateFlagHandler) => {
    const auxProduct = {
      id: product.id,
    };

    const productInCartIndex = cart.findIndex(
      (item) => item.id === auxProduct.id
    );
    if (productInCartIndex >= 0) {
      const newCart = [...cart];
      newCart[productInCartIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart((prevState) => [
        ...prevState,
        {
          ...auxProduct,
          quantity: 1,
        },
      ]);
    }

    updateFlagHandler && updateFlagHandler();
  };

  const removeIdCart = (productId, updateFlagHandler) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);

    updateFlagHandler && updateFlagHandler();
  };

  const removeItem = (id, updateFlagHandler) => {
    setCart((currItems) => {
      const item = currItems.find((item) => item.id === id);
      if (item?.quantity === 1) {
        return currItems;
      } else {
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });

    updateFlagHandler && updateFlagHandler();
  };

  const removeFromCart = (product) => {
    setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  };

  const clearCart = (updateFlagHandler) => {
    setCart([]);
    updateFlagHandler && updateFlagHandler();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        clearCart,
        getQuantityId,
        addToCart,
        removeFromCart,
        removeItem,
        removeIdCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
