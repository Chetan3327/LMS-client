import React, { useState } from 'react'
const TopicCard = ({image, topic, active=false}) => {
  return (
    <div className={`bg-white rounded-xl ${active ? 'border-[1px] border-blue-600 bg-blue-50' : ''} flex gap-3 px-4 shadow-md hover:shadow-lg cursor-pointer p-2 items-center font-semibold`}>
      <img src="https://images.assetsdelivery.com/compings_v2/putracetol/putracetol1805/putracetol180502515.jpg" alt="topicIcon" width={30} />
      <span>Programming</span>
    </div>
  )
}

export default TopicCard
