"use client"

import React, { useEffect, useState } from 'react'
import { API_URL } from '@/data/apiPath'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import Image from 'next/image'
interface productItem{
  _id:string,
productName:string,
price:number,
category:[],
image:string,
bestSeller:boolean,
description:string,
firm:[]

}
const AllProducts = () => {
    const [products,setProducts]=useState<productItem[]>([]);
    const [loading,setLoading]=useState<boolean>(true);
const {setCartItems,userId,token}=useContext(CartContext);
    type Product = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  image: string;
};
    useEffect(()=>{
        const fetchProducts=async()=>{
            try{
                const res=await fetch(`${API_URL}/product/`);
                const data=await res.json();
                if(res.ok){
                    console.table("all products:",data.productsAll)
                    setLoading(false);
                    setProducts(data.productsAll);
                    return;
                }
            }
            catch(err){
                console.log("error in fetching the products",err);
            }
        }
        fetchProducts();
    },[])

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
    <div className='mx-4 md:mx-20 text-black'>
        <h1 className='text-3xl font-bold mb-8'>All products</h1>
        {loading?(<p className=''>products are loading....</p>)
        :

        ( <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {
            products?.map((item)=>(
                <div key={item._id} className='flex flex-col gap-8'>
                    <Image  src={`${API_URL}/uploads/${item.image}`} alt={item.productName} width={280} height={120} className='w-[200px] md:w-[280px] h-[120px] rounded-md hover:scale-120 transition-transform duration-500 '/>
                    <div className='space-y-2'>
                    <h1 className='text-md  font-bold'>{item.productName} <span className='text-gray-500'> ({item.category})</span></h1>
                    <p className='text-sm text-gray-500'>{item.description}</p>
                    <div className='flex items-center gap-4'>
                    <p className='text-md font-bold'>₹{item.price}</p>
                    <button className='bg-blue-500 rounded-md px-2 py-1 text-white text-md fond-bold cursor-pointer' onClick={()=>handleAdditemsToCart(item)}>Add to cart</button></div>
                    </div>
                </div>
            ))
        } 
        </div>)
        }
       
    </div>
  )
}

export default AllProducts