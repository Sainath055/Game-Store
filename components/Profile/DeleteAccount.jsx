"use client"

import { message } from "antd";
import { signOut } from "next-auth/react";
import React,{ useState } from "react";

const DeleteAccount = ({userId}) => {

  const [showPopup, setShowPopup] = useState(false);
  const deleteUser = async () => {
    if(userId) {
      if(userId === "649d28ad12a2714867932e2a") {
        message.info(`Restricted for user@demo.com`)
      } else {
        message.loading('Please wait...').then(async ()=> {
          try {
            const response = await fetch(`/api/user/${userId.toString()}`, { method: "DELETE", }); 
            if (response.ok) {
              message.loading('Deleting & Signing out..',2.5)
              .then(() => signOut())
              .then(() => message.success(`Account successfully DELETED`, 2.5))
            }
          } catch (error) {
            console.log(error);
          }
        })
      }
    }

  }
  

  return (
    <>
      <button className='w-max h-max px-2.5 py-1 bg-[#505050] 
          rounded-[5px] text-[16px] hover:bg-[#d11b1b] duration-75 ease-linear'
        onClick={() => setShowPopup(true)}>
        Delete Account
      </button>
      {showPopup ? (
        <>
          <div className="justify-center items-center 
          flex overflow-hidden backdrop-blur-sm 
          cursor-default
          fixed inset-0 z-40 bg-black/50">
            <div className="relative w-auto pt-1
            mx-auto max-w-sm items-center 
            flex justify-center
            bg-red-600 rounded-lg">
            {/*icon*/}
            <div className="w-[70px] h-[70px]
            z-40 rounded-full items-center
            flex justify-center
            bg-red-600 absolute -top-8">
                <svg className="fill-current w-7 h-7
                    text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20">
                    <path d="M6 2l2-2h4l2 
                    2h4v2H2V2h4zM3 6h14l-1 
                    14H4L3 6zm5 2v10h1V8H8zm3 
                    0v10h1V8h-1z"/>
                </svg>
            </div>
            {/*icon*/}
              {/*content*/}
              <div className="border-0 rounded-b-md
              rounded-t-sm 
              shadow-lg relative flex flex-col w-full
               bg-[#212121] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center 
                justify-center p-5 pt-8">
                  <h3 className="text-[28px]
                  font-medium text-[#dcdcdc]">
                  Delete Account?
                  </h3>
                </div>
                {/*body*/}
                <div className="relative px-6
                text-[16px] text-gray-400 text-left
                w-full h-max ">
                Be advised, account deletion is final. 
                There will be no way to restore your account.
                You'll permanently loose your Profile & Games.
                </div>
                {/*footer*/}
                <div className="flex md:flex-row flex-col items-center my-4 p-3
                    justify-evenly gap-y-3 text-[#d1cdcd]">
                  <button onClick={() => setShowPopup(false)}
                    className='flex items-center w-max
                    px-4 py-2 rounded-md duration-75 ease-in
                    text-[14px] text-white
                    border-[1px] border-[#d1cdcd] font-medium
                    bg-[#3b3a3a] hover:bg-[#575656]'>
                    Nevermind
                  </button>
                  <button onClick={deleteUser}
                    className='flex items-center w-max
                    px-4 py-2 rounded-md duration-75 ease-in
                    text-[14px] border-[1px] border-[#d1cdcd] font-medium
                    hover:border-red-500 hover:text-red-500'>
                    Delete my account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default DeleteAccount;