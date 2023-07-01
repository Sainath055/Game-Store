"use client"

import React, { useEffect, useState } from 'react'
import { CheckCircle, DownArrow } from '@/assets/LogoSvgs';
import CreditcardUi from './CreditcardUi';
import CreditForm from './CreditForm';
import { DotSpinner, JellyTriangle, Ring } from '@uiball/loaders';

const initialCard = { 
    cardNumber: '',
    cardHolder: '',
    exp_month: '',
    exp_year: '', 
    cvc: '',
    saveCardData: false,
  }

const Payment = ({ userId, cardData, setCardData, gotCardData }) => {

    const [toogleOtps, setToogleOtps] = useState(true);
    const [selectedCard, setSelectedCard] = useState('');
    const [savedCardsListData, setSavedCardsListData] = useState([]);
    const [allCardNumbers , setAllCardNumbers ] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchCardListData = async () => {
        try {
            const response = await fetch(`/api/user/cardList/${userId}`, 
            { method: "GET", }); 
            const data = await response.json();
            if (response.ok) {
                setSavedCardsListData(data)
                setAllCardNumbers(data.map((card) => card.cardNumber))
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCardListData()
    }, []);

    // var savedCardsListData = [
    //     {
    //         cardNumber: '378282246310005',
    //         cardHolder:'John Wick',
    //         exp_month: '05',
    //         exp_year: '2024',
    //     },
    //     {
    //         cardNumber: '3566002020360505',
    //         cardHolder:'Reyna',
    //         exp_month: '11',
    //         exp_year: '2026',
    //     },
    //     {
    //         cardNumber: '6205500000000000004',
    //         cardHolder:'Nathan Drake',
    //         exp_month: '07',
    //         exp_year: '2028',
    //     },
    //     {
    //         "cardNumber": "5555555555554444",
    //         "cardHolder": "Naruto",
    //         "exp_month": "06",
    //         "exp_year": "2025",
    //     },
    // ]

    const handleToogleOpts = () => {
        setToogleOtps(!toogleOtps)
        setCardData(initialCard)
        setSelectedCard('')
    }

   
  return (
    <>
    <div className='lg:w-[80%] w-[90%] max-w-3xl h-max 
        flex flex-col pt-6 pb-10 gap-y-8 '>

        <div className='w-full h-max text-white text-[26px] px-1 flex items-center'>
            Payment 
            <a href='https://stripe.com/docs/testing#cards' target='_black'
            className='sm:ml-2 ml-3 text-[14px] px-2 py-0.5 bg-green-700 rounded-xl
            flex items-center gap-x-1'>
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="18px" height="18px" 
                viewBox="0 0 24 24"><path fill="currentColor" 
                d="M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24a2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24a2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24a.973.973 0 0 1 0-1.42Z">
                </path></svg>
                Stripe testing
            </a>
        </div>

        <div className='w-full h-max text-white rounded-[7px]   
            border border-[#ffffff60]
            flex flex-col items-center justify-center overflow-hidden'>

            <div className={'w-full h-max px-4 py-3 flex items-center justify-between '+ 
            ' bg-[#606060d7] border-[#ffffff60] '+
            (toogleOtps ? ' border-b' : ' border-none ')}>
                <p>Saved Cards</p>
                {!toogleOtps ? 
                <div onClick={handleToogleOpts}
                className='w-max h-max cursor-pointer'>
                    <DownArrow />
                </div>
                : 
                    (gotCardData ?
                        <div className='w-max h-max'>
                            <CheckCircle />
                        </div> 
                    : null )
                }
            </div>

            {toogleOtps && 
                (savedCardsListData.length > 0 ? 
                    <div className='w-full h-max px-4 py-3 grid sm:grid-cols-2 grid-cols-1 gap-4'>
                        {savedCardsListData.map((data,i)=> (
                            <div key={i}>
                                <CreditcardUi data={data} i={i} 
                                selectedCard={selectedCard} 
                                setSelectedCard={setSelectedCard}
                                cardData={cardData}
                                setCardData={setCardData} />
                            </div>
                        ))}
                    </div> 
                    : 
                    <div className='w-full h-max px-4 py-3 text-white text-[20px]
                    flex items-center justify-center gap-2'>
                        {isLoading ? 
                        <>
                            <Ring 
                             size={40}
                             lineWeight={5}
                             speed={1.5} 
                             color="#f1f2f1" 
                            />
                        </> 
                        : 
                        <>
                            Your card list is empty
                            <svg xmlns="http://www.w3.org/2000/svg" 
                            width="30" height="30" 
                            viewBox="0 0 24 24"><path fill="none" stroke="currentColor" 
                            strokeLinecap="round" strokeLinejoin="round" 
                            strokeWidth="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m6-2h.01M15 10h.01M9 15h6">
                            </path></svg>
                        </>
                        }
                    </div> 
                )
            }
        </div>

        <div className='w-full h-max text-white rounded-[7px]   
            border border-[#ffffff60]
            flex flex-col items-center justify-center overflow-hidden'>

            <div className={'w-full h-max px-4 py-3 flex items-center justify-between '+ 
            ' bg-[#606060d7] border-[#ffffff60] '+
            (!toogleOtps ? ' border-b' : ' border-none ')}>
                <p>Card Details</p>
                {toogleOtps ? 
                <div onClick={handleToogleOpts}
                className='w-max h-max cursor-pointer'>
                    <DownArrow />
                </div>
                : 
                    (gotCardData ?
                        <div className='w-max h-max'>
                            <CheckCircle />
                        </div> 
                    : null )
                }
            </div>
            {!toogleOtps && 
            <div className='w-full h-max flex flex-col' >
                <CreditForm cardData={cardData} setCardData={setCardData} allCardNumbers={allCardNumbers} />
            </div>
            }
        </div>

    </div>
    </>
  )
}

export default Payment
