"use client"

import CardList from '@/components/Profile/CardList'
import Password from '@/components/Profile/Password'
import Username from '@/components/Profile/Username'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loading from './loading'
import DeleteAccount from '@/components/Profile/DeleteAccount'

const Profile = () => {
    const { data: session, status, update  } = useSession({
      required: true,
      onUnauthenticated() {
        redirect(`/home`)
      }
    })

    var userId = session ? session.user.id : null


    const [selectedTab, setSelectedTab] = useState(1);
    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${userId.toString()}`, { method: "GET", }); 
        const data = await response.json();
          if (response.ok) {
            setUserData(data)
          }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
  
    useEffect(() => {
      if(userId) {
        fetchUserData()
      }
    }, [userId]);

    if(isLoading) {
      return (
        <>
        <Loading />
        </>
      )
    }

  return (
    <div className='w-full max-h-max min-h-screen
      flex items-center justify-center text-white'>

      <div className='2xl:w-[40%] xl:w-[50%] lg:w-[60%] md:w-[70%] w-[90%] h-max
      flex flex-col items-center justify-center text-white gap-y-4'>

        <div className='w-full h-max flex sm:flex-row 
        flex-col sm:gap-y-0 gap-y-2 
        items-center justify-between'>
          <div className='flex items-center justify-center gap-x-4 sm:w-max w-full h-max'>
            <div className='w-[53px] h-[53px] uppercase
              flex items-center justify-center text-[22px] font-medium
              rounded-full bg-[#505050] '>
              {userData.name.charAt(0)}
            </div>
            <div className='w-max h-max flex flex-col justify-center'>
              <p className='w-max max-w-[250px] h-max text-[20px] text-ellipsis line-clamp-1'>{userData.name}</p>
              <p className='w-max h-max text-[14px] text-gray-400'>
                {selectedTab === 1 ? 
                'Update your username' : 
                (selectedTab === 2 ?
                 'Change password' : 
                 'Manage your cards')}
              </p>
            </div>
          </div>
          <DeleteAccount userId={userId} />
        </div>

        <div className='sm:w-[80%] w-full h-max flex items-center justify-evenly mb-4'>
          <button onClick={()=> setSelectedTab(1)}
          className={'w-max h-max px-3 py-1 border-b-2 ' +  
          ' duration-75 ease-linear '+
          (selectedTab === 1 ? ' text-white border-[#cecece] ' 
          : ' text-gray-400 hover:text-gray-300 border-transparent hover:border-[#888888] ')}>
            Username
          </button>
          <button onClick={()=> setSelectedTab(2)}
          className={'w-max h-max px-3 py-1 border-b-2 ' +  
          ' duration-75 ease-linear '+
          (selectedTab === 2 ? ' text-white border-[#cecece] ' 
          : ' text-gray-400 hover:text-gray-300 border-transparent hover:border-[#888888] ')}>
            Password
          </button>
          <button onClick={()=> setSelectedTab(3)}
          className={'w-max h-max px-3 py-1 border-b-2 ' +  
          ' duration-75 ease-linear '+
          (selectedTab === 3 ? ' text-white border-[#cecece] ' 
          : ' text-gray-400 hover:text-gray-300 border-transparent hover:border-[#888888] ')}>
            Card List
          </button>
        </div>

        <div className='w-full h-[330px] overflow-hidden
        flex justify-center'>
          {selectedTab === 1 ? 
          <Username email={userData.email} userName={userData.name} 
          id={userId} setUserData={setUserData} update={update} /> 
          :
          (selectedTab === 2 ? 
          <Password id={userId} googleUser={session.user.googleAccount} /> 
          : 
          <CardList id={userId} 
          userData={userData}
          setUserData={setUserData}  /> )
          }
        </div>

      </div>
    </div>
  )
}

export default Profile