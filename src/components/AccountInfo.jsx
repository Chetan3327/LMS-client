import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


const AccountInfo = ({ initialInfo ,setSection, updateUser }) => {
  const [error, setError] = useState()
  const [profile, setProfile] = useState(initialInfo)
  const fields = Object.keys(profile)
  const disabledList = ['imageUrl', 'password', 'email', '_id', '__v', 'verified', 'otp']
  const handleInput = (e) => {
    setError("")
    const {name, value} = e.target
    setProfile({...profile, [name]: value})
  }
  const handleSubmit = (e) => {
    setError("")
    e.preventDefault()
    const filteredFields = fields.filter((item) => !disabledList.includes(item))
    const hasEmptyField = filteredFields.some(field => !profile[field]);
    if(hasEmptyField){
      setError("Required Fields Missing!")
      return ;
    }
    updateUser(profile)
  }
  return (
    <div className='p-5 min-w-[450px]'>
      <div className='flex justify-between items-start'>
        <h3 className='text-2xl font-semibold'>Account Info</h3>
        {profile.imageUrl && (
        <div className='relative'>
          {profile.imageUrl !== 'None' ? (<img src={profile.imageUrl} alt="profilePic" className='rounded mr-3 mb-1' width={40} />) : (<CgProfile />)}
          <FaEdit className='absolute bottom-0 right-0 cursor-pointer' onClick={() => setSection("profileChange")} />
        </div>)}
      </div>
      <form className='flex flex-col mt-3 items-center gap-3'>
        {fields.filter((field) => !disabledList.includes(field)).map((field, idx) => {
          return(
            <div key={idx} className='w-full'>
              <label htmlFor={field}>{field.toUpperCase()}:</label>
              <input disabled={disabledList.includes(field)} className="outline-none rounded-xl border p-2 w-full" name={field} id={field} type="text" value={profile[field]} placeholder={field} onChange={(e) => handleInput(e)} />
            </div>
          )
        })}
        <button className="bg-primary w-full rounded p-2 mt-2 text-white" onClick={(e) => handleSubmit(e)}>Update Profile</button>
      </form>
      {error && (<div className="text-center border-red-400 p-2 mt-2 border-solid border-2 rounded-xl bg-red-100">{error}</div>)}
    </div>
  )
}

export default AccountInfo
