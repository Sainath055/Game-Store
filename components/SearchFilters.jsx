"use cilent"

import { MultiplySymbol } from '@/assets/LogoSvgs';
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'

const SearchFilters = ({ closeViewDetails,handleClearSearchBar,
    priceSelect, priceQuery,priceOptions,
    discountSelect, discountQuery,discountOptions,
    genreSelect, genreQuery,genre_options,
    platformSelect, platformQuery,platform_options
}) => {
    
  const [priceVal, setPriceVal] = useState(priceQuery);
  const [discountVal, setDiscountVal] = useState(discountQuery);
  const [genreVal, setGenreVal] = useState(genreQuery ? genreQuery.split(',') : null);
  const [platformVal, setPlatformVal] = useState(platformQuery ? platformQuery.split(',') : null);


  useEffect(() => {
    setPriceVal(priceQuery)
    setDiscountVal(discountQuery)
    setGenreVal(genreQuery ? genreQuery.split(',') : null)
    setPlatformVal(platformQuery ? platformQuery.split(',') : null)
  }, [closeViewDetails]);


    const handleApply = () => {
        priceSelect(priceVal === null ? undefined : priceVal)
        discountSelect(discountVal === null ? undefined : discountVal)
        genreSelect(genreVal === null ? undefined : genreVal)
        platformSelect(platformVal === null ? undefined : platformVal)
        closeViewDetails()
    }

    const handleClear = () => {
        priceSelect(undefined)
        discountSelect(undefined)
        genreSelect(undefined)
        platformSelect(undefined)
        handleClearSearchBar()
        closeViewDetails()
    }

  return (
    <div className='w-full h-full flex flex-col items-center justify-between'>
        <div className='w-full h-max flex items-center justify-between px-8
        text-white pt-12 pb-4 text-[22px] bg-[#323232]'>
            <p>Filters</p>
            <button onClick={closeViewDetails} className='sm:hidden block'>
                <MultiplySymbol />
            </button>
        </div>
        <div className='w-full h-full flex flex-col items-center gap-y-10 pt-8
            px-8 '>
            <Select className='w-full h-max text-white 
            border border-transparent focus:border-transparent '
                placeholder='PRICE'
                onChange={(value)=>setPriceVal(value)}
                value={priceVal === 'undefined' ? null : priceVal}
                options={priceOptions}
                size='large'
                allowClear 
            />
            <Select className='w-full h-max text-white 
            border border-transparent focus:border-transparent '
                placeholder='DISCOUNT'
                onChange={(value)=>setDiscountVal(value)}
                value={discountVal === 'undefined' ? null : discountVal}
                options={discountOptions}
                size='large'
                allowClear 
            />
            <Select mode="multiple" allowClear size='large' placeholder='GENRE'
            maxTagCount={1} onChange={(value)=>setGenreVal(value)}
            maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`} 
            value={genreVal ? genreVal : []}
            className='w-full h-max text-white 
            border border-transparent focus:border-transparent '>  
                {genre_options.map((val, i) => (
                <Select.Option key={i} value={val}>{val}</Select.Option>
                ))}
            </Select>
            <Select mode="multiple" allowClear size='large' placeholder='PLATFORM'
            maxTagCount={1} onChange={(value)=>setPlatformVal(value)}
            maxTagPlaceholder={(omittedValues) => `+ ${omittedValues.length}`} 
            value={platformVal ? platformVal : []}
            className='w-full h-max text-white 
            border border-transparent focus:border-transparent '>   
                {platform_options.map((val, i) => (
                <Select.Option key={i} value={val}>{val}</Select.Option>
                ))}
            </Select>
        </div>
        <div className='w-full h-max flex items-center justify-evenly gap-x-4 
        text-white py-8 bg-[#323232] px-8'>
            <button onClick={handleClear}
            className='w-full h-max py-2 
            border border-[#ffffff60] hover:border-[#ffffff95]
            rounded-lg text-[18px]'>Clear</button>
            <button onClick={handleApply}
            className='w-full h-max bg-[#606060d7] py-2 
            border border-[#ffffff60] hover:bg-[#aaaaaa99]
            rounded-lg text-[18px]'>
                Apply
            </button>
        </div>
    </div>
  )
}

export default SearchFilters