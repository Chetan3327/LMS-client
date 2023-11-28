import React, { useState } from 'react'
import CourseCard from '../course/CourseCard'
import { CiMoneyBill } from "react-icons/ci";
import { BiSolidCoinStack } from "react-icons/bi";
import TopicCard from '../course/TopicCard'
import HalfCard from '../course/HalfCard';
import BarChart from './BarChart';

const ChartData = [
  {
    title: 'SQL for Beginners',
    downloads: 2,
    price: 100
  },
  {
    title: 'Python for Beginners',
    downloads: 3,
    price: 75
  },
  {
    title: 'JS for Beginners',
    downloads: 2,
    price: 100
  },
  {
    title: 'JS Advance',
    downloads: 1,
    price: 175
  }
]

const Analytics = () => {
    const [data, setData] = useState({
      labels: ChartData.map((item, idx) => item.title),
      datasets: {
        label: "Total Sales",
        data: ChartData.map((item, idx) => item.price * item.downloads)
      }
    })
    const getTotal = (data) => {
      const total = data.reduce((acc, curr) => {
        return acc + curr.downloads * curr.price
      }, 0)
      return total
    }
    return (
        <div className="bg-white items-center justify-center flex min-h-screen">
            <div className='flex flex-col gap-6 w-[95%] mt-14 bg-slate-200 p-5'>
                <div className='flex flex-wrap gap-4'>
                    <HalfCard title='Revenue' value={'$ ' + getTotal(ChartData)} icon={<CiMoneyBill />} color='text-blue-600' />
                    <HalfCard title='Total Sales' value='9' icon={<BiSolidCoinStack />} color='text-green-600' />
                </div>

                <div className='bg-white py-10 p-5'>
                  <BarChart ChartData={data} />
                </div>
            </div>
        </div>
    )
}

export default Analytics
