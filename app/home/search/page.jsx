"use client"

import { FilterIcon, MultiplySymbol } from '@/assets/LogoSvgs'
import { Select } from 'antd'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import '../../globals.css'
import ProductCard from '@/components/ProductCard'
import { useSession } from 'next-auth/react'
import SearchFilters from '@/components/SearchFilters'
import { Ring } from '@uiball/loaders'
import PaginationLogic from '@/components/Pagination/PaginationLogic'


const SearchPage = () => {
  const { data: session } = useSession()
  var userId = session && session.user.id

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()
  const pathname = usePathname()

  const searchQuery = searchParams.get('q')
  const priceQuery = searchParams.get('p')
  const discountQuery = searchParams.get('d')
  const genreQuery = searchParams.get('g')
  const platformQuery = searchParams.get('pt')

  const pageQuery = searchParams.get('page')  || 1

  const [searchVal, setSearchVal] = useState(searchQuery ? searchQuery : '');

  const [pageNo, setPageNo] = useState(Number(pageQuery));
  const [numOfPages, setNumOfPages] = useState(0);

  const [allGames, setAllGames] = useState(null);

  const [isLoading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [openFiltersDiv, setOpenFiltersDiv] = useState(false)


  const fetchSearchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/search?${params.toString()}`, { method: "GET", }); 
      const data = await response.json();
        if (response.ok) {
          setSearchData(data.allProducts)
          setAllGames(data.allGames)
          setNumOfPages(data.numberOfPages)
          setPageNo(Number(data.currentPage))
          createQueryString('page', 1)
        }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSearchData()
  }, [searchParams]);

  const searchInput = async (e) => {
    const { value } = e.target;
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (regex.test(value)) {
      setSearchVal(value);
    }
  };

  const searchKeyDown = (e) => {
    if (e.keyCode === 13) {
      router.push(pathname + '?' + createQueryString('q', searchVal))
    }
  };

  var platform_options = ['Windows', 'Playstation', 'Xbox']
  var genre_options = ['Action', 'Adventure', 'Puzzle', 'Crime', 
  'Fantasy', 'Sci-Fi', 'Drama', 'Horror', 'Mystery' ]

  const priceOptions = [
    {
      value: 'p-u-2000',
      label: '₹2,000 and below',
    },
    {
      value: 'p-u-3000',
      label: '₹3,000 and below',
    },
    {
      value: 'p-u-4000',
      label: '₹4,000 and below',
    },
  ]

  const discountOptions = [
    {
      value: 'd-20-a',
      label: '20% and above',
    },
    {
      value: 'd-30-a',
      label: '30% and above',
    },
    {
      value: 'd-50-a',
      label: '50% and above',
    },
  ]

  const priceSelect = (value) => {
    router.push(pathname + '?' + createQueryString('p', value))
  };

  const discountSelect = (value) => {
    router.push(pathname + '?' + createQueryString('d', value))
  };
  
  const genreSelect = (value) => {
    router.push(pathname + '?' + createQueryString('g', value))
  };
  const platformSelect = (value) => {
    router.push(pathname + '?' + createQueryString('pt', value))
  };

  const createQueryString = useCallback(
    (name, value) => {
      if(value === undefined || (Array.isArray(value) && value.length === 0)
      || value.length === 0 || value === null) {
        params.delete(name)
      } else {
        params.set(name, value)
      } 
      return params.toString()
    },
    [searchParams]
  )

  const closeViewDetails = () => {
    setOpenFiltersDiv(false)
  }

  const handleClearSearchBar = () => {
    router.push(pathname + '?' + createQueryString('q', undefined))
    setSearchVal('')
  }

  const activeHandler = (clickedActive) => {
    const clickedPageNo = parseInt(clickedActive)
    router.push(pathname + '?' + createQueryString('page', clickedPageNo))
  };


  return (
    <>
    <div className='w-full h-max flex flex-col justify-center text-white relative bg-[#202020]'>

      <div className={'fixed top-0 right-0 bottom-0 z-20 w-full h-screen lg:hidden flex bg-[#272727c0] '+
        (openFiltersDiv ? ' translate-x-[0%] ' : ' translate-x-[120%] ')}>
        <div onClick={closeViewDetails}
          className='sm:w-[calc(100%_-_400px)] w-0 sm:block hidden h-screen
          backdrop-blur-[1px]'>
        </div>
        <div className={'sm:w-[400px] w-full h-full bg-[#202020] relative duration-200 ease-in-out '+
          (openFiltersDiv ? ' translate-x-[0%] ' : ' translate-x-[120%] ')}>
          <button onClick={closeViewDetails}
          className='w-max h-max absolute top-2 -left-[60px] sm:flex hidden 
          p-2.5 rounded-full bg-[#7a7a7acd]'>
            <MultiplySymbol />
          </button>
          <SearchFilters closeViewDetails={closeViewDetails} handleClearSearchBar={handleClearSearchBar}
          priceSelect={priceSelect} priceQuery={priceQuery} priceOptions={priceOptions}
          discountSelect={discountSelect} discountQuery={discountQuery} discountOptions={discountOptions}
          genreSelect={genreSelect} genreQuery={genreQuery} genre_options={genre_options} 
          platformSelect={platformSelect} platformQuery={platformQuery} platform_options={platform_options} />
        </div>
      </div>

      <div className='w-full h-max flex flex-col sticky top-[70px] z-10 
      gap-y-4 py-4 border-b-[0.8px] border-zinc-500 bg-[#202020]'>
        <div className='w-full h-max flex items-center justify-center gap-x-4'>
          <div className='xl:w-[60%] lg:w-[65%] sm:w-[70%] w-[60%] h-max flex items-center relative'>
            <input autoComplete="off" 
            onChange={searchInput}
            onKeyDown={searchKeyDown}
            value={searchVal}
            placeholder='Search'
            className='w-full h-max bg-[#202020] text-white box-border
            hover:border-[#ffffff84] focus:border-[#ffffffba] 
            border border-[#ffffff60] tracking-[1px] px-9 py-1 rounded-[8px]
            focus:outline-none text-[16px] leading-7 placeholder:text-[#989898]'/>
            <button onClick={handleClearSearchBar}
            className={'absolute w-max h-max right-2.5 text-[#e9e6e6] '+ (searchVal.length > 0 ? ' flex ' : ' hidden ')}>
              <svg xmlns="http://www.w3.org/2000/svg" 
              width="18px" height="18px" 
              viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" 
              d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L6.94 8L4.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd">
              </path></svg>
            </button>
            <div className='w-max h-max absolute left-2.5'>
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="20px" height="20px" 
                viewBox="0 0 256 256"><path fill="currentColor" 
                d="m228.24 219.76l-51.38-51.38a86.15 86.15 0 1 0-8.48 8.48l51.38 51.38a6 6 0 0 0 8.48-8.48ZM38 112a74 74 0 1 1 74 74a74.09 74.09 0 0 1-74-74Z">
                </path></svg>
            </div>
          </div>
          <button onClick={()=>setOpenFiltersDiv(true)}
          className='w-max h-max lg:hidden flex items-center text-[16px] gap-x-1 
          bg-[#606060d7] px-2 py-[8px] border border-[#ffffff60] rounded-lg'>
            Filters <FilterIcon />
          </button>
        </div>
        <div className='w-full h-max lg:flex hidden items-center justify-center 
        gap-x-4 2xl:px-14 lg:px-10 '>
          <Select className='w-full h-max text-white 
          border border-transparent focus:border-transparent '
            placeholder='PRICE'
            onChange={priceSelect}
            value={priceQuery === 'undefined' ? null : priceQuery}
            options={priceOptions}
            size='large'
            allowClear 
          />
          <Select className='w-full h-max text-white 
          border border-transparent focus:border-transparent '
            placeholder='DISCOUNT'
            onChange={discountSelect}
            value={discountQuery === 'undefined' ? null : discountQuery}
            options={discountOptions}
            size='large'
            allowClear 
          />
          <Select mode="multiple" allowClear size='large' placeholder='GENRE'
          maxTagCount={1} onChange={genreSelect}
          maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`} 
          value={genreQuery ? genreQuery.split(',') : []}
          className='w-full h-max text-white 
          border border-transparent focus:border-transparent '>  
            {genre_options.map((val, i) => (
              <Select.Option key={i} value={val}>{val}</Select.Option>
            ))}
          </Select>
          <Select mode="multiple" allowClear size='large' placeholder='PLATFORM'
          maxTagCount={1} onChange={platformSelect}
          maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`} 
          value={platformQuery ? platformQuery.split(',') : []}
          className='w-full h-max text-white 
          border border-transparent focus:border-transparent '>   
            {platform_options.map((val, i) => (
              <Select.Option key={i} value={val}>{val}</Select.Option>
            ))}
          </Select>
        </div>
      </div>

      {searchData.length > 0 ?
        (allGames &&
          <div className='w-full h-max bg-[#202020] flex justify-start
          2xl:px-[125px] lg:px-12 md:px-8 sm:px-5 px-8 pt-4 text-[20px]'>
            All Games
          </div>
        ) 
        : null
      }

      {isLoading ?
        <div className="w-full h-max bg-[#202020] justify-center
        grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-6 gap-4 
        2xl:px-[120px] lg:px-12 md:px-8 sm:px-5 px-8 py-5" >
          {[...Array(6)].map((data,i)=>(
            <div key={i} className='w-full h-max flex flex-col gap-y-2 
              border border-[#ffffff20] p-3 rounded-[12px] animate-pulse' >
              <div className='w-full aspect-[16/9] h-max rounded-[12px] bg-[#3f3f3f] outline-none border-none'></div>
              <div className='w-full h-max flex items-center justify-between px-1 gap-x-3'>
                <div className='w-[80%] h-max flex flex-col gap-y-2'>
                  <p className='w-full h-[16px] rounded-[6px] bg-[#3f3f3f]'></p>
                  <p className='w-full h-[16px] rounded-[6px] bg-[#3f3f3f]'></p>
                </div>
                <p className='w-[20%] h-[40px] rounded-[6px] bg-[#3f3f3f]'></p>
              </div>
            </div>
          ))}
        </div>
      :
        (searchData.length === 0 ?
          <div className='w-full h-max flex items-center justify-center py-10 text-[20px]'>
            No Matches Found 😕
          </div>
          :
            <div className={"w-full h-max bg-[#202020] justify-center " +
            " grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-6 gap-4 " + 
            " 2xl:px-[120px] lg:px-12 md:px-8 sm:px-5 px-8 " +
            (allGames ? ' py-5 ':' pb-5 pt-7 ')}>
              {searchData.map((data,i)=>(
                <div key={i} >
                  <ProductCard data={data} userId={userId}/>
                </div>
              ))}
            </div>
        )
      }

      {searchData.length > 0 ?
        <div className='w-full h-max bg-[#202020] flex items-center justify-center
        2xl:px-[125px] lg:px-12 md:px-8 sm:px-5 px-8 pt-5 text-[20px]'>
        <PaginationLogic
          currentPageNum={pageNo}
          size={numOfPages}// size={numberOfPages}
          step={1}
          onClickHandler={activeHandler}
        />
        </div>
        : null 
      }

    </div>
    </>
  )
}

export default SearchPage