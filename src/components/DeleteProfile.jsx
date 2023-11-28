import React, { useState } from 'react'

const DeleteProfile = ({deleteAccount, userId}) => {
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const handleInput = (e) => {
    setError("")
    setInput(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(input !== userId){
      setError("Wrong UserId as Input")
      return;
    }
    deleteAccount()
  }

  return (
    <div className='p-5 min-w-[450px]'>
      <h3 className='text-2xl font-semibold'>Delete Profile</h3>
      <p className='my-2'>Enter User Id to delete the account {userId}</p>
      <form className='flex flex-col items-center gap-3'>
        <input className="outline-none rounded-xl border p-2 w-full" name="userid" id='userId' type="text" placeholder="UserId" onChange={(e) => handleInput(e)} />
        <button className="bg-red-600 w-full rounded p-2 text-white" onClick={(e) => handleSubmit(e)}>Delete Account</button>
      </form>
      {error && (<div className="text-center border-red-400 p-2 mt-2 border-solid border-2 rounded-xl bg-red-100">{error}</div>)}
    </div>
  )
}

export default DeleteProfile
