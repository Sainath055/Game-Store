"use client"

import React, { useEffect, useRef, useState } from 'react';
import Nav from '../../components/Nav.jsx'
import { BagProvider } from '@/context/BagContext.js';
import { useSession } from 'next-auth/react';
import HomeLayoutLoading from '@/utils/HomeLayoutLoading.js';
import { Codepen, Dribble, Github, Instagram, Linkedin, Twitter } from '@/assets/SocialLogos.jsx';


export default function homeLayout({ children }) {
  const { data: session } = useSession()
  var userId = session ? session.user.id : null

  const toTop = useRef();

  const [allbagData, setAllBagData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isDataLoaded, setDataLoaded] = useState(false); 

  const fetchBagData = async () => {
    try {
      const response = await fetch(`/api/bag/${userId.toString()}`, { method: "GET", }); 
      const data = await response.json();
        if (response.ok) {
          setAllBagData(data)
        }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
      setDataLoaded(true); 
    }
  }

  useEffect(() => {
    if(userId) {
      fetchBagData()
    } else {
      setLoading(false)
    }
  }, [userId]);

  const backToTop = () => {
    toTop.current.scrollIntoView({ behavior: 'smooth' });
  }


  if (userId ? (isLoading || !isDataLoaded) : isLoading) {
    // loading state
    return (
      <>
      <HomeLayoutLoading />
      </>
    )
  }


  return (
    <section className='bg-[#202020] w-full h-max min-h-[calc(100vh_-_70px)]'>
      <BagProvider initialBagData={allbagData}>
        <div className='w-full h-max fixed top-0 z-20'>
          <Nav userId={userId} userName={session && session.user.name} />
        </div>

        <div ref={toTop} className='w-full bg-blue-500 h-[10px]' ></div>

        <div className='w-full min-h-screen max-h-max mt-[60px]'>
          {children}
        </div>

        <div className='w-full h-max bg-[#2a2a2a] mt-[70px] text-[#e5e7e9] 
          shadow border-t border-gray-500 px-4 pt-6 pb-8
          flex flex-col items-center gap-y-7'>

          <div className='sm:w-[95%] w-full h-max flex items-center justify-between'>
            <div className='w-full h-max flex items-center sm:gap-x-4 gap-x-2'>
              <a href='https://github.com/Sainath055' 
              target='_blank' 
              className='w-max h-max cursor-pointer 
              hover:text-blue-500 duration-100 ease-in'>
                <Github />
              </a>
              <a href='https://www.instagram.com/sainathreddy055/' 
              target='_blank' 
              className='w-max h-max cursor-pointer 
              hover:text-blue-500 duration-100 ease-in'>
                <Instagram />
              </a>
              <a href='https://twitter.com/SainathReddy055' 
              target='_blank' 
              className='w-max h-max cursor-pointer 
              hover:text-blue-500 duration-100 ease-in'>
                <Twitter />
              </a>
              <a href='https://www.linkedin.com/in/sainath-reddy-0871b724b/' 
              target='_blank' 
              className='w-max h-max cursor-pointer 
              hover:text-blue-500 duration-100 ease-in'>
                <Linkedin />
              </a>
              <a href='https://dribbble.com/Sainath_Reddy055' 
              target='_blank' 
              className='w-max h-max cursor-pointer 
              hover:text-blue-500 duration-100 ease-in'>
                <Dribble />
              </a>
              <a href='https://codepen.io/sainath055' 
              target='_blank' 
              className='w-max h-max cursor-pointer 
              hover:text-blue-500 duration-100 ease-in'>
                <Codepen />
              </a>
            </div>
            <button onClick={backToTop} 
            className='w-max h-max hover:text-blue-500 duration-100 ease-in'>
              <svg xmlns="http://www.w3.org/2000/svg" 
              width="30px" height="30px" 
              viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 13.5l-3-3l-3 3"></path><path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z">
              </path></g></svg>
            </button>
          </div>

          <div className='sm:w-[95%] w-full h-max text-[14px] flex flex-col gap-y-1'>
            <p className='text-[15px] font-semibold '>Creator</p>
            <p className='text-[14px] '>
              Hello, I'm Sainath Reddy. This project showcases my dedication and skills 
              in building user-centric and accessible web applications. 
            </p>
            <p className='text-[14px] '>
              I am currently seeking for new opportunities, and I'm eager 
              to contribute my skills and creativity to a dynamic team. If you're 
              interested in exploring more of my work and learning about how I 
              can add value to your organization, please visit my <a 
              href='https://sainath055.github.io/' 
              target='_blank'
              className='w-max underline duration-100 ease-in
              hover:text-blue-500 text-[14px] font-semibold'>
                portfolio website</a>. Let's connect and create something amazing together.
            </p>
            <p className='text-[14px] '>
              E-mail - <a href='mailto:nathsai055@gmail.com' 
              className='w-max underline duration-100 ease-in
              hover:text-blue-500 text-[14px] font-semibold'>
                nathsai055@gmail.com</a>
            </p>
          </div>

          <div className='sm:w-[96%] w-full h-[0.8px] bg-gray-400'></div>

          <div className='sm:w-[95%] w-full h-max text-[14px] flex flex-col gap-y-1'>
            <p className='text-[15px] font-semibold '>Project Summary</p>
            <p className='text-[14px] '>
              GamesStore - A full stack application, with attractive UI. Its has all the 
              functionalities as of a real world E-commerce application. It has role based 
              authentication where you can login as admin or a user. Admin can create, 
              update, and delete products. User functionalities include add to cart, 
              add to favorites, edit user name, password and saved credit card data, 
              checkout, payments through stripe and finally users can view the order history. 
              It has a search functionality with filter and its completely mobile responsive.
            </p>
            <p className='text-[14px] '>
              Project source code - <a href='https://github.com/Sainath055/Game-Store' 
              target='_blank'
              className='w-max underline hover:text-blue-500 duration-100 ease-in'>
                Github</a>
            </p>
          </div>

        </div>

      </BagProvider>
    </section>
  );
}

{/* <button onClick={backToTop} >TO top</button> */}