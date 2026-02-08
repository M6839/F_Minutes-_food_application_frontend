'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import { API_URL } from '@/data/apiPath'
import { CartContext } from '@/context/CartContext'
import { useContext } from 'react'
import Image from 'next/image'
const Products = () => {
    const {setCartItems,userId,token}=useContext(CartContext);
    type Product = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  image: string;
};
    const [products,setProducts]=useState<Product[]>([]);
    const [firm,setFirm]=useState({
        id:'',
        firmName:''
    })
    useEffect(()=>{
        const firmDetails=localStorage.getItem('details');
        if (firmDetails) {
    const parsedDetails = JSON.parse(firmDetails);
    setFirm({
      id: parsedDetails.id,
      firmName: parsedDetails.name
    });
  }
    },[])
    useEffect(()=>{
        const fetchFirmProducts=async()=>{
            try{
                const res=await fetch(`${API_URL}/product/${firm.id}/products`);
                const data=await res.json();
                setProducts(data.products);
            }
            catch(err){
                console.log('error in fetching product details',err);
                
            }

        }
        fetchFirmProducts();
    },[firm])
    useEffect(()=>{
        console.log('products:',products);
    },[products])

const handleAdditemsToCart = async (item: Product) => {
  if (!userId) {
    alert('You must be logged in to add items to the cart.');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify({
        userId,
        productId: item._id,
        quantity: 1
      })
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.message || 'Failed to add item to cart');
      return;
    }

    alert('Item added successfully');

    setCartItems(prev => {
      const existing = prev.find(p => p._id === item._id);
      if (existing) {
        return prev.map(p =>
          p._id === item._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [
        ...prev,
        {
          _id: item._id,
          productName: item.productName,
          price: item.price,
          image: item.image,
          description: item.description,
          quantity: 1
        }
      ];
    });

  } catch (err) {
    console.error("Add to cart failed", err);
    alert('Something went wrong');
  }
};

  return (
    <div className='bg-white min-h-screen'>
        <div className='mx-4 md:mx-20 py-10'>
             <h1 className='text-white text-center text-[28px] font-bold  bg-amber-500 '>{firm.firmName}</h1>
            <div>
                {
                    products?.map((item)=>(
                        <div key={item._id} className='mt-6 text-black'>
                            <hr className=''/>
                            <div className='flex justify-between  md:mx-20 mt-8'>
                            <div>
                                <p className='text-[20px] md:text-[28px] font-[600]'>{item.productName}</p>
                                <p className='text-[16px] md:text-[20px]'>{item.description}</p>
                                <p className='text-[20px] md:text-[20px] font-bold'>Rs.{item.price}</p>
                            </div>
                            <div className='relative'>
                            <Image  src={`${API_URL}/uploads/${item.image}`} alt={item.productName} width={280} height={120} className='w-[200px] md:w-[280px] h-[120px]'/>
                            <button className='absolute top-[75px] left-[50px] md:left-[100px] text-white text-[20px] bg-gray-400 px-6 py-1 rounded-[10px]' onClick={()=>handleAdditemsToCart(item)}>Add to cart</button>
                            </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
       
    </div>
  )
}

export default  Products

 