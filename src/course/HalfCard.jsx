import React from 'react'

const HalfCard = ({icon, title, value, color='text-black'}) => {
    return (
        <div className="bg-white border-[1px] flex-col border-bgcolor flex gap-3 p-5  w-[49%]">
            <div className={`flex items-center gap-3 font-semibold ${color}`}>
                {icon}
                {title}
            </div>
            <span className='pl-5'>{value}</span>
        </div>
    )
}

export default HalfCard
