import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storeCart = localStorage.getItem("cart");
    return storeCart ? JSON.parse(storeCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getQuantityId = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const addToCart = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);
    if (productInCartIndex >= 0) {
      const newCart = [...cart];
      newCart[productInCartIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart((prevState) => [
        ...prevState,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeIdCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
  };

  const removeItem = (id) => {
    setCart((currItems) => {
      const item = currItems.find((item) => item.id === id);
      if (item?.quantity === 1) {
        return currItems;
      } else {
        return currItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
      }
    });
  };

  const removeFromCart = (product) => {
    setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
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
      }}>
      {children}
    </CartContext.Provider>
  );
};
