"use client"

import React, { useEffect, useState } from "react"
import '../globals.css'
import { useSession, } from "next-auth/react"
import { redirect } from "next/navigation"
import { Carousel } from "antd"
import CarouselCard from "@/components/CarouselCard"
import SideSectionCard from "@/components/SideSectionCard"
import ProductCard from "@/components/ProductCard"
import HomeLoading from "@/utils/HomeLoading"
import Link from "next/link"

const Home = () => {

  const { data: session } = useSession()
  var userId = session && session.user.id

  var adminCheck = session ? session.user.isAdmin : false
  if(adminCheck) {
      redirect('/admin') 
  }

  const [isLoading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [bannerProducts, setBannerProducts] = useState([]);
  const [sideSecProducs, setsideSecProducs] = useState([]);
  const [sideHeading, setSideHeading] = useState('');

  const fetchProductsForAll = async () => {
    const response = await fetch("/api/home");
    const data = await response.json();

    setAllProducts(data.allProducts)
    setBannerProducts(data.bannerProducts)
    setsideSecProducs(data.sideSecProducts)
    setSideHeading(data.sideSecHeading)
    setLoading(false)
  }
  
  useEffect(() => {
    fetchProductsForAll();
  }, []);

  if (isLoading) {
    // loading state
    return (
      <>
      <HomeLoading />
      </>
    )
  }

  return (
    <div className="w-full min-h-screen h-max m-0 flex justify-between">
      <div className="xl:w-[76%] w-[100%] h-max flex flex-col">
        <div className="w-full h-max overflow-hidden
        text-white min-[950px]:block hidden pt-6 px-5">
          <Carousel autoplay={true} >
            {bannerProducts.map((data,i)=>(
              <div key={i} >
                <CarouselCard data={data} userId={userId}/>
              </div>
            ))}
          </Carousel>
        </div>
        
        <div className="w-full h-max flex flex-col gap-y-4 px-6 py-6">
          <p className="text-[#f8f6f6] min-[950px]:hidden block">Featured Games</p>
          <div className="min-[950px]:hidden grid xl:grid-cols-3 sm:grid-cols-2 gap-4" >
            {bannerProducts.map((data,i)=>(
              <div key={i} >
                <ProductCard data={data} userId={userId}/>
              </div>
            ))} 
          </div>
          <p className="text-[#f8f6f6] xl:hidden block">{sideHeading}</p>
          <div className="xl:hidden grid xl:grid-cols-3 sm:grid-cols-2 gap-4" >
            {sideSecProducs.map((data,i)=>(
              <div key={i} >
                <SideSectionCard data={data} userId={userId}/>
              </div>
            ))} 
          </div>
          <p className="text-[#f8f6f6] min-[950px]:hidden block">All Games</p>
          <div className="hidden min-[950px]:grid xl:grid-cols-3 sm:grid-cols-2 gap-4" >
            {allProducts.map((data,i)=>(
              <div key={i} >
                <ProductCard data={data} userId={userId}/>
              </div>
            ))} 
          </div>
          <div className="min-[950px]:hidden grid xl:grid-cols-3 sm:grid-cols-2 gap-4" >
            {allProducts.map((data,i)=>(
              <div key={i} >
                <SideSectionCard data={data} userId={userId}/>
              </div>
            ))} 
          </div>
          <div 
          className="w-full h-max flex items-center justify-center text-[#f8f6f6]">
            <Link href={`/home/search`}
            className="w-max h-max bg-[#606060b5] hover:bg-[#787878d7] px-3 py-1 
            border border-[#ffffff60] rounded-md text-[18px] mt-2">
              View All
            </Link>
          </div>
        </div>
      </div>

      <div className="xl:w-[24%] w-[0%] h-max xl:flex flex-col hidden sticky top-[70px] right-0">
        <div className="sideSecConDiv flex flex-col gap-y-4 py-6 pr-6 pl-3 " >
          <p className=" w-full h-max text-white text-[22px] ml-[2px]">{sideHeading}</p>
          {sideSecProducs.map((data,i)=>(
            <div key={i} >
              <SideSectionCard data={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

