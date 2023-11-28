import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'

const CreateCourse = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${BACKEND_URL}/course`, {title}).then((response) => {
            console.log(response)
            if(response.status === 200){
                navigate(`/editCourse/${response.data.courseId}`)
            }
        })
        
    }
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <form className='bg-slate-200 p-5 flex flex-col gap-3'>
                <input onChange={(e) => setTitle(e.target.value)} className='p-2 outline-none rounded' type="text" placeholder='Course Name' />
                <button onClick={(e) => handleSubmit(e)} className='p-2 px-4 rounded text-white bg-blue-600'>Create Project</button>
            </form>
        </div>
    )
}

export default CreateCourse