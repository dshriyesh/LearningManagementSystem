import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-yellow-200/70'>
      <h1 className="text-3xl md:text-6xl relative font-bold text-teal-900 max-w-3xl mx-auto">
  Upskill yourself, <span className="text-amber-500">secure your future !</span>
</h1>

    
    
<p className='hidden md:block text-xl md:text-xl text-teal-900 max-w-xl mx-auto'>
  Mentora blends wisdom and technology to guide you towards meaningful skill-building and lifelong growth.
</p>

<p className='md:hidden text-lg text-teal-900 max-w-sm mx-auto'>
  Mentora blends wisdom and technology to guide you towards meaningful skill-building and lifelong growth.
</p>
<SearchBar/>

</div>
    
    
  )
}

export default Hero
