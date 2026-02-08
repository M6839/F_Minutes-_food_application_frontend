'use client'
import Image from 'next/image';
import React from 'react'
import { useState,useEffect } from 'react'
import { API_URL } from '../data/apiPath';
import { useRouter } from 'next/navigation';
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
const Firms = () => {
     const [vendors,setVendors]=useState<Vendor[]>([]);
     const router=useRouter();
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const responce=await fetch(`${API_URL}/vendor/all-vendors`)
                if(!responce.ok){
                    console.log('failed in fetching details:');
                }
                const data=await responce.json()
                console.log('data fetched',data);
                setVendors(data.vendors);
            }
            catch(error){
                console.log('error in fetching details:',error);
            }
           
        }
        fetchdata();
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
    <>
    <h1 className='font-bold text-black text-[24px] md:text-[30px] mx-4 md:mx-20'>Top Resturent chains in Hyderabad</h1>
    <div className='relative flex flex-col md:flex-row justify-between items-center gap-[20px] mx-4 md:mx-20 '>
     
     {
     vendors.map((vendor, index) => (
        <div key={vendor._id || index} className="  mb-6">
          {vendor.firm.map((firmItem) => (
            <div key={firmItem._id} className="relative hover:scale-90 transition-transform duration-500  mt-2" onClick={()=>handleFirm(firmItem.firmName,firmItem._id)}>
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
      </>
  )
}

export default Firms