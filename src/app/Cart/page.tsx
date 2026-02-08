
'use client';
import React, { useContext, useEffect } from 'react';
import { API_URL } from '@/data/apiPath';
import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
type Product = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  image: string;
};

type CartItemFromAPI = {
  product: Product;
  quantity: number;
};
type CartItem = Product & { quantity: number };
const CartPage = () => {
  const { cartItems, setCartItems, userId, token } = useContext(CartContext);

  // Fetch user's cart
  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(`${API_URL}/cart/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
          }
        });
        const data = await res.json();
        if (Array.isArray(data.items)) {
          setCartItems(data.items.map((item: CartItemFromAPI): CartItem => ({
            ...item.product,
            quantity: item.quantity,
            _id: item.product._id
          })));
        } else {
          setCartItems([]);
        }
      } catch (err) {
        console.error("Failed to fetch user cart", err);
      }
    };

    fetchCart();
  }, [userId,token,setCartItems]);

  // Increment item
  const increment = async (id: string) => {
    try {
      await fetch(`${API_URL}/cart/${userId}/item/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ action: 'increment' })
      });
      setCartItems(prev =>
        prev.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item)
      );
    } catch (err) {
      console.error("Increment failed", err);
    }
  };

  // Decrement item
  const decrement = async (id: string) => {
    try {
      await fetch(`${API_URL}/cart/${userId}/item/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ action: 'decrement' })
      });
      setCartItems(prev =>
        prev.map(item =>
          item._id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (err) {
      console.error("Decrement failed", err);
    }
  };

  // Remove item
  const handleRemove = async (id: string) => {
    try {
      await fetch(`${API_URL}/cart/${userId}/item/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });
      setCartItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await fetch(`${API_URL}/cart/${userId}/clear`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });
      setCartItems([]);
    } catch (err) {
      console.error("Clear cart failed", err);
    }
  };
const handlePlaceOrder = async () => {
  try {
    const res = await fetch(`${API_URL}/order/place`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    });

    const result = await res.json();
    if (res.ok) {
      alert('Order placed successfully!');
      setCartItems([]); // clear cart on frontend
    } else {
      alert(result.message || 'Order failed');
    }
  } catch (err) {
    console.error('Error placing order:', err);
    alert('Order placement failed');
  }
};

  return (
    <div className="p-4 bg-white min-h-screen text-black">
      <div className='flex justify-between md:mx-20'>
        <h1 className="text-2xl font-bold mb-4">Cart Items</h1>
        <button 
          className='md:h-[40px] rounded-[10px] text-white bg-red-500 px-[10px]' 
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="mx-20 text-gray-500 mt-6">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, idx) => (
              <li key={item._id || idx} className="mb-2">
                <div className='mt-6'>
                  <hr className='' />
                  <div className='flex justify-between md:mx-20 mt-8'>
                    <div>
                      <p className='text-[20px] md:text-[28px] font-[600]'>{item.productName}</p>
                      <p className='text-[16px] md:text-[20px]'>{item.description}</p>
                      <p className='text-[20px] md:text-[20px] font-bold'>Rs.{item.price}</p>
                      <p className=''>
                        <span 
                          className='text-[25px] px-[10px] cursor-pointer' 
                          onClick={() => decrement(item._id)}
                        >
                          -
                        </span>
                        <span className='bg-blue-600 text-white px-2 py-1 rounded-[10px]'>
                          {item.quantity}
                        </span>
                        <span 
                          className='text-[25px] px-[10px] cursor-pointer' 
                          onClick={() => increment(item._id)}
                        >
                          +
                        </span>
                      </p>
                      <div className='flex gap-[10px] mt-4'>
                        <button 
                          className='md:h-[40px] border border-blue-700 rounded-[10px] px-[10px]' 
                          onClick={() => handleRemove(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className='relative'>
                     <Image
              src={`${API_URL}/uploads/${item.image}`}
              alt={item.productName}
             width={280}
             height={180}
            className="w-[200px] md:w-[280px] h-[100] md:h-[180px] object-cover"
                  />

                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className='flex justify-between  border-t-[1px] border-black py-4 px-4 md:px-10'>
           <button className='md:h-[40px] bg-blue-700 text-white rounded-[10px] px-[2px] md:px-[10px]' onClick={handlePlaceOrder}>
                          Confirm Order
                        </button>
          <p className="text-right font-bold text-xl mt-6 mr-20">
            Total: Rs. {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
