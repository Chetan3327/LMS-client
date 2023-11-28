import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { FaAddressCard, FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
  const handleInput = () => {

  }
  const handleSubmit = () => {

  }
  return (
    <div className="bg-gray-50 min-h-screen gap-10 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white flex flex-col gap-2 shadow-lg max-w-3xl p-7 items-center rounded">
          <h3 className='text-3xl font-semibold'>Contact Us</h3>
          <p className='text-gray-400 '>Thank you for reaching out to us! We're here to assist you.</p>
          <form className='flex flex-col w-full gap-3'>
            <input className="outline-none rounded-xl border p-2 mt-3 " name="name" type="text" placeholder="name" onChange={(e) => handleInput(e)} />
            <input className="outline-none rounded-xl border p-2 " name="email" type="email" placeholder="email" onChange={(e) => handleInput(e)} />
            <textarea className='outline-none rounded-xl border p-2' placeholder='query...' />
            <button className='bg-primary p-2 px-4 text-white rounded w-full' onClick={(e) => handleSubmit(e)}>Submit</button>
          </form>
      </div>
      <div className="bg-white flex flex-col gap-2 shadow-lg max-w-3xl p-7  rounded">
        <p className='text-xl'>Contact Information</p>
        <p className='text-gray-400 '>You can contact us at!.</p>
        <div className='flex flex-col gap-2 mt-2'>
          <span className='flex gap-2 items-center'>
            <MdOutlineEmail /> <a href="mailto:chauhanchetan12789@gmail.com">chauhanchetan12789@gmail.com</a>
          </span>
          <span className='flex gap-2 items-center'>
            <FaPhoneAlt /> <a href="telto:9211273327">+91-9211273327</a>
          </span>
          <span className='flex gap-2 items-center'>
            <FaAddressCard /> 123 Main Street, Cityville, State, ZIP
          </span>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
