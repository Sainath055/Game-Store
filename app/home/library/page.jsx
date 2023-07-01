"use client"


import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Loading from './loading'
import { redirect } from 'next/navigation'

const Library = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/home`)
    }
  })
  var userId = session ? session.user.id : null

  const [libraryData, setLibraryData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchLibraryData = async () => {
    try {
        const response = await fetch(`/api/library/${userId.toString()}`, { method: "GET", }); 
        const data = await response.json();
        if (response.ok) {
          setLibraryData(data)
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false)
    }
  }
    
  useEffect(() => {
      if(userId) {
        fetchLibraryData()
      }
  }, [userId]);

  if(isLoading) {
    return (
      <>
      <Loading />
      </>
    )
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
    {libraryData.length === 0 ? 
        <div className='w-full h-max text-white flex items-center justify-center pt-6'>
            <p>Your library is empty 😕</p>
        </div> 
      :
        <div className='w-full h-max text-white flex flex-col items-center gap-y-4 pt-6'>
            <div className='2xl:w-[87%] xl:w-[90%] lg:w-[92%] w-[85%] h-max 
            text-white xl:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] px-1'>
                My Games
            </div>

            <div className='2xl:w-[87%] xl:w-[90%] lg:w-[92%] w-[85%] h-max pb-8 
            grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                {libraryData.map((data,i)=>(
                  <div key={i} className='totalCardDiv w-full h-max flex flex-col gap-y-2 duration-75 ease-linear
                    border border-[#ffffff20] hover:border-[#ffffff45] hover:bg-[#45454520] p-3 rounded-[12px]' >
                    <img src={data.mainImg} className='w-full aspect-[16/9] h-max rounded-[12px]' />
                    <div className='w-full h-max flex items-center justify-between px-1'>
                      <p className='w-[88%] h-max text-[18px] text-ellipsis line-clamp-1'>{data.title}</p>
                      <button onClick={scrollToBottom}
                      className='w-max h-max rounded-lg px-3 py-2
                        flex items-center justify-center bg-[#505050c0] hover:bg-[#aaaaaa99]'>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="23" height="23" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                        d="M3 15c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h6c2.828 0 4.243 0 5.121-.879C21 19.243 21 17.828 21 15M12 3v13m0 0l4-4.375M12 16l-4-4.375">
                        </path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
        </div>
    }
    </>
  )
}

export default Library