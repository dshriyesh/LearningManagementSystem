import React, { useContext, useEffect, useState } from 'react'
import { useFetcher, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/Student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/Student/Footer';
import YouTube from 'react-youtube'
const CourseDetails = () => {

  const {id}=useParams()

  const [courseData,setCourseData]=useState(null);
  const [openSection,setOpenSection]=useState({});
  const [isEnrolled,setIsEnrolled]=useState(false);
  const [playerData,setPlayerData] = useState(null);


  const toggleSection=(index)=>{
    setOpenSection((prev)=>(
      {...prev ,
        [index]:!prev[index]
      }
    ))
  }

  const {allCourses ,calculateRating,calculateNoOfLectures,calculateChapterTime,calculateCourseDuration,currency} = useContext(AppContext)
  const fetchCourseData = async()=>{
    const findCourse =  allCourses.find(course=>course._id === id)
    setCourseData(findCourse);
  }

  useEffect(()=>{
    fetchCourseData()
  },[allCourses, id])

  return courseData ? (
    <>
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
      
      <div className="absolute top-0 left-0 w-full h-200  bg-gradient-to-b from-yellow-200/70"></div>

      
      {/* left column */}
      <div className='max-w-xl z-10 text-teal-900'>
        <h1 className='text-2xl md:text-4xl font-semibold text-teal-900'>
  {courseData.courseTitle}
</h1>

        <p dangerouslySetInnerHTML={{__html:courseData.courseDescription.slice(0,200)}}></p>
        {/* review and rating */}

<div className='flex items-center space-x-2 pt-3 pb-1 text-sm '>
          <p>{calculateRating(courseData)}</p>
          <div className='flex'>
            {[...Array(5)].map((_,i)=>(<img  key={i} src={i<Math.floor(calculateRating(courseData))?assets.star : assets.star_blank} alt='' className='w-3.5 h-3.5'/>
          ))}
          </div>
          <p className='text-gray-500'>{courseData.courseRatings.length} {courseData.courseRatings.length >1 ? 'ratings' : 'rating'}</p>

          <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? "students" : "student"}</p>
        </div>

        <p className='text-sm'>Course By <span className='text-blue-600 underline'>FreeCodeCamp</span></p>
        <div className='pt-8 text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {courseData.courseContent.map((chapter,index)=>(
              <div key={index} className='border border-teal-900 bg-white mb-2 rounded'>
                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none ' onClick={()=>toggleSection(index)}>
                  <div className='flex items-center gap-2'>
                    <img className={`h-5 w-5 transform transition-transform ${openSection[index]?'rotate-180':''}`} src={assets.down_arrow} alt="arrow icon" />
                    <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                  </div>
                  <p>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openSection[index]?'max-h-96' : 'max-h-0'}`}>
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((lecture,index)=>(
                      <li key={index} className='flex items-start gap-2 py-1'>
                        <img src={assets.play_icon} alt="" className='w-4 h-4 mt-1' />
                        <div className='flex items-center justify-between w-full text-gray-800 text-s md:text-default'>
                          <p>{lecture.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {lecture.isPreviewFree && <p onClick={()=>setPlayerData({
                              videoId : lecture.lectureUrl.split('/').pop()
                            })} className='text-blue-500 cursor-pointer'>Preview</p>}
                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000 , {units:['h','m']})}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='py-20 text-sm md:text-default'>
          <h3 className='text-xl font-semibold text-gray-900'>Course Discription</h3>
             <p className='pt-3 rich-text' 
             dangerouslySetInnerHTML={{__html:courseData.courseDescription}}></p>
        </div>

      </div>


      {/* right Column */}
     <div className="max-w-[420px] min-w-[300px] sm:min-w-[420px] z-10 shadow-md rounded-t md:rounded-none overflow-hidden bg-white">
        {
              playerData ? 
              <YouTube videoId={playerData.videoId} opts={{playerVars:{
                autoplay:1
              }}} iframeClassName='w-full aspect-video'/>
              : <img src={courseData.courseThumbnail} alt="" />
            }
        
        
        <div className='p-5'>
          <div className='flex items-center gap-2'>
            
            <img className='w-3.5' src={assets.stop_watch} alt="time left" />
            <p className='text-red-600'><span className='font-medium'>5 days</span> left at this price</p>
          </div>


          <div className='flex gap-3 items-center pt-2'>
            <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>{currency}{(courseData.coursePrice - courseData.discount*courseData.coursePrice/100).toFixed(2)} </p>

            <p className='md:text-lg text-gray-500 line-through'>{currency}{courseData.coursePrice}</p>

            <p className='md:text-lg text-gray-500'>{courseData.discount}% off</p>
          </div>

          <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>
            <div className='flex items-center gap-1'>
              <img className='h-5 w-5' src={assets.star} alt="star icon" />
              <p>{calculateRating(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-500/40'></div>

            <div className='flex items-center gap-1'>
              <img className='h-5 w-5' src={assets.clock_icon} alt="star icon" />
              <p>{calculateCourseDuration(courseData)}</p>
            </div>

            <div className='h-4 w-px bg-gray-500/40'></div>

            <div className='flex items-center gap-1'>
              <img className='h-5 w-5' src={assets.book_icon} alt="star icon" />
              <p>{calculateNoOfLectures(courseData)} lessons</p>
            </div>

          </div>

          <button className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium'>
            {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>

            <div className='pt-6'>
              <p className='md:text-xl text-lg font-medium text-gray-800'>What's in the course?</p>
              <ol className='ml-4 pt-2 text-sm md:text-default list:disc text-gray-500'>
                <li>Lifetime access with free features.</li>
                <li>Step-by-Step , hands-on project guidance</li>
                <li>Downloadable resources and source code</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of Completion.</li>
              </ol>
            </div>



        </div>
      </div>
    </div>
    <Footer/>
    </>
  ) : <Loading/>
}

export default CourseDetails
