import React, { useEffect, useState, useContext } from 'react'
import CourseCard from './CourseCard'
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import TopicCard from './TopicCard'
import { FaRegClock } from "react-icons/fa6";
import HalfCard from './HalfCard';
import axios from 'axios'
import {UserContext} from '../context/user-context'
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
const Courses = () => {
    const {search, category} = useContext(UserContext)
    console.log(category)
    const [courses, setCourses] = useState(null)
    const filteredCourses = courses?.filter((course, idx) => {
        const titleMatches = course.title.toLowerCase().includes(search.toLowerCase())
        const categoryMatches = category !== 'All' ? course.category === category : true
        return titleMatches && categoryMatches
    })

    const categories = [...new Set(courses?.map((course, idx) => course.category))]

    console.log(categories)
    console.log(filteredCourses)
    useEffect(() => {
        axios.get(`${BACKEND_URL}/course`).then((response) => {
            console.log(response)
            setCourses(response.data)
        })
    }, [])
    return (
        <div className="bg-white items-center justify-center flex min-h-screen">
            <div className='flex flex-col gap-6 w-[95%] mt-14 bg-slate-200 rounded p-5'>
                {/* <div className='flex flex-wrap gap-4'>
                    <HalfCard title='In Progress' value='3 courses' icon={<FaRegClock />} color='text-blue-600' />
                    <HalfCard title='Completed' value='3 courses' icon={<IoCheckmarkDoneCircleOutline />} color='text-green-600' />
                </div> */}
                <div className='flex flex-wrap gap-4'>
                    <TopicCard topic={'All'} />
                    {categories.map((category, idx) => {
                        return <TopicCard key={idx} topic={String(category)} />
                    })}
                </div>

                {courses &&  (<div className='flex flex-wrap gap-4'>
                    {filteredCourses.map((course, idx) =>{
                        return <CourseCard data={course} key={idx} />
                    })}
                    {filteredCourses.length === 0 && (<p>No Course Found.</p>)}
                </div>)}
            </div>
        </div>
    )
}

export default Courses
