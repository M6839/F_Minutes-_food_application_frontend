import FilterResturent from '@/components/FilterResturent'
import Firms from '@/components/Firms'
import Productsbar from '@/components/Productsbar'
import Image from 'next/image'
import React from 'react'
import Footer from '@/components/Footer'
const page = () => {
  return (
    <div className='bg-white min-h-screen'>
      <Image src={'/assests/banner.jpg'} alt='banner' width={500} height={500} className='w-full h-[400px]'/>
      <Productsbar/>
      <Firms/>
      <FilterResturent/>
      <Footer/>
    </div>
  )
}
export default page