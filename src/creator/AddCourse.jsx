import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import CourseCard from '../course/CourseCard'
import { UserContext } from '../context/user-context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCourse = () => {
  const navigate = useNavigate()
  const {courseId} = useParams()
  const [title, setChapterName] = useState('')
  const {BACKEND_URL} = useContext(UserContext)
  const [course, setCourse] = useState({chapters: ['']})
  useEffect(() => {
    axios.get(`${BACKEND_URL}/course/${courseId}`).then((response) => {
      console.log(response)
      setCourse(response.data)
    })
  }, [courseId])
  const handleInput = (e) => {
    const {name, value} = e.target
    setCourse({...course, [name]: value})
    console.log(course)
  }
  const handleSubmit = (e, action) => {
    e.preventDefault()
    console.log(`${BACKEND_URL}/course/${courseId}`)
    console.log(course)
    const requestConfig = action === 'delete' ? axios.delete : axios.put
    requestConfig(`${BACKEND_URL}/course/${courseId}`, course).then((response) => {
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
  const addChapter = (e) => {
    e.preventDefault()
    if(title === ''){
      console.log('chapter name empty')
      return
    }
    const formData = {title: title}
    console.log(formData)
    axios.post(`${BACKEND_URL}/chapter/${courseId}`, formData).then((response) => {
      console.log(response)
      toast.success('New Chapter Created', {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "colored"
      });
    }).catch((error) => {
      console.log(error)
      if (error.message === 'Network Error') {
        toast.error('Oops! Something went wrong.', {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "colored"
        });
      } else {
        toast.error(error.response?.data?.error, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "colored"
        });
      }
    })
  }
  return (
    // title, image, description, category, price, purchases, chapters
    <div className='flex items-center justify-center min-h-screen px-10'>
        <div className='flex gap-5 w-[95%]'>
            <div className='flex flex-col gap-6 w-[95%] h-[95%] bg-slate-200 rounded p-5'>
              <div className='flex justify-around items-center'>
                <p className='border-[1px] border-red-600 bg-red-100 rounded p-2 px-4'>Course Id: {courseId}</p>
                <button className='p-2 px-4 rounded bg-red-600 text-white' onClick={(e) => handleSubmit(e, 'delete')}>Delete</button>
              </div>
              <div className='flex flex-col gap-2 w-full'>
                  <input onChange={(e) => handleInput(e)} value={course.title} className='outline-none p-2' name='title' type="text" placeholder='Course Title' />
                  <input onChange={(e) => handleInput(e)} value={course.image} className='outline-none p-2' name='image' type="text" placeholder='Course Image' />
                  <input onChange={(e) => handleInput(e)} value={course.description} className='outline-none p-2' name='description' type="text" placeholder='Course Description ' />
                  <input onChange={(e) => handleInput(e)} value={course.category} className='outline-none p-2' name='category' type="text" placeholder='Course Category' />
                  <input onChange={(e) => handleInput(e)} value={course.price} className='outline-none p-2' name='price' type="number" placeholder='Course Price' />

                  {course.chapters && (<div>
                    {course.chapters.map((chapter, idx) => {
                      return(
                        <div>
                          <span>{chapter.title}</span>
                          <button onClick={() => navigate(`/editChapter/${courseId}/${chapter._id}`)} className='p-2 px-4 text-white bg-black rounded'>Edit</button>
                        </div>
                      )
                    })}
                  </div>)}
                  <input onChange={(e) => setChapterName(e.target.value)} className='outline-none p-2' type="text" placeholder='New Chapter' />
                  <button onClick={(e) => addChapter(e)} className='px-4 p-2 bg-black text-white'>Add Chapter</button>

                  <button onClick={(e) => handleSubmit(e, 'edit')} className='px-4 p-2 bg-blue-600 text-white'>Submit</button>
              </div>
            </div>
            <ToastContainer />
        </div>
        <CourseCard data={course} />
    </div>
  )
}

export default AddCourse
