import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { UserContext } from '../context/user-context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditChapter = () => {
  const navigate = useNavigate()
  const {courseId, chapterId} = useParams()
  const {BACKEND_URL} = useContext(UserContext)
  const [chapter, setChapter] = useState({})
  useEffect(() => {
    axios.get(`${BACKEND_URL}/chapter/${courseId}/${chapterId}`).then((response) => {
      console.log(response)
      setChapter(response.data)
    })
  }, [courseId, chapterId])
  const handleInput = (e) => {
    const {name, value} = e.target
    setChapter({...chapter, [name]: value})
    console.log(chapter)
  }

  const handleSubmit = (e, action) => {
    e.preventDefault()
    console.log(`${BACKEND_URL}/chapter/${chapterId}`)
    console.log(chapter)
    const requestConfig = action === 'delete' ? axios.delete : axios.put
    requestConfig(`${BACKEND_URL}/chapter/${chapterId}`, chapter).then((response) => {
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
    <div className='flex items-center justify-center min-h-screen px-10'>
        <div className='flex gap-5 w-[95%]'>
            <div className='flex flex-col gap-6 w-[95%] h-[95%] bg-slate-200 rounded p-5'>
              <div className='flex justify-around items-center'>
                <p className='border-[1px] border-red-600 bg-red-100 rounded p-2 px-4'>Chapter Id: {chapterId}</p>
                <button className='p-2 px-4 rounded bg-red-600 text-white' onClick={(e) => handleSubmit(e, 'delete')}>Delete</button>
              </div>
              <div className='flex flex-col gap-2 w-full'>
                  <input onChange={(e) => handleInput(e)} value={chapter.title} className='outline-none p-2' name='title' type="text" placeholder='Chapter Title' />
                  <input onChange={(e) => handleInput(e)} value={chapter.description} className='outline-none p-2' name='description' type="text" placeholder='Chapter Description ' />
                  <input onChange={(e) => handleInput(e)} value={chapter.access} className='outline-none p-2' name='access' type="text" placeholder='Chapter Access' />
                  <input onChange={(e) => handleInput(e)} value={chapter.video} className='outline-none p-2' name='video' type="text" placeholder='Chapter video' />
                  <button onClick={(e) => handleSubmit(e, 'edit')} className='px-4 p-2 bg-blue-600 text-white'>Submit</button>
              </div>
            </div>
            <ToastContainer />
        </div>
    </div>
  )
}

export default EditChapter
