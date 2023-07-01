"use client"

import React, { useContext, useEffect, useId, useState } from 'react';
import { BagContext } from '@/context/BagContext';
import BagCard from '@/components/BagCard';
import { useSession } from 'next-auth/react';
import SummaryCard from '@/components/SummaryCard';
import getPrice from '@/utils/getPrice';
import { redirect } from 'next/navigation';
import Loading from './loading';

const bag = () => { 
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/home`)
    }
  })
  var userId = session ? session.user.id : null

  // if(!session) {
  //   if(userId === null){
  //     redirect('/home') 
  //   }
  // }

  const { setBagData, bagData } = useContext(BagContext);

  const [allbagItemsData, setAllbagItemsData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchBagItemsData = async () => {
    try {
      const response = await fetch(`/api/bag?bagData=${JSON.stringify(bagData)}`, 
      { method: "GET", }); 
      const data = await response.json();
        if (response.ok) {
          setAllbagItemsData(data)
        }
    } catch (error) {
      console.log(error); 
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(userId) {
      if(bagData?.length > 0) {
      fetchBagItemsData()
      } else {
        setLoading(false)
      }
    }
  }, [bagData, userId]);

  if (isLoading) {
    // Rendering a loader while fetching the bag data
    return (
      <>
      <Loading />
      </>
    )
  }

  // const extractedSummary = allbagItemsData.map(item => {
  //   const finalAmount = parseInt(getPrice(item.price,item.discount))
    
  //   return {
  //     price: item.price,
  //     discount: item.discount,
  //     finalPrice: finalAmount,
  //     _id: item._id,
  //     title: item.title,
  //     mainImg: item.mainImg,
  //   }
  // });


  return (
    <>
    {bagData.length > 0 ? 
      <div className='w-full h-max flex min-[980px]:flex-row flex-col min-[980px]:items-start items-center 
      justify-center lg:gap-x-6 gap-x-4'>
        <div className='lg:w-[60%] min-[980px]:w-[65%] sm:w-[80%] w-[90%] h-max flex flex-col gap-y-4'>
          <div className='w-full h-max text-white text-[26px] px-1 pt-6'>
            Bag Items {bagData.length}
          </div>
          {allbagItemsData.map((data,i)=>(
            <div key={i} >
              <BagCard data={data}
              bagData={bagData} 
              setBagData={setBagData} 
              userId={userId&&userId||null} />
            </div>
          ))}
        </div>
        <div className='lg:w-[26%] min-[980px]:w-[28%] sm:w-[80%] w-[90%] h-max flex flex-col gap-y-4 sticky top-[70px]'>
          <div className='w-full h-max text-white text-[26px] px-1 pt-6'>
            Summary
          </div>
          <SummaryCard extractedSummary = {
            allbagItemsData.map(item => {
              const finalAmount = parseInt(getPrice(item.price,item.discount))
                return {
                  price: item.price,
                  discount: item.discount,
                  finalPrice: finalAmount,
                  _id: item._id,
                  title: item.title,
                  mainImg: item.mainImg,
                }
              })
            } />
        </div>
      </div>
      :
      <div className='w-full h-max text-white flex items-center justify-center pt-6'>
        Your bag is empty 😕
      </div>
    }
    </>
  )
}

export default bag