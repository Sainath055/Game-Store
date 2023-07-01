"use client"

import ProdsSelect_Admin from '@/components/Admin_components/ProdsSelect_Admin'
import { List } from 'antd';
import React, {useEffect, useState} from 'react'
import { EditOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loader_Admin from '@/components/Admin_components/Loader_Admin';

const Banner = () => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/auth`)
    }
  })
  var userCheck = session && session.user.isAdmin

  const [isLoading, setLoading] = useState(true);
  
  const [goToSelect, setGoToSelect] = useState(0);
  const [allLessData, setAllLessData] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [sideSecList, setSideSecList] = useState([]);
  const [sideSecHeading, setSideSecHeading] = useState(null);

  const fetchProductsLessData = async () => {
    const response = await fetch("/api/banner&sideSec/products")
    const data = await response.json();

    setAllLessData(data);
  }

  const fetchTitles = async () => {
    const response = await fetch("/api/banner&sideSec")
    const data = await response.json();

    setBannerList(data[0].bannerTitles);
    setSideSecList(data[0].sideSecTitles)
    setSideSecHeading(data[0].sideHeading)
    setLoading(false)
  }

  useEffect(() => {
    if(userCheck) {
      fetchProductsLessData();
      fetchTitles()
    }
  }, [userCheck]);


  if (isLoading) {
    // loading state
    return (
      <>
        <Loader_Admin />
      </>
    )
  }
  

  return (
    <>
    {goToSelect === 0 ?
    <div className='pb-10'>
      <div className='mt-4 mb-2 w-full h-max flex items-center justify-between xl:px-14 lg:px-10 px-6'>
        <div className='md:text-[22px] text-[18px] font-semibold'>
          Banner List
        </div>
        <button onClick={()=>setGoToSelect(5)}
          className='px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg 
          text-white md:text-[16px] text-[14px] flex items-center'>
          <EditOutlined className='mr-1' />
          Change data
        </button>
      </div>
      <div className='xl:px-14 lg:px-10 px-6 '>
        <List style={{backgroundColor: 'white',}}
          bordered
          dataSource={bannerList}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </div>

      <div className='w-full h-[30px]'></div>

      <div className='my-4 w-full h-max flex items-center justify-between xl:px-14 lg:px-10 px-6'>
        <div className='md:text-[22px] text-[18px] font-semibold 
          flex md:flex-row flex-col items-center'>
          Side Section List
          {sideSecHeading ? 
            <div className='bg-gray-200 md:ml-2 w-max px-2.5 py-0.5 
              md:text-[16px] text-[14px] rounded-lg '>
              {sideSecHeading}
            </div> 
          : null}
        </div>
        <button onClick={()=>setGoToSelect(6)}
          className='px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg 
          text-white md:text-[16px] text-[14px] flex items-center'>
          <EditOutlined className='mr-1' />
          Change data
        </button>
      </div>
      <div className='xl:px-14 lg:px-10 px-6 '>
        <List style={{backgroundColor: 'white',}}
          bordered
          dataSource={sideSecList}
          renderItem={(item) => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
      </div>
    </div>
    :
    <div className='pb-6'>
      <ProdsSelect_Admin 
      adminId = {session.user.id}
      setBannerList={setBannerList} 
      setSideSecList={setSideSecList}
      setSideSecHeading={setSideSecHeading}
      allLessData={allLessData}
      sideSecHeading={sideSecHeading}
      goToSelect={goToSelect}
      setGoToSelect={setGoToSelect} />
    </div>
    }
    </>
  )
}

export default Banner