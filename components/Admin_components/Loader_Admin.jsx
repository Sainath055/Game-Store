
import { Ring } from '@uiball/loaders'
import React from 'react'

const Loader_Admin = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <Ring 
         size={50}
         lineWeight={5}
         speed={1.5} 
         color="black" 
        />
    </div>
  )
}

export default Loader_Admin