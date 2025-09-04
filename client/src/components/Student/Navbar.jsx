import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link ,useLocation} from 'react-router-dom'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'


const Navbar = () => {
  const location = useLocation();
  const isCourseListPage=location.pathname.includes('/course-list');
  const {openSignIn}=useClerk();
  const {user}=useUser();
  const {navigate,isEducator}=useContext(AppContext)
  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-teal-900'}`}>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="Logo" className='w-20 lg:w-25 cursor-pointer' />
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>
        { user && <>
        <button className='text-white' onClick={()=>navigate('./educator')} >{isEducator?"Educator Dashboard":"Become Educator"}</button>
        | <Link to='/my-enrollments' className='text-white'>My Enrollments</Link>
        </>
        }
      </div>

      
      {user?<UserButton/> :<button onClick={()=>openSignIn()} className='bg-neutral-700 text-white px-5 py-2 rounded-full'>Create Account</button>}
      
      </div>

      {/* {for phone Screen} */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
          {
            user && (<>
            <button onClick={()=>navigate('./educator')}>{isEducator?"Educator Dashboard":"Become Educator"}</button>
        | <Link to='/my-enrollments'>My Enrollments</Link>
            </>)
          }
        </div>
        {
          user ? <UserButton/> :
          <button onClick={()=>openSignIn()}><img src={assets.user_icon} alt="" className="w-8 h-8 object-contain"/></button>
        }
        
      </div>
      
    </div>
  )
}

export default Navbar
