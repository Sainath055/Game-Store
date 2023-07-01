"use client"

import DetailsSection from '@/components/DetailsSection';
import ImgsSection from '@/components/ImgsSection';
import { message } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Ring } from '@uiball/loaders'
import { useSession } from 'next-auth/react';
import '../../globals.css'
import Loading from './loading';


const page = ({ params }) => {
  const { data: session } = useSession()

  const router = useRouter();
  const pathname = usePathname();

  var userId = session && session.user.id
    
  const [hydrated, setHydrated] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [shareIcon , setShareIcon] = useState(true)
  const [heartIcon , setHeartIcon] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    setHydrated(true);
    // setLoading(true);
    fetch(`/api/product/${params.id.toString()}`, {method: "GET",})
        .then((res) => res.json())
        .then((data) => {
        setHeartIcon(data.saved.includes(String(userId)))
        setData(data);
        setLoading(false);
        });
  }, []);



  var prefix = process.env.NEXT_PUBLIC_BASE_URL
  var suffix = pathname
  var url = prefix + suffix

  const handleShare = () => {
    setShareIcon(false)
    navigator.clipboard.writeText(url)
    message.success('Link copied to clipboard')
    setTimeout(
      () => setShareIcon(true), 
      3000
    );
  }

  const handleFav = async () => {
    if(userId) {
      setLikeLoading(true)
      try {
        const response = await fetch(`/api/favourites/addToFav/${data._id.toString()}`, {
          method: "PATCH",
          body: JSON.stringify({
            userId: userId,
          }),
        });
        if (response.ok) {
          setHeartIcon(!heartIcon)
        }
      } catch (error) {
        console.log(error);
      } finally {
        message.success(!heartIcon?'Added to Favourites':'Removed from Favourites')
        setLikeLoading(false);
      }
    }else {
      router.push(`/auth`)
    }
  }



  if (!hydrated) {
      // Returns null on first render, so the client and server match
      return null;
  }
  if (isLoading) return <><Loading /></>
  if (!data) return <div className='text-white'>No product data with this ID...</div>;

  return (
    <>
    <div className='w-full h-max text-white flex 
    min-[900px]:flex-row flex-col min-[900px]:justify-center 
    min-[900px]:items-start items-center'>

      <div className='min-[900px]:max-w-[65%] w-full h-max 2xl:pl-[65px] 
      min-[900px]:pl-[40px] min-[900px]:pr-[15px] pt-6 min-[900px]:pb-10 pl-6 pr-6'>
        <ImgsSection images={data.images} description={data.description}
          mainImg={data.mainImg} videoLinkKey={data.videoLinkKey} />
      </div>

      <div className='xl:sticky xl:top-[70px] xl:right-0 min-[900px]:min-w-[35%] min-[900px]:max-w-[35%] w-full h-max 
        flex 2xl:flex-row flex-col 2xl:justify-start gap-x-6 
        2xl:pr-[65px] min-[900px]:pr-[40px] min-[900px]:pl-[15px] 
        min-[900px]:pt-6 min-[900px]:pb-10 pl-6 pr-6 '>
          <div className='w-full min-[900px]:max-w-[400px] h-max min-[900px]:bg-[#3f3f3fa6] 
          text-white rounded-[12px] py-4 min-[900px]:px-5 px-2'>
            <DetailsSection 
            userId={userId}
            id={data._id}
            mainImg={data.mainImg}
            title={data.title} 
            year={data.year}
            description={data.description}
            rating={data.rating}
            genre={data.genre} 
            platform={data.platform}
            price={data.price}
            discount={data.discount}
            library={data.library} />
          </div>

          
        <div className='2xl:w-max w-full h-max text-white 2xl:p-0 p-4
        flex flex-row 2xl:flex-col 2xl:gap-y-4 gap-x-4 items-center justify-evenly'>

          {!data?.library.includes(String(userId)) &&
            <button onClick={handleFav} disabled={likeLoading}
              className='w-[50px] h-[50px] flex items-center justify-center
              rounded-full bg-[#3f3f3fa6] hover:bg-[#aaaaaa99]'>
              {likeLoading ? 
              <Ring 
              size={20}
              lineWeight={4}
              speed={2} 
              color="white" 
              />
              :
              (!heartIcon ? 
                <svg className='w-[22px] h-[22px]' 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24">
                  <path fill="currentColor" 
                  d="m10.65 19.8l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.575.55-1.35.55t-1.35-.55Zm.4-13.05q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837q1.287 1.375 2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575q1.287-1.375 2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .537T12.95 6.75q-.175.25-.425.375T12 7.25q-.275 0-.525-.125t-.425-.375Zm.95 4.725Z"/>
                </svg>
                :
                <svg className='w-[22px] h-[22px]' 
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" 
                  d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29c2.64-1.8 5.9-.96 7.66 1.1c1.76-2.06 5.02-2.91 7.66-1.1c1.41.96 2.28 2.59 2.34 4.29c.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"></path>
                </svg>
                )
              }
            </button> 
          }

          <button onClick={handleShare} disabled={!shareIcon}
            className='w-[50px] h-[50px] flex items-center justify-center
            rounded-full bg-[#3f3f3fa6] hover:bg-[#aaaaaa99]'>
            {shareIcon ? 
              <svg className='w-[22px] h-[22px]'
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/>
              <path fill="currentColor" 
              d="M18.5 2a3.5 3.5 0 1 1-2.506 5.943L11.67 10.21c.213.555.33 1.16.33 1.79a4.99 4.99 0 0 1-.33 1.79l4.324 2.267a3.5 3.5 0 1 1-.93 1.771l-4.476-2.346a5 5 0 1 1 0-6.963l4.476-2.347A3.5 3.5 0 0 1 18.5 2Zm0 15a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3ZM7 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6Zm11.5-5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Z"/>
              </g></svg> 
              : 
              <svg className='w-[22px] h-[22px]'
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24">
                <path fill="currentColor" 
                d="M17.03 11.03a.75.75 0 1 0-1.06-1.06L11 14.94l-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5.5-5.5Zm-1.036-6.946A2.25 2.25 0 0 0 13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764l.008.084Zm0 .012L16 4.25c0-.052-.002-.103-.005-.154ZM10.25 6.5h3.5c.78 0 1.467-.397 1.871-1h2.129a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H6.25a.75.75 0 0 1-.75-.75V6.25a.75.75 0 0 1 .75-.75h2.129c.404.603 1.091 1 1.871 1Zm0-3h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5Z"></path>
              </svg>
            }
            
          </button>

          <button className='w-[50px] h-[50px] flex items-center justify-center
            rounded-full bg-[#3f3f3fa6] hover:bg-[#aaaaaa99]'>
            <svg className='w-[22px] h-[22px]'
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24">
              <path fill="currentColor" 
              d="m14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z"/>
            </svg>
          </button>
        </div>

      </div>
      
    </div>
    </>
  )
}

export default page