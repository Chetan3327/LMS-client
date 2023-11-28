import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

  
const BarChart = ({ChartData}) => {
    const data = {
        labels: ChartData.labels,
        datasets: [
          {
            label: "Total Sales",
            data: ChartData.datasets.data,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)', 
            borderWidth: 1, 
          }
        ]
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Courses',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Total Sales',
            },
          },
        },
      };
  return (
      <div className='md:w-[50%]' style={{ height: '400px', margin: 'auto' }}>
          <Bar data={data} options={options}/>
      </div>
  )
}

export default BarChart
