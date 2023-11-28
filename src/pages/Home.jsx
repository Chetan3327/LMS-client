import React, { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect';
import {useNavigate} from 'react-router-dom';
import Code from '../components/Code'
import CourseCard from '../course/CourseCard';
import TopicCard from '../course/TopicCard';
import SearchInput from '../course/SearchInput';

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-rose-100 to-teal-100'>
      <div className='flex flex-col items-center max-w-[900px] text-center'>
        <h2 className='text-primary text-5xl font-bold leading-tight'>Unlock the Full Potential of Your Skills</h2>
        <div className='flex gap-3 items-center'>
          <h1 className='text-4xl font-bold text-black'>Join millions of </h1>
          <div className='text-4xl my-4 font-bold bg-gradient-to-r from-[#6363F1] via-[#00A6E2] to-[#20E7C8] text-transparent bg-clip-text'>
            <Typewriter options={{ strings: ['developers.', 'students.'], autoStart: true, loop: true}}/>
          </div>
        </div>
        <p className='text-gray-600 leading-relaxed mb-3'>Elevate your career with our platform that empowers tech enthusiasts. Whether you're a candidate refining your technical prowess or a company in search of top-tier talent, we're dedicated to propelling your success.</p>
        <button className='bg-primary text-white my-3 p-2 px-4 rounded shadow-sm hover:bg-white hover:text-primary hover:border-primary duration-300 border-2' onClick={() => navigate('/register')}>Get Started Today</button>
        <p className='text-gray-500'>Join a global community of developers and over 3,000 companies already benefiting from our platform.</p>
      </div>
      {/* <Code filename='Home.jsx' />
      <Code /> */}
      {/* <CourseCard />
      <TopicCard />
      <SearchInput /> */}
    </div>
  )
}

export default Home
