"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'
import { IoMdCart } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Link from 'next/link'
const Navbar = () => {
  const {cartItems,token,user,setUser,setToken}=useContext(CartContext)
  const [openMenu,setOpenMenu]=useState(false);
  const router=useRouter()
  const handleCart=()=>{
    router.push('/Cart');
  }
 const handleLogin=()=>{
  router.push('/Login')
 }
 const handleLogOut=()=>{
  localStorage.clear();
  setUser({id:"",name:"",email:""});
  setToken("");
 }
  return (
    <div className='sticky top-0 z-50 bg-white  w-full py-2   border-b-[1px] border-gray-600'>
        <div className='flex justify-between items-center px-4 md:px-10'>
          <div className='flex flex-col  md:flex-row'>
            
            <Image src='/assests/logo.jpg' alt='logo' width={80} height={50} className='rounded-full h-[30px] md:w-[80px] md:h-[50px]'/>
            <Link href={'/'}>
            <h1 className='text-[24px] md:text-[32px] font-bold text-amber-500'>F<span className='text-gray-600'><i>-minutes</i></span></h1>
            </Link>
            </div>
            <input type='text' placeholder='search' className='hidden md:block text-black px-[10px] w-[500px] py-[10px] rounded-[10px] border-[1px] border-black'/>
            <div className='hidden md:flex justify-between gap-12'>
           {
            token?(<div className='flex gap-2 items-center'><FaUserCircle className='text-[28px] text-amber-500'/>
            <div>
              <h1 className='text-black'>{user.name}</h1>
              <p className='text-red-500 cursor-pointer' onClick={handleLogOut}>LogOut</p>
            </div>
            </div>)
            :
            (<h1 className='text-[20px] md:text-[24px] text-amber-500 cursor-pointer' onClick={handleLogin}>Login</h1>)
           }
          <a href='https://f-minutes-dashboard.vercel.app/'><h1 className='text-[20px] md:text-[24px] text-amber-500 cursor-pointer'>Vendor dashboard</h1></a>
            <h1 className='flex items-center gap-2 text-[24px] text-amber-500 cursor-pointer' onClick={handleCart}><IoMdCart className='text-text-amber-500 '/>Cart <span className='bg-blue-600 text-white text-[18px] rounded-[8px] px-2 py-1 '>{cartItems.length}</span></h1>
            </div>
            {
              !openMenu ? <IoMenuOutline className='block md:hidden text-amber-500 text-[28px]' onClick={()=>setOpenMenu(!openMenu)}/>:<IoMdClose className='block md:hidden text-amber-500 text-[28px]' onClick={()=>setOpenMenu(!openMenu)}/>
            }
        </div>
       {
        openMenu &&  (<div className='flex flex-col md:hidden absolute justify-between gap-4 p-2 bg-white w-full border-t-black border-[1px]'>
           {
            token?(<div className='flex gap-2 items-center'><FaUserCircle className='text-[28px] text-amber-500'/>
            <div>
              <h1 className='text-black'>{user.name}</h1>
              <p className='text-red-500 cursor-pointer' onClick={handleLogOut}>LogOut</p>
            </div>
            </div>)
            :
            (<h1 className='text-[20px] md:text-[24px] text-amber-500 cursor-pointer' onClick={handleLogin}>Login</h1>)
           }
          <a href='https://f-minutes-dashboard.vercel.app/'><h1 className='text-[20px] md:text-[24px] text-amber-500 cursor-pointer'>Vendor dashboard</h1></a>
            <h1 className='flex items-center gap-2 text-[24px] text-amber-500 cursor-pointer' onClick={handleCart}><IoMdCart className='text-text-amber-500 '/>Cart <span className='bg-blue-600 text-white text-[18px] rounded-[8px] px-2 py-1 '>{cartItems.length}</span></h1>
            </div>)
       }
    </div>
  )
}

export default Navbar