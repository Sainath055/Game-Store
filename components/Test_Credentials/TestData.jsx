"use client"

import { MultiplySymbol, MultiplySymbol_30 } from "@/assets/LogoSvgs";
import React,{ useState } from "react";

const TestData = () => {

  const [showPopup, setShowPopup] = useState(false);

  
  return (
    <>
      <button onClick={() => setShowPopup(true)}
      className='text-blue-500 absolute right-0 w-max h-max animate-bounce'>
          <svg xmlns="http://www.w3.org/2000/svg" 
          width="28px" height="28px" 
          viewBox="0 0 512 512"><path fill="currentColor" d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200s200-89.72 200-200S366.28 56 256 56Zm0 82a26 26 0 1 1-26 26a26 26 0 0 1 26-26Zm64 226H200v-32h44v-88h-32v-32h64v120h44Z"></path></svg>
      </button>
      {showPopup ? (
        <>
          <div className="justify-center items-center 
          flex overflow-hidden backdrop-blur-[1px]
          fixed inset-0 z-40 bg-black/50">
            <div className="sm:w-[400px] w-full h-max bg-[#f8f6f6] text-gray-800 
            rounded-lg duration-150 ease-linear p-4 flex flex-col gap-y-5">
              <div className="w-full h-max flex items-center justify-between">
                <p className="text-[20px] text-gray-900">
                  Test Credentials
                </p>
                <button onClick={() => setShowPopup(false)}>
                  <MultiplySymbol_30 />
                </button>
              </div>

              <div className="w-full h-max flex text-[16px]
              flex-col items-center justify-center gap-2">
                <p className="text-[18px] font-medium">User</p>
                <p>Email: user@demo.com</p>
                <p>Password: 123456</p>
              </div>

              <div className="w-full h-max flex text-[16px]
              flex-col items-center justify-center gap-2">
                <p className="text-[18px] font-medium">Admin</p>
                <p>Email: admin@demo.com</p>
                <p>Password: 123456</p>
              </div>

              <div className="w-full h-max p-3 bg-[#e5e4e4] rounded-md text-[16px]">
                <p>
                  <span className="text-[18px] font-medium">Note: </span>
                  Some Actions a restricted for these demo accounts for the data maintenance.
                </p>
              </div>

              <div className="w-full h-max p-3 bg-[#e5e4e4] rounded-md 
              text-[16px] text-center">
                <p>
                  Any queries contact - 
                  <span className="font-medium underline hover:text-blue-600">
                    <a href='mailto:nathsai055@gmail.com'>Sainath Reddy</a>
                  </span>
                </p>
              </div>

            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default TestData;