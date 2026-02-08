import React from 'react'
import Image from 'next/image'
const Footer = () => {
  return (
    <div className='mx-4 md:mx-20 mt-10 py-10 border-t-[2px] border-black text-black'>
        <div className='flex justify-between'>
            <div>
                <div className='flex flex-col md:flex-row'>
                <Image src='/assests/logo.jpg' alt='logo' width={80} height={50} className='rounded-full'/>
                <h1 className='text-[20px] md:text-[32px] font-bold text-amber-500'>F<span className='text-gray-600'><i>-minutes</i></span></h1>
                </div>
                <p className='mt-2 pl-4 text-gray-500'>@2025 Established</p>
            </div>
            <div>
                <h1 className='font-bold'>Contact Us</h1>
                <p>+91 7997589153</p>
                <p>mkirankumar6839@gmail.com</p>
            </div>
        </div>
        
        <h1 className='text-center text-[24px] md:text-[40px] font-bold mt-10'>For best offers and discounts visit the website</h1>
    </div>
  )
}

export default Footer