"use client"

import Loader_Admin from "@/components/Admin_components/Loader_Admin";
import { useEffect, useState } from "react";

export default function adminHome() {

  const [isLoading, setLoading] = useState(true);
  const [ordersData, setOrdersData] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [usersData, setUsersData] = useState(null);

  const fetchAllData = async () => {
    try {
        const response = await fetch(`/api/dashboard`, { method: "GET", },{ cache: 'no-store' }); 
        const data = await response.json();
        if (response.ok) {
          setOrdersData(data.allOrders)
          setProductsData(data.allProducts)
          setUsersData(data.allUsers)
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  if (isLoading) {
    // loading state
    return (
      <>
        <Loader_Admin />
      </>
    )
  }

  
  const genreCount = {};
  const platformCount = {};

  let successCount = 0;
  let failedCount = 0;

  let userCount = 0;
  let googleUserCount = 0;



  productsData?.forEach((product) => {
    product.genre.forEach((genre) => {
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });

    product.platform.forEach((platform) => {
      platformCount[platform] = (platformCount[platform] || 0) + 1;
    });
  });

  ordersData?.forEach((order) => {
    if (order.paymentStatus === "Payment successful") {
      successCount++;
    } else {
      failedCount++;
    }
  });

  usersData?.forEach((user) => {
    if (user.isAdmin === false) {
      if (user.googleAccount) {
        googleUserCount++;
      } else {
        userCount++;
      }
    } 
  });


  return (
    <>
    <div className='w-full h-max flex flex-col items-center gap-y-4 p-6' >

      <div className="w-full h-max bg-[#f1eeee] rounded-lg p-4 
        flex flex-col gap-y-4">
        <p className="w-full h-max text-[18px] font-medium">
          Products {productsData.length}
        </p>
        <div className="w-full h-max flex flex-wrap gap-3">
          {Object.entries(genreCount).map(([genre, count], i) => (
            <div key={i} className="w-max h-max px-2.5 py-1 text-[14px]
            flex items-center gap-x-1 bg-[#e5e3e3] rounded-md">
              <p>{genre}</p>
              <p>-</p>
              <p>{count}</p>
            </div>
          ))}
        </div>
        <div className="w-full h-max flex flex-wrap gap-3">
          {Object.entries(platformCount).map(([platform, count], i) => (
            <div key={i} className="w-max h-max px-2.5 py-1 text-[14px]
            flex items-center gap-x-1 bg-[#e5e3e3] rounded-md">
              <p>{platform}</p>
              <p>-</p>
              <p>{count}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex md:flex-row flex-col md:items-center gap-4">
        <div className="w-full h-max bg-[#f1eeee] rounded-lg p-4
        flex flex-col gap-y-4">
          <p className="w-full h-max text-[18px] font-medium">
            Orders {ordersData.length}
          </p>
          <div className="w-full h-max flex flex-wrap gap-3">
            <div className="w-max h-max px-2.5 py-1 text-[14px]
            flex items-center gap-x-1 bg-[#e5e3e3] rounded-md">
              <svg className=' text-green-500 '
              xmlns="http://www.w3.org/2000/svg" width="22" height="22" 
              viewBox="0 0 1024 1024"><path fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z">
              </path></svg>
              <p>Success</p>
              <p>-</p>
              <p>{successCount}</p>
            </div>
            <div className="w-max h-max px-2.5 py-1 text-[14px] 
            flex items-center gap-x-1 bg-[#e5e3e3] rounded-md">
              <svg className=' text-red-500 '
              xmlns="http://www.w3.org/2000/svg" width="22" height="22" 
              viewBox="0 0 512 512"><path fill="currentColor"
              d="M256 33C132.3 33 32 133.3 32 257s100.3 224 224 224 224-100.3 224-224S379.7 33 256 33zm108.3 299.5c1.5 1.5 2.3 3.5 2.3 5.6 0 2.1-.8 4.2-2.3 5.6l-21.6 21.7c-1.6 1.6-3.6 2.3-5.6 2.3-2 0-4.1-.8-5.6-2.3L256 289.8l-75.4 75.7c-1.5 1.6-3.6 2.3-5.6 2.3-2 0-4.1-.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6 0-2.1.8-4.2 2.3-5.6l75.7-76-75.9-75c-3.1-3.1-3.1-8.2 0-11.3l21.6-21.7c1.5-1.5 3.5-2.3 5.6-2.3 2.1 0 4.1.8 5.6 2.3l75.7 74.7 75.7-74.7c1.5-1.5 3.5-2.3 5.6-2.3 2.1 0 4.1.8 5.6 2.3l21.6 21.7c3.1 3.1 3.1 8.2 0 11.3l-75.9 75 75.6 75.9z">
              </path></svg>
              <p>Failed</p>
              <p>-</p>
              <p>{failedCount}</p>
            </div>
          </div>

        </div>

        <div className="w-full h-max bg-[#f1eeee] rounded-lg p-4
        flex flex-col gap-y-4">
          <p className="w-full h-max text-[18px] font-medium">
            Users {userCount+googleUserCount}
          </p>
          <div className="w-full h-max flex flex-wrap gap-3">
            <div className="w-max h-max px-2.5 py-1 text-[14px]
            flex items-center gap-x-1 bg-[#e5e3e3] rounded-md">
              <p>Normal Accounts</p>
              <p>-</p>
              <p>{userCount}</p>
            </div>
            <div className="w-max h-max px-2.5 py-1 text-[14px] 
            flex items-center gap-x-1 bg-[#e5e3e3] rounded-md">
              <p>Google Accounts</p>
              <p>-</p>
              <p>{googleUserCount}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}