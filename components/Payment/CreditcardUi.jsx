"use client"

import { Asterisk } from '@/assets/LogoSvgs'
import getCardLogo from '@/utils/getCardLogo'
import getCardType from '@/utils/getCardType'
import React, { useRef, useState } from 'react'
import '../../app/globals.css'

const CreditcardUi = ({data, i, selectedCard, setSelectedCard, cardData, setCardData, }) => {
    var cardType = getCardType(data.cardNumber)
    let CardLogo = getCardLogo(cardType)

    const cvvInputRef = useRef(null);
    const [cvv, setCvv] = useState('');

    const handleSelectCard = (event) => {
        setSelectedCard(event.target.value)
        cvvInputRef.current.focus();
        setCvv('')
        setCardData({...cardData, 
            cardNumber: data.cardNumber,
            cardHolder: data.cardHolder,
            exp_month: data.exp_month,
            exp_year: data.exp_year,
            cvc: '',
        })
    };


    const FourAsterisk = () => {
        return (
            <div className="flex items-center">
            {[...Array(4)].map((_, index) => (
                <Asterisk key={index} />
            ))}
            </div>
        );
    };

    const handleCvvInput = (e) => {
        const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        setCvv(input);
        setCardData({...cardData, cvc: input})
    };



    return (
        <label key={i}
        className={
            ' w-full h-max flex flex-col p-[20px] text-[18px] ' +
            ' aspect-[16/9] justify-between cursor-pointer duration-100 ' +
            ' border-[1.5px]  rounded-[8px] hover:border-[#c3c3c3b6] ' +
            (selectedCard === `card${i}` ? 
            'border-[#ddddddc3] bg-[#5858587b] ' : 
            'border-[#ffffff60] bg-[#4f4f4f47]')
          }>
            <div className='w-full h-max flex items-center justify-between'>
                <div className={
                        ' w-max h-max flex items-center font-medium gap-x-1' +
                        (selectedCard === `card${i}` ? 
                        ' text-white ' : 
                        ' text-gray-500 ' )
                    }>
                    <input className='hidden'
                    type="radio"
                    value={`card${i}`}
                    name="cards"
                    onChange={handleSelectCard}
                    />
                    <p className='tracking-[2px] xl:text-[18px] text-[16px]'>CVV</p>
                     
                    <div className={' relative ' + 
                    (selectedCard === `card${i}` ? ' block w-[50px] ' : ' opacity-0 w-0 h-0 ')}>
                        <input  ref={cvvInputRef}
                        className='cvvInput text-white bg-transparent box-border
                        border-b-[2px] border-[#ffffff60] tracking-[1px] px-1
                        focus:outline-none w-full h-max text-[16px] leading-7'
                            type="text"
                            pattern="[0-9]*" 
                            inputMode="numeric"
                            maxLength={4} 
                            value={cvv}
                            onChange={handleCvvInput}
                            placeholder="####"
                        />
                        <span className='CvvBottomSpan absolute bottom-0 left-0 
                        w-[0%] h-[2px] duration-300 bg-[#edededd6]'></span>
                        {/* <Asterisk /> */}
                    </div>

                </div>
                <CardLogo />
            </div>
            <div className='w-full h-max xl:flex sm:hidden flex items-center gap-x-1'>
                {data.cardNumber.length > 16 ? 
                    <>
                    {[...Array(4)].map((_, index) => (
                        <FourAsterisk key={index} />
                    ))} 
                    <div>{data.cardNumber.slice(-3)}</div>
                    </>
                :
                    (data.cardNumber.length >= 16 ? 
                        <>
                        {[...Array(3)].map((_, index) => (
                            <FourAsterisk key={index} />
                        ))} 
                        <div>{data.cardNumber.slice(-4)}</div>
                        </>
                    : 
                        <>
                        <FourAsterisk />
                        <div className='flex'>
                        {[...Array(6)].map((_, index) => (
                            <Asterisk key={index} />
                        ))}
                        </div>
                        <div>{data.cardNumber.slice(-5)}</div>
                        </>
                    ) 
                }  
            </div>
            <div className='w-full h-max sm:flex xl:hidden hidden items-center lg:text-[16px] text-[14px]'>
                Ending {data.cardNumber.slice(-4)}
            </div>
            <div className='w-full h-max flex items-center justify-between 
            xl:text-[18px] lg:text-[16px] text-[14px]'>
                <p className='w-max h-max uppercase text-ellipsis line-clamp-1'>{data.cardHolder}</p>
                <p className='w-max xl:flex sm:hidden flex items-center'>{data.exp_month} / {data.exp_year}</p>    
                <p className='w-max sm:flex xl:hidden hidden items-center'>{data.exp_month} / {data.exp_year.slice(-2)}</p>        
            </div>

        </label>
    )
}

export default CreditcardUi