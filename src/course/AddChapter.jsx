import React, { useState, useContext } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import CourseCard from '../course/CourseCard'
import { UserContext } from '../context/user-context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddChapter = () => {
    const {chapterId} = useParams()
    const {BACKEND_URL} = useContext(UserContext)
    const [chapter, setChapter] = useState({})
    const handleInput = (e) => {
        const {name, value} = e.target
        setChapter({...chapter, [name]: value})
        console.log(chapter)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`${BACKEND_URL}/chapter/${chapterId}`)
        console.log(chapter)
        return
        axios.put(`${BACKEND_URL}/chapter/${chapterId}`).then((response) => {
        if(response.status === 200){
            toast.success(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: "colored"
            });
        }
        }).catch((error) => {
        if (error.message === 'Network Error') {
            toast.error('Oops! Something went wrong.', {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: "colored"
            });
        } else {
            toast.error(error.response.data.error, {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: "colored"
            });
        }
        })
    }
    return (
        // title, description, access, video, courseId
        <div className='flex items-center justify-center min-h-screen px-10'>
            <div className='flex gap-5 w-[95%]'>
                <div className='flex gap-6 w-[95%] h-[95%] bg-slate-200 rounded p-5'>
                    <div className='flex flex-col gap-2 w-full'>
                        <input onChange={(e) => handleInput(e)} className='outline-none p-2' name='title' type="text" placeholder='Chapter Title' />
                        <input onChange={(e) => handleInput(e)} className='outline-none p-2' name='description' type="text" placeholder='Chapter Description ' />
                        <input onChange={(e) => handleInput(e)} className='outline-none p-2' name='access' type="text" placeholder='Chapter Access' />
                        <input onChange={(e) => handleInput(e)} className='outline-none p-2' name='video' type="text" placeholder='Chapter video' />
                        <button onClick={(e) => handleSubmit(e)} className='px-4 p-2 bg-blue-600 text-white'>Submit</button>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default AddChapter
