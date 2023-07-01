"use client"

import FavCard from '@/components/FavCard'
import { BagContext } from '@/context/BagContext'
import { message } from 'antd'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Loading from './loading'


const favourites = () => {

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
          redirect(`/home`)
        }
    })

    var userId = session ? session.user.id : null
    // if(userId === null) { redirect(`/home`) }

    const { setBagData, bagData } = useContext(BagContext);

    const [favData, setFavData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const fetchFavData = async () => {
        try {
            const response = await fetch(`/api/favourites/${userId.toString()}`, { method: "GET", }); 
            const data = await response.json();
            if (response.ok) {
                setFavData(data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        if(userId) {
            fetchFavData()
        }
    }, [userId]);

    const handleRemoveBtn = async (prodId, title) => {
        try {
            const response = await fetch(`/api/favourites/${userId.toString()}?prodId=${JSON.stringify(prodId)}`, 
            { method: "DELETE", }); 
            if (response.ok) {
                setFavData(favData.filter((obj) => obj._id !== prodId));
                message.success(`${title} successfully Removed`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    
    const handleAddToBagBtn = async (prodId, title) => {
        try {
            const response = await fetch(`/api/bag/${userId.toString()}`, {
                method: "PATCH",
                body: JSON.stringify({
                productId: prodId,
                }),
            }); 
            if (response.ok) {
                setBagData([...bagData, prodId])
                message.success(`${title} is successfully added to Bag`)
            }
        } catch (error) {
            console.log(error);
        }
    } 

    if(isLoading) {
        return (
            <>
            <Loading />
            </>
        )
    }
    

  return (
    <>
    {favData.length === 0 ? 
        <div className='w-full h-max text-white flex items-center justify-center pt-6'>
            <p>Your favourites list is empty 😕</p>
        </div> 
      :
        <div className='w-full h-max text-white flex flex-col items-center gap-y-4 pt-6'>

            <div className='2xl:w-[87%] xl:w-[90%] lg:w-[92%] w-[85%] h-max 
            text-white xl:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] px-1'>
                Favourites list
            </div>

            <div className='2xl:w-[87%] xl:w-[90%] lg:w-[92%] w-[85%] h-max pb-8 grid lg:grid-cols-2 grid-cols-1 gap-4'>
                {favData.map((data,i)=>(
                    <div key={i} className='w-full h-max' >
                        <FavCard data={data} 
                        bagData={bagData}
                        handleRemoveBtn={handleRemoveBtn}
                        handleAddToBagBtn={handleAddToBagBtn} />
                    </div>
                ))}
            </div>
        </div>
    }
    </>

    
  )
}

export default favourites