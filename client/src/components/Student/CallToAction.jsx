import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 md:px-0'>
      <h1 className='text-xl md:text-4xl text-teal-900 font-semibold'>Learn anything, anywhere at your own pace</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sed est nisi commodi ipsam quas expedita hic dolorem sint. Debitis deleniti fugiat ab sit saepe? Dignissimos pariatur magni tempora eos!\
      </p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md text-white bg-blue-600'>Get Started</button>
        <button className='flex items-center gap-2'>Learn More <img  className='h-5 w-5' src={assets.arrow_icon} alt="arrow_icon" /></button>
      </div>
    </div>
  )
}

export default CallToAction
