import React from 'react'

const Display = ({Component, data}) => {
  return (
    <div className='flex items-center gap-4 bg-white p-5 w-[90%] px-[5%] border-[1px] border-[#ccc] rounded-lg my-6'>
      {data.map((item, idx) => {
        return(<Component key={idx} isCurrentUser={isCurrentUser} data={item} />)
      })}
    </div>
  )
}

export default Display
