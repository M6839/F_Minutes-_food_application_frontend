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

interface User{
  id:string,
  email:string,
  name:string
}
interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  userId?: string;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  user:User;
  token?: string;
  setToken:React.Dispatch<React.SetStateAction<string | undefined>>
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  userId: undefined,
  setUser:()=>{},
  user: { id: '', email: '', name: '' },
  setToken:()=>{},
  token: undefined,
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string>();
  const [user,setUser]=useState<User>({ id: '', email: '', name: '' });
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const usertoken = localStorage.getItem('token');

    if (user && usertoken) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
      setUserId(parsedUser.id);
      setToken(usertoken);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, userId, user, token ,setUser,setToken}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
