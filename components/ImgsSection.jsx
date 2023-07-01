"use client"

import React, { useRef, useState } from 'react'
import '../app/globals.css'
import { RightArrow } from '@/assets/LogoSvgs'

const ImgsSection = ({ images, mainImg, videoLinkKey, description }) => {
    const allImgs = [mainImg,...images]

    const allImagesDisRef = useRef(null);

    const [video , setVideo] = useState(true)
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image, index) => {
        setSelectedImage(image);
        setVideo(false)
    };

    const handleVideoClick = () => {
        setVideo(true)
        setSelectedImage(null)
    };


    const handleScrollRight = () => {
        if (allImagesDisRef.current) {
            allImagesDisRef.current.scrollBy({
                left: allImagesDisRef.current.clientWidth, 
                behavior: 'smooth', 
            });
        }
    };

    const handleScrollLeft = () => {
        if (allImagesDisRef.current) {
            allImagesDisRef.current.scrollBy({
                left: -allImagesDisRef.current.clientWidth, 
                behavior: 'smooth', 
            });
        }
    };


  return (
    <div className='w-full h-max flex flex-col space-y-3'>
        {video ? 
        <iframe className='rounded-[12px] w-full h-max aspect-[16/9]' 
        src={`https://www.youtube.com/embed/${videoLinkKey}?vq=hd1080&autoplay=1&loop=1&rel=0&iv_load_policy=3&hl=en-us&playlist=${videoLinkKey}`}
        title="YouTube video player" frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen></iframe>
        :
        <div className="w-full h-max">
            {selectedImage && 
            <img 
            className='max-w-auto min-w-full aspect-[16/9] h-max rounded-[12px]'
            src={selectedImage} alt="Selected Image" />}
        </div> 
        }

        <div className='relative w-full overflow-hidden px-9'>
            <div className='absolute w-max h-full right-0.5 z-10
            bg-gradient-to-l from-[#202020b0] flex items-center justify-center'>
                <button onClick={handleScrollRight}
                className='w-[30px] h-[30px] rounded-full bg-[#808080c7] hover:bg-[#969696ee]
                flex items-center justify-center'>
                    <RightArrow />
                </button>
            </div>
            <div className='absolute w-max h-full left-0.5 z-10 transform -scale-x-1
            bg-gradient-to-r from-[#202020b0] flex items-center justify-center'>
                <button onClick={handleScrollLeft}
                className='w-[30px] h-[30px] rounded-full bg-[#808080c7] hover:bg-[#969696ee]
                flex items-center justify-center transform scale-x-[-1]'>
                    <RightArrow />
                </button>
            </div>
        
            <div ref={allImagesDisRef} className='allImagesDis w-full h-max overflow-scroll flex items-center'>

                <div className="w-max h-max flex gap-x-3">
                    <div onClick={handleVideoClick}
                    style={{backgroundImage: `url(${mainImg})`,}}
                    className='text-white md:w-[150px] sm:w-[120px] w-[100px] overflow-hidden
                    rounded-[7px] bg-cover bg-no-repeat relative cursor-pointer'>
                        <div className={'w-full h-full absolute ' + (video ? 
                        ' bg-black/50 border-[2px] border-[#ffffff9f] rounded-[7px]' 
                        : 'bg-black/70 hover:bg-black/50 ') +
                        ' flex items-center justify-center text-white text-[18px]'}>
                            <svg className={'mr-1 md:w-[40px] md:h-[40px] sm:w-[35px] sm:h-[35px] w-[30px] h-[30px] '+
                            (video ? ' animate-none ' : ' hover:animate-pulse ')}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" 
                                d="m10.65 15.75l4.875-3.125q.35-.225.35-.625t-.35-.625L10.65 8.25q-.375-.25-.763-.038t-.387.663v6.25q0 .45.388.663t.762-.038ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/>
                            </svg>
                        </div>
                    </div>
                    {allImgs.map((image, index) => (
                        <div key={index} onClick={() => (handleImageClick(image, index))}
                            className={'md:w-[150px] sm:w-[120px] w-[100px] h-max rounded-[7px] cursor-pointer ' + 
                            (selectedImage === image ? 'border-[2px] border-[#ffffff9f] opacity-100' :
                            ' opacity-60 hover:opacity-90   ')}>
                        <img
                            src={image}
                            alt={`Image ${index}`}
                            className='w-full aspect-[16/9] h-max rounded-[7px]'
                        />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className='w-full h-max min-[900px]:flex hidden flex-col text-white text-[18px] pt-5'>
           {description}
        </div>
    </div>
  )
}

export default ImgsSection