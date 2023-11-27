/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext();

 export const CartProvider = ({children}) => {
    // const [cart, setCart ] = useState([])
    const [cart, setCart] = useState(() => {
        const storeCart = localStorage.getItem("cart");
        return storeCart ? JSON.parse(storeCart) : []
    })
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])
    
    const getQuantityId = (id) => {
        return cart.find((item) => item.id === id)?.quantity || 0;
    }

    const addToCart = product => {
        const productInCartIndex = cart.findIndex(item => item.id === product.id)
        if (productInCartIndex >= 0) {
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity += 1
            return setCart(newCart)
        }
        setCart(prevState => ([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))
      }
      const removeIdCart = productId => {
        const newCart = cart.filter(item => item.id !== productId)
        setCart(newCart)
      }
      const removeItem = (id) => {
        setCart((currItems) => {
          if (currItems.find((item) => item.id === id)?.quantity === 1) {
            return currItems.filter((item) => item.id !== id);
          } else {
            return currItems.map((item) => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 };
              } else {
                return item;
              }
            });
          }
        });
      };

    const removeFromCart = product => {
        setCart(prevState => prevState.filter(item => item.id !== product.id))
    }
    
    const clearCart = () => {
        setCart([])
    }
    
    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            clearCart,
            getQuantityId,
            addToCart,
            removeFromCart,
            removeItem,
            removeIdCart
         }
        }>
            {children}
        </CartContext.Provider>
    )
}
