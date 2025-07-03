import Image from 'next/image'
import React from 'react'

const Productsbar = () => {
    const itemdata=[{
    item_img:'/assests/bonda.jpg'
},
{
    item_img:'/assests/dosa.jpg'
},
{
    item_img:'/assests/idli.jpg'
},
{
    item_img:'/assests/juice.jpg'
},
{
    item_img:'/assests/pancake.jpg'
},
{
    item_img:'/assests/paratha.jpg'
},
{
    item_img:'/assests/poori.jpg'
},
{
    item_img:'/assests/vada.jpg'
}
]
  return (
    <div className='flex justify-between mt-10 mb-10 bg-white mx-4 md:mx-20'>
        {
            itemdata.map((item,index)=>(
                <div key={index} className=''>
                    <Image src={item.item_img} width={120} height={700} alt='food' />
                </div>
            ))
        }
    </div>
  )
}

export default Productsbar