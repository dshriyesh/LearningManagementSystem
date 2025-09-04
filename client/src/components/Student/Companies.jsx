import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className='pt-16'>
      <p className='text-base text-gray-500'>Trusted by learners from</p>
      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-15'>
        <img src={assets.google} alt="Google" className='w-20 md:w-30' />
        <img src={assets.microsoft} alt="Microsoft" className='w-20 md:w-30' />
        <img src={assets.oracle} alt="Oracle" className='w-20 md:w-30' />
        <img src={assets.walmart} alt="Walmart" className='w-20 md:w-30' />
        <img src={assets.paypal} alt="Paypal" className='w-20 md:w-30' />
      </div>
    </div>
  )
}

export default Companies
