"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import Link from 'next/link'
const Navbar = () => {
  const {cartItems}=useContext(CartContext)
  const router=useRouter()
  const handleCart=()=>{
    router.push('/Cart');
  }
 const handleLogin=()=>{
  router.push('/Login')
 }
  return (
    <div className='relative bg-white  w-full py-2 md:py-4  border-b-[1px] border-gray-600'>
        <div className='flex justify-between items-center px-4 md:px-10'>
          <div className='flex flex-col  md:flex-row'>
            
            <Image src='/assests/logo.jpg' alt='logo' width={80} height={50} className='rounded-full'/>
            <Link href={'/'}>
            <h1 className='text-[24px] md:text-[32px] font-bold text-amber-500'>F<span className='text-gray-600'><i>-minutes</i></span></h1>
            </Link>
            </div>
            <input type='text' placeholder='search' className='hidden md:block text-black px-[10px] w-[500px] py-[10px] rounded-[10px] border-[1px] border-black'/>
            <h1 className='text-[20px] md:text-[24px] text-amber-500 cursor-pointer' onClick={handleLogin}>Login</h1>
            <h1 className='text-[24px] text-amber-500 cursor-pointer' onClick={handleCart}>Cart <span className='bg-blue-600 text-white text-[18px] rounded-[8px] px-2 py-1 '>{cartItems.length}</span></h1>
        </div>
       
    </div>
  )
}

export default Navbar