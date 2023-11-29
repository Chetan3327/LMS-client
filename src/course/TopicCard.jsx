import React, { useContext, useState } from 'react'
import {UserContext} from '../context/user-context'
const TopicCard = ({image, topic = 'Programming', active=false}) => {
  const {setCategory, category} = useContext(UserContext)
  return (
    <div className={`bg-white rounded-xl ${category === topic ? 'border-[1px] border-blue-600 bg-blue-50' : ''} flex gap-3 px-4 shadow-md hover:shadow-lg cursor-pointer p-2 items-center font-semibold`}>
      {/* <img src="https://images.assetsdelivery.com/compings_v2/putracetol/putracetol1805/putracetol180502515.jpg" alt="topicIcon" width={30} /> */}
      <span onClick={(e) => setCategory(topic)}>{topic}</span>
    </div>
  )
}

export default TopicCard
