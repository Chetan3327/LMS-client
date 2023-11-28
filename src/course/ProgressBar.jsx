import React from 'react'

const ProgressBar = ({value = 90}) => {
  const bgColor = (value === 100) ? 'bg-green-600' : 'bg-blue-600'
  return (
    <div className='w-full bg-gray-200 rounded-full h-2.5'>
        <div className={`h-2.5 rounded-full ` + bgColor} style={{width: `${value}%`}}></div>
    </div>
  )
}

export default ProgressBar
