import React from 'react'
import { FaBook } from "react-icons/fa6";
import ProgressBar from './ProgressBar';

const CourseCard = ({data}) => {
    const {image="https://cdn.fordhamram.com/wp-content/uploads/Best-Online-SQL-Courses-scaled.jpg", title = 'SQL for Beginners', category='Programming', chapters, progress, price=90.00, purchased = false} = data || {}
    return (
        <div className='bg-white p-5 shadow-lg cursor-pointer hover:shadow-xl border-[1px] border-bgcolor'>
            <img width={200} src={image} alt="CourseCard" />
            <h2 className='font-semibold text-xl mt-3'>{title}</h2>
            <span className='opacity-60 text-sm'>{category}</span>
            <div className='flex gap-3 my-4 items-center text-sm text-blue-600'>
                <FaBook />
                <span>{chapters?.length} Chapters</span>
            </div>
            {purchased ? (
            <div className='flex flex-col gap-1'>
                <ProgressBar value={50} />
                <span className='text-sm text-blue-600 font-semibold'>50% Complete</span>
            </div>) : (
            <span className='font-semibold'>$ {price}</span>
            )}
        </div>
    )
}

export default CourseCard
