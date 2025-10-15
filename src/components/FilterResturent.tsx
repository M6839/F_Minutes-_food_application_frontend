'use client'
import React, { useEffect, useState } from 'react'
import { API_URL } from '@/data/apiPath';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
type Firm = {
  _id: string;
  firmName: string;
  area: string;
  region: string[];
  category: string[];
  products: string[];
  offer: string;
  image: string;
  vendor: string[];
  __v: number;
};

type Vendor = {
  _id: string;
  username: string;
  email: string;
  password: string;
  firm: Firm[];
  __v: number;
};

const FilterResturent = () => {
    const [resturentType,setResturentType]=useState('all');
    const [allVendors,setAllVendors]=useState<Vendor[]>([]);
    const router=useRouter();
    useEffect(()=>{
        const fetchVendors=async()=>{
            try{
                const res=await fetch(`${API_URL}/vendor/all-vendors`)
            if(!res.ok){
                console.log('failed to fetch all vendor details');
            }
            const data=await res.json();
            console.log('all vendors',data)
           setAllVendors(data.vendors);
            }
            catch(err){
                console.log('error in fetching all vendors',err)
            }
        }
        fetchVendors();
    },[])
    const handleFirm=(name:string,id:string)=>{
      const details={
        id:id,
        name:name
      }
      localStorage.setItem('details',JSON.stringify(details))
      router.push('/RestarentItems')
    }
  return (
    <div className='mx-4 md:mx-20'>
        <h1 className='text-[23px] font-bold'>All Category  Resturents in Hyderabad</h1>
        <div className='flex gap-[15px] my-4'>
            <button className={`text-black px-1 md:px-4 md:py-2 border-[2px] border-gray-500 ${resturentType==='all' && "bg-gray-400"}`} onClick={()=>setResturentType('all')}>All</button>
            <button className={`text-black px-1 md:px-4 md:py-2 border-[2px] border-gray-500 ${resturentType==='south-indian' && "bg-gray-400"}`} onClick={()=>setResturentType('south-indian')}>South Indian</button>
            <button className={`text-[] text-black px-1 md:px-4 md:py-2 border-[2px] border-gray-500 ${resturentType==='north-indian' && "bg-gray-400"}`} onClick={()=>setResturentType('north-indian')}>North Indian</button>
            <button className={`text-[] text-black px-1 md:px-4 md:py-2 border-[2px] border-gray-500 ${resturentType==='chinese' && "bg-gray-400"}`} onClick={()=>setResturentType('chinese')}>Chinese</button>
            <button className={`text-[] text-black px-1 md:px-4 md:py-2 border-[2px] border-gray-500 ${resturentType==='bakery' && "bg-gray-400"}`} onClick={()=>setResturentType('bakery')}>Backery</button>
        </div>
        <div className='relative flex flex-col md:flex-row justify-between items-center gap-[20px]'>
             
             {
             allVendors.map((vendor, index) => (
                <div key={vendor._id || index} className="  mb-6">
                  {vendor.firm.map((firmItem) => (
                    (firmItem.region.includes(resturentType) || resturentType==='all')&&
                    <div key={firmItem._id} className="relative hover:scale-90 transition-transform duration-500 mt-2" onClick={()=>handleFirm(firmItem.firmName,firmItem._id)}>
                      <h1 className='text-[24px] text-white font-bold absolute top-[140px] pl-[8px]'>{firmItem.firmName}</h1>
                       <Image
                        src={`${API_URL}/uploads/${firmItem.image}`}
                        alt={firmItem.firmName}
                        width={400}
                        height={180}
                        className="w-[400px] h-[180px] mt-2 rounded-[10px]"
                      />
                    </div>
                  ))}
                </div>
              ))}
              </div>
    </div>
  )
} 

export default FilterResturent