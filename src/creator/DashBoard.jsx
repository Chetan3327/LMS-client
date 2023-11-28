import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CourseCard from '../course/CourseCard'
import { MdOutlineEdit } from "react-icons/md";
import {useNavigate} from 'react-router-dom'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
const DashBoard = () => {
    const navigate = useNavigate()
    const [courses, setCourses] = useState(null)
    useEffect(() => {
        axios.get(`${BACKEND_URL}/course/created`).then((response) => {
            console.log(response.data)
            setCourses(response.data)
        })  
    }, [])
    return (
        <div className='flex items-center justify-center min-h-screen'>
            {courses && (<div className='bg-slate-200 p-5 flex gap-5 flex-wrap'>
                {courses.map((course, idx) => {
                    return (
                    <div key={idx} className='flex'>
                        <button className='text-white bg-blue-600 p-1 relative top-0 left-0' onClick={() => navigate(`/editCourse/${course._id}`)}><MdOutlineEdit /></button>
                        <CourseCard data={course} />
                    </div>)
                })}
            </div>)}
        </div>
    )
}

export default DashBoard
