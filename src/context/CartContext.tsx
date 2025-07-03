'use client';
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  _id: string;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  userId?: string;
  token?: string;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  userId: undefined,
  token: undefined,
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const usertoken = localStorage.getItem('token');

    if (user && usertoken) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser.id);
      setToken(usertoken);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, userId, token }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
