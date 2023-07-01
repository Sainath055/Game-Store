"use client"

import getPrice from '@/utils/getPrice'
import platformLogo from '@/utils/platformLogo'
import { message } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

const BagCard = ({data, setBagData, bagData, userId}) => {

  var productPrice = parseInt(getPrice(data.price, data.discount))

  const router = useRouter()

  const toProductDetails = ()=>{
    router.push(`/home/${data._id}`)
  }

  const removeFromBag = async () => {
    // Remove product from bagData
    try {
      const response = await fetch(`/api/bag/${userId.toString()}?productId=${JSON.stringify(data._id)}`, {
          method: "DELETE",
      }); 
      if (response.ok) {
        const updatedBag = bagData.filter((val) => val !== data._id);
        setBagData(updatedBag);
      }
    } catch (error) {
      console.log(error);
    } finally {
      message.success(`${data.title} is successfully removed from Bag`)
    }
  }; 

  return (
    <>
    <div className='w-full h-max text-white flex justify-start bg-[#3f3f3fa6] relative
      rounded-[12px] overflow-hidden border border-[#ffffff20] hover:border-[#ffffff3e]'>

        <button onClick={removeFromBag}
          className='absolute md:bottom-4 bottom-3 md:right-5 right-3 
          w-max h-max xl:px-3 md:px-2 px-1.5 xl:py-1.5 py-1 text-white 
          border border-[#ffffff60] hover:bg-[#aaaaaa99]
          rounded-lg sm:text-[16px] text-[14px] flex items-center justify-center'>
            Remove
            {/* <svg className='w-[18px] h-[18px]'
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z">
              </path>
            </svg> */}
        </button>

      <div className='w-[38%] h-max md:p-4 p-3 relative'>

        <div className=' absolute w-max h-max pl-1 pr-1.5 bg-[#585858c2] backdrop-blur-sm
          rounded-lg text-[16px] md:flex hidden items-center bottom-1 left-1.5 m-4'>
          <svg className='text-yellow-500 w-[20px] h-[20px]'
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"/></svg>
          {data.rating}
        </div>
        
        <img onClick={toProductDetails} src={data.mainImg} className='w-full aspect-[16/9] h-max 
        rounded-[8px] cursor-pointer'/>
      </div>

      <div className='w-[62%] min-h-full max-h-max md:py-4 py-3 md:pr-4 pr-3 pl-1 flex flex-col justify-between'>
        <div>
          <p onClick={toProductDetails} className='md:text-[20px] sm:text-[18px] text-[16px] 
          text-ellipsis line-clamp-1 hover:underline 
          font-medium cursor-pointer w-full h-max'>{data.title}</p>

          <div className='w-full h-max md:flex hidden flex-wrap gap-2 mt-3'>
            {data.genre.map((each, i) => {
            return <div key={i} 
            className='bg-[#515151a6] w-max h-max whitespace-nowrap	
            text-[12px] rounded-lg text-gray-200
            px-2.5 py-0.5'> {each} </div> })} 
          </div>
        </div>

        <div className='w-full h-max xl:flex hidden space-x-2 ml-1'>
          {data.platform.map((each, i) => {
          return <div key={i} className='w-max h-max' > 
          {platformLogo(each)} </div> })} 
        </div>

        {/* <div className='w-max h-max pl-1 pr-1.5 bg-[#585858c2] backdrop-blur-sm
          rounded-lg text-[16px] flex items-center'>
          <svg className='text-yellow-500 w-[20px] h-[20px]'
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"/></svg>
          {data.rating}
        </div> */}

        <div className='flex items-center justify-start w-full h-max gap-x-1.5'>
          <p className='text-white w-max h-max text-[14px] px-1.5 py-0.5 sm:block hidden 
            rounded-md bg-[#585858c2] font-medium'>-{data.discount}%</p>

            <p className='text-[14px] line-through text-gray-400 sm:block hidden '>
            ₹{data.price.toLocaleString('en-US')}</p>

          <p className='sm:text-[20px] text-[14px] font-medium '>
            ₹{productPrice.toLocaleString('en-US')}</p>
        </div>

      </div>
    </div>
    </>
  )
}

export default BagCard