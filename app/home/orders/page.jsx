"use client"

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import '../../globals.css'
import { DownloadIcon, MultiplySymbol } from '@/assets/LogoSvgs'
import OrderDetails from '@/components/Order_Details/OrderDetails'
import Loading from './loading'
import { redirect } from 'next/navigation'

const Orders = () => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/home`)
    }
  })

  var userId = session ? session.user.id : null

  const [ordersData, setOrdersData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [sortedData, setSortedData] = useState(null);
  const [selectedSort, setSelectedSort] = useState('All');

  const [orderDetails, setOrderDetails] = useState(null);
  const [openViewDiv, setOpenViewDiv] = useState(false)

  const fetchOrdersData = async () => {
    try {
        const response = await fetch(`/api/orders/${userId.toString()}`, { method: "GET", }); 
        const data = await response.json();
        if (response.ok) {
          setOrdersData(data)
          setSortedData(data)
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false)
    }
  }
    
  useEffect(() => {
      if(userId) {
        fetchOrdersData()
      }
  }, [userId]);

  if(isLoading) {
    return (
      <>
      <Loading />
      </>
    )
  }

  function getPaymentStatusDiv(paymentStatus) {
    const isSuccess = paymentStatus === 'Payment successful';
    const statusClass = isSuccess ? 'bg-green-600' : 'bg-red-600';
  
    return (
      <div className={`w-max h-max px-2 py-0.5 rounded-[8px] font-medium text-[16px] ${statusClass}`}>
        {isSuccess ? 'Succeeded' : 'Failed'}
      </div>
    );
  }
  
  const handleRadioChange = (event) => {
    setSelectedSort(event.target.value);
    if (event.target.value === 'Succeeded') {
      const filteredData = ordersData.filter((item) => item.paymentStatus === 'Payment successful');
      setSortedData(filteredData);
    } else if (event.target.value === 'Failed') {
      const filteredData = ordersData.filter((item) => item.paymentStatus != 'Payment successful');
      setSortedData(filteredData);
    } else {
      const filteredData = ordersData
      setSortedData(filteredData);
    }
  };

  const handleViewDetails = (data) => {
    setOrderDetails(data)
    setOpenViewDiv(true)
  }

  const closeViewDetails = () => {
    setOpenViewDiv(false)
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
    {ordersData.length === 0 ? 
      <div className='w-full h-max text-white flex items-center justify-center pt-6'>
          <p>No orders</p>
      </div> 
      :
      <div className='w-full h-max text-white flex flex-col items-center gap-y-4 pt-6'>

        <div className={'fixed top-0 right-0 bottom-0 z-20 w-full h-screen flex bg-[#272727c0] '+
        (openViewDiv ? ' translate-x-[0%] ' : ' translate-x-[120%] ')}>
          <div onClick={closeViewDetails}
          className='sm:w-[calc(100%_-_550px)] w-0 sm:block hidden h-screen
          backdrop-blur-[1px]'>
          </div>
          <div className={'sm:w-[550px] w-full h-screen bg-[#3f3f3f] relative duration-200 ease-in-out '+
            (openViewDiv ? ' translate-x-[0%] ' : ' translate-x-[120%] ')}>
            <button onClick={closeViewDetails}
            className='w-max h-max absolute top-2 -left-[60px] sm:flex hidden 
            p-2.5 rounded-full bg-[#7a7a7acd]'>
              <MultiplySymbol />
            </button>
            <OrderDetails data={orderDetails} closeViewDetails={closeViewDetails} scrollToBottom={scrollToBottom} />
          </div>
        </div>

        <div className='2xl:w-[87%] xl:w-[90%] lg:w-[92%] w-[85%] h-max 
        text-white xl:text-[26px] md:text-[24px] sm:text-[22px] text-[20px] px-1
        flex min-[500px]:flex-row flex-col min-[500px]:items-center justify-between gap-y-2'>
          <p>Transactions</p>
          <div className='radio-inputs md:text-[16px] sm:text-[14px] text-[12px]'>
            <label className="radio">
              <input
                type="radio"
                name="radio"
                value="All"
                checked={selectedSort === 'All'}
                onChange={handleRadioChange}
              />
              <span className="name">All</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="radio"
                value="Succeeded"
                checked={selectedSort === 'Succeeded'}
                onChange={handleRadioChange}
              />
              <span className="name">Succeeded</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="radio"
                value="Failed"
                checked={selectedSort === 'Failed'}
                onChange={handleRadioChange}
              />
              <span className="name">Failed</span>
            </label>
          </div>
        </div>

        <div className='2xl:w-[87%] xl:w-[90%] lg:w-[92%] w-[85%] h-max pb-8 flex flex-col gap-y-4'>

          <div className='w-full h-max bg-[#282828cd] rounded-[12px] border-[1px] border-[#ffffff60] 
            md:flex hidden items-center justify-around px-3 py-3 font-medium'>
              <div className='xl:w-[70%] lg:w-[60%] md:w-[50%] w-full flex items-center justify-between'>
                <div className='w-[95px] lg:block hidden'>Order Id</div>
                <div className='w-[100px]'>Date</div>
                <div className='w-[80px]'>Price</div>
                <div className='w-[100px] xl:block hidden'>Method</div>
                <div className='w-[100px]'>Payment</div>
              </div>
              <div className='md:w-max w-full flex items-center md:gap-x-4 justify-center relative'>
                <p className='w-max absolute'>Actions</p>
                  <button className='w-max h-max bg-[#60606000] px-3 py-1 opacity-0 -z-10 cursor-auto 
                    border border-[#ffffff00] rounded-lg text-[18px] flex items-center gap-x-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width="20" height="20" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                    d="M3 15c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h6c2.828 0 4.243 0 5.121-.879C21 19.243 21 17.828 21 15M12 3v13m0 0l4-4.375M12 16l-4-4.375">
                    </path>
                    </svg>
                    Get Invoice
                  </button>
                  <button className='w-max h-max bg-[#60606000] hover:bg-[#78787800] -z-10 px-3 py-1 opacity-0 cursor-auto
                    border border-[#ffffff00] rounded-lg text-[18px] flex items-center gap-x-1'>
                    View Details
                  </button>
                </div>
          </div>

          {sortedData.map((data, i)=>{
            const amountPaid = data.products.reduce((total, product) => total + product.price, 0);
            return(
              <div key={i} className='w-full h-max bg-[#3f3f3fa6] rounded-[12px] 
              flex md:flex-row md:gap-y-0 flex-col gap-y-4 items-center justify-around 
              md:px-3 min-[500px]:px-4.5 px-3 py-3'>
                <div className='xl:w-[70%] lg:w-[60%] md:w-[50%] w-full 
                md:flex md:flex-row md:gap-0 grid min-[500px]:grid-cols-2 gap-4 md:items-center justify-between'>
                  <div className='md:w-[95px] w-max uppercase lg:block md:hidden flex'>
                    <p className='mr-1 normal-case md:hidden'>Order Id:</p>{data._id.slice(0,8)}
                  </div>
                  <div className='md:w-[100px] flex md:justify-start min-[500px]:justify-end'>
                    <p className='mr-1 md:hidden'>Date:</p>{moment(data.createdAt).format("D-MM-YYYY")}
                  </div>
                  <div className='md:w-[80px] w-max flex'>
                    <p className='mr-1 md:hidden'>Price:</p>₹{amountPaid}
                  </div>
                  <div className='w-[100px] xl:block hidden'>Credit Card</div>
                  <div className='md:w-[100px] flex md:justify-start min-[500px]:justify-end'>
                    <p className='mr-1 md:hidden'>Payment:</p>{getPaymentStatusDiv(data.paymentStatus)}
                  </div>
                </div>
                <div className='md:w-max w-full flex items-center md:gap-x-4 justify-between'>
                  <button onClick={scrollToBottom}
                  className='w-max h-max bg-[#60606000] hover:bg-[#5757579a] px-3 py-1 
                    border border-[#ffffff60] rounded-lg text-[18px] flex items-center gap-x-1'>
                    <DownloadIcon />
                    Get Invoice
                  </button>
                  <button onClick={()=>handleViewDetails(data)}
                    className='w-max h-max bg-[#606060d7] hover:bg-[#787878d7] px-3 py-1 
                    border border-[#ffffff60] rounded-lg text-[18px] flex items-center gap-x-1'>
                    View Details
                  </button>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    }
    </>
  )
}

export default Orders