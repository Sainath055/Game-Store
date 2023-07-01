"use client"

import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { signIn, useSession } from "next-auth/react"
import { message } from 'antd';
import TestData from '@/components/Test_Credentials/TestData';
import Google from 'next-auth/providers/google';

export default function auth() {
    const { data: session } = useSession()

    var userData = session
    if(userData) {
        redirect(userData.user.isAdmin ? '/admin' : '/home')
    }

    var initialState = { name: '', email: '', password: '',confirmPassword: '' }

    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [showConPass, setShowConPass] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const [passMatch, setPassMatch] = useState(false);
  
    const handleShowPassword = () => {
      setShowPassword((prevshowPassword) =>
      !prevshowPassword);
    };

    const handleShowConPass = () => {
        setShowConPass((prevshowPassword) =>
        !prevshowPassword);
      };
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isSignup){
            if(formData.password != formData.confirmPassword){
                message.warning(`passwords does not match!`)
                setPassMatch(true)
            } else {
                auth('Sign_Up')
            }
        } else {
            auth('Sign_In')
        }
    };

    async function auth(provider_path) {

        const status = await signIn(provider_path, {
            redirect: false,
            email: formData.email,
            password: formData.password,
            name: formData.name,
            callbackUrl: "/"
        })

        if(status.error === null) {
            if(isSignup){
                message.success(`Account successfully created`) 
            } else {
                message.success(`Login successful`) 
            }
            
        }else {
            message.info(`${status.error}`)
        }
    }
    
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value })
    };
  
    const switchMode = () => {
      setIsSignup((previsSignup) =>
      !previsSignup);
      setShowPassword(false);
    };



    return (
        <>
        <div className='w-full min-h-screen h-max bg-[#202020]
        flex justify-center items-center relative'>

        <div className='auth_bg_image'></div>
        
        <div className='bg-[#f8f6f6] flex flex-col 
            duration-100 ease-linear z-10
            items-center sm:shadow-lg sm:rounded-lg
            sm:w-[400px] w-full p-6 h-max sm:mt-5'>

            <div className='w-full h-max flex items-center justify-center relative'>
                <h2 className="font-bold text-[28px]
                    text-gray-800">
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </h2>
                <p className='text-gray-800 absolute left-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width="28px" height="28px" 
                    viewBox="0 0 24 24"><path fill="currentColor" 
                    d="M12 7.65ZM16.35 12Zm-8.7 0ZM12 16.35Zm-.7-6.55l-2-2q-.15-.15-.225-.337T9 7.075V3q0-.425.288-.713T10 2h4q.425 0 .713.288T15 3v4.075q0 .2-.075.388T14.7 7.8l-2 2q-.3.3-.7.3t-.7-.3Zm5.625 5.2q-.2 0-.388-.075T16.2 14.7l-2-2q-.3-.3-.3-.7t.3-.7l2-2q.15-.15.338-.225T16.925 9H21q.425 0 .713.288T22 10v4q0 .425-.288.713T21 15h-4.075ZM3 15q-.425 0-.713-.288T2 14v-4q0-.425.288-.713T3 9h4.075q.2 0 .388.075T7.8 9.3l2 2q.3.3.3.7t-.3.7l-2 2q-.15.15-.337.225T7.075 15H3Zm7 7q-.425 0-.713-.288T9 21v-4.075q0-.2.075-.388T9.3 16.2l2-2q.3-.3.7-.3t.7.3l2 2q.15.15.225.338t.075.387V21q0 .425-.288.713T14 22h-4Zm2-14.35l1-1V4h-2v2.65l1 1ZM4 13h2.65l1-1l-1-1H4v2Zm7 7h2v-2.65l-1-1l-1 1V20Zm6.35-7H20v-2h-2.65l-1 1l1 1Z">
                    </path></svg>
                </p>
                <TestData />
            </div>
            
            
            <form onSubmit={handleSubmit}
            className="flex flex-col mt-4
            gap-5 items-center w-full">

                { isSignup && (
                <div className='flex justify-between relative
                    items-center w-full float-label-input'>
                    <input onChange={handleChange}
                    className="block w-full bg-[#f8f6f6] 
                    focus:outline-none focus:shadow-outline border 
                    border-gray-500 rounded-md py-3 px-3 appearance-none 
                    leading-normal focus:border-blue-500"
                    type="text" name="name" 
                    placeholder=" " required/>
                    <label htmlFor='email' className="absolute top-3 left-0.5 text-gray-500
                    pointer-events-none transition duration-200 ease-in-out
                    px-2 text-grey-darker">Username</label>
                </div>
                )}
                
                <div className='relative w-full float-label-input'>
                    <input onChange={handleChange}
                    className="block w-full bg-[#f8f6f6] 
                    focus:outline-none focus:shadow-outline border 
                    border-gray-500 rounded-md py-3 px-3 appearance-none 
                    leading-normal focus:border-blue-500 lowercase" 
                    type="email" name="email" 
                    placeholder=" " required/>
                    <label htmlFor='email' className="absolute top-3 left-0.5 text-gray-500
                    pointer-events-none transition duration-200 ease-in-out
                    px-2 text-grey-darker">Email</label>
                </div>

                <div className='w-full relative float-label-input flex items-center'>
                    <input 
                    onChange={(e)=> {
                        var val = e.target.value
                        const trimedval = val.trim()
                        setFormData({...formData, [e.target.name]: trimedval })
                        if(trimedval === formData.confirmPassword) {
                            setPassMatch(false)
                        }
                    }}
                    className={"block w-full bg-[#f8f6f6] focus:outline-none focus:shadow-outline border " + 
                    "rounded-md py-3 px-3 appearance-none " + 
                    "leading-normal focus:border-blue-400 " +
                    (passMatch ? ' border-red-500 ' : ' border-gray-500 ')}
                    type={showPassword ? "text" : "password"}
                    name="password" placeholder=" " 
                    required minLength='6' />
                    <label htmlFor='password' 
                    className={"absolute top-3 left-0.5 " +
                    "pointer-events-none transition duration-200 ease-in-out " +
                    "px-2 text-grey-darker "+
                    (passMatch ? ' text-red-500 ' : ' text-gray-500  ')}>
                        Password
                    </label>

                    {showPassword ? 
                    <div
                    onClick={handleShowPassword}
                    className='absolute right-2.5
                    cursor-pointer text-gray-500 text-xl 
                    hover:text-gray-800 duration-100 ease-in'>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="1em" height="1em" 
                        viewBox="0 0 24 24"><path fill="currentColor" 
                        d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z">
                        </path></svg>
                    </div> : <div
                    onClick={handleShowPassword}
                    className='absolute right-2.5
                    cursor-pointer text-gray-500 text-xl 
                    hover:text-gray-800 duration-100 ease-in'>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="1em" height="1em" 
                        viewBox="0 0 24 24"><path fill="currentColor" 
                        d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.475 0-6.35-1.838T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.388t.1-.312q1.475-3.125 4.35-4.963T12 4q3.475 0 6.35 1.838T22.7 10.8q.075.125.1.313t.025.387q0 .2-.025.388t-.1.312q-1.475 3.125-4.35 4.963T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z">
                        </path></svg>
                    </div>}
                </div>

                { isSignup && 
                <div className='w-full relative float-label-input flex items-center'>
                    <input
                    onChange={(e)=> {
                        var val = e.target.value
                        const trimedval = val.trim()
                        setFormData({...formData, [e.target.name]: trimedval })
                        if(trimedval === formData.password) {
                            setPassMatch(false)
                        }
                    }}
                    className={"block w-full bg-[#f8f6f6] focus:outline-none focus:shadow-outline border " + 
                    "rounded-md py-3 px-3 appearance-none " + 
                    "leading-normal focus:border-blue-400 " +
                    (passMatch ? ' border-red-500 ' : ' border-gray-400 ')}
                    type={showConPass ? "text" : "password"}
                    name="confirmPassword" placeholder=" " 
                    required minLength='6' />
                    <label htmlFor='password' 
                    className={"absolute top-3 left-0.5 " +
                    "pointer-events-none transition duration-200 ease-in-out " +
                    "px-2 text-grey-darker "+
                    (passMatch ? ' text-red-500 ' : ' text-gray-500  ')}>
                        Confirm Password
                    </label>

                    {showConPass ? 
                    <div
                    onClick={handleShowConPass}
                    className='absolute right-2.5
                    cursor-pointer text-gray-500 text-xl 
                    hover:text-gray-800 duration-100 ease-in'>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="1em" height="1em" 
                        viewBox="0 0 24 24"><path fill="currentColor" 
                        d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z">
                        </path></svg>
                    </div> : <div
                    onClick={handleShowConPass}
                    className='absolute right-2.5
                    cursor-pointer text-gray-500 text-xl 
                    hover:text-gray-800 duration-100 ease-in'>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="1em" height="1em" 
                        viewBox="0 0 24 24"><path fill="currentColor" 
                        d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.475 0-6.35-1.838T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.388t.1-.312q1.475-3.125 4.35-4.963T12 4q3.475 0 6.35 1.838T22.7 10.8q.075.125.1.313t.025.387q0 .2-.025.388t-.1.312q-1.475 3.125-4.35 4.963T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z">
                        </path></svg>
                    </div>}
                </div>}
                

                <button type='submit'
                className="bg-blue-600 rounded 
                hover:bg-blue-700 ease-in w-full
                font-medium text-xs shadow-md uppercase
                text-white py-3.5 px-6 duration-100">
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </button>
                
            </form>

            <div className="mt-4 flex justify-center
            items-center text-gray-500 w-full">
                <div className="bg-gray-500
                w-full h-[1px]" ></div>
                <p className="text-center text-sm
                mx-2">or</p>
                <div className="bg-gray-500
                w-full h-[1px]" ></div>
            </div>

            <button onClick={() => signIn('google')}
                className="bg-white border py-3 w-full
                hover:bg-sky-50/50 hover:border-blue-300/70
                rounded mt-4 flex justify-center items-center 
                shadow duration-100
                text-sm border-gray-500 ease-in text-gray-800">
                <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                Continue with Google
            </button>
                        
            <div className="mt-4 text-xs flex justify-center items-center ">
                <p className='text-gray-800'>
                { isSignup ? "Already have an account?" 
                : "Don't have an account?" }
                
                </p>
                <button onClick={switchMode}
                className="text-blue-700 ml-0.5 cursor-pointer
                hover:underline">
                { isSignup ? 'Sign In' : 'Sign Up' }
                </button>
            </div>

        </div>
        </div>
        </>
    )
}