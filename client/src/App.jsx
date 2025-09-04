import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './Pages/Student/Home'
import CoursesList from './Pages/Student/CoursesList'
import CourseDetails from './Pages/Student/CourseDetails'
import MyEnrollments from './Pages/Student/MyEnrollments.jsx'
import Player from './Pages/Student/Player'
import Loading from './components/Student/Loading'
import Educator from './Pages/Educator/Educator'
import Dashboard from './Pages/Educator/Dashboard'
import AddCourse from './Pages/Educator/AddCourse'
import StudentsEnrolled from './Pages/Educator/StudentsEnrolled'
import MyCourses from './Pages/Educator/MyCourses'
import Navbar from './components/Student/Navbar'
import "quill/dist/quill.snow.css";
const App = () => {

  const isEducatorRoute = useMatch('/educator/*')

  return (
    <div className='text-dafault min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar/>}
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/course-list' element={<CoursesList/>}/>
        <Route path='/course-list/:input' element={<CoursesList/>}/>
        <Route path='/course/:id' element={<CourseDetails/>}/>
        <Route path='/my-enrollments' element={<MyEnrollments/>}/>
        <Route path='/player/:courseId' element={<Player/>}/>
        <Route path='/loading/:path' element={<Loading/>}/>
        <Route path='/educator' element={<Educator/>}>
        <Route path='/educator' element={<Dashboard/>}/>
        <Route path='add-course' element={<AddCourse/>}/>
        <Route path='my-courses' element={<MyCourses/>}/>
        <Route path='student-enrolled' element={<StudentsEnrolled/>}/>

        </Route>
      </Routes>
    </div>
  )
}

export default App
