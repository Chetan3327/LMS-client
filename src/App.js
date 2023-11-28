import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import NavBar from './components/NavBar'
import ForgotPassword from './components/ForgotPassword'
import Profile from './pages/Profile'
import Security from './pages/Security'
import { useCookies } from 'react-cookie';
import AccessDenied from './pages/AccessDenied'
import Code from './components/Code'
import Home from './pages/Home'
import VerifyAccount from './components/VerifyAccount'
import ContactUs from './components/ContactUs'
import Courses from './course/Courses'
import Analytics from './creator/Analytics'
import AddCourse from './creator/AddCourse'
import { UserContextProvider } from './context/user-context'
import CreateCourse from './course/CreateCourse'
import DashBoard from './creator/DashBoard'
import EditChapter from './creator/EditChapter'


const App = () => {
  const [cookie] = useCookies(['jwt-access-token'])
  const isAuthenticated = cookie['jwt-access-token']
  return(
    <UserContextProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/code' element={<Code />} />
          <Route path='/verify/' element={<VerifyAccount />} />
          <Route path='/contact/' element={<ContactUs />} />
          <Route path='/courses/' element={<Courses />} />
          <Route path='/analytics/' element={<Analytics />} />
          <Route path='/createCourse/' element={<CreateCourse />} />
          <Route path='/dashboard/' element={<DashBoard />} />
          <Route path='/editCourse/' element={<AddCourse />} />
          <Route path='/editCourse/:courseId' element={<AddCourse />} />
          <Route path='/editChapter/:courseId/:chapterId' element={<EditChapter />} />
          <Route path='/profile/' element={isAuthenticated ? <Profile /> : <AccessDenied />} />
          <Route path='/security/' element={isAuthenticated ? <Security /> : <AccessDenied />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </Router>
    </UserContextProvider>  
  )
}

export default App