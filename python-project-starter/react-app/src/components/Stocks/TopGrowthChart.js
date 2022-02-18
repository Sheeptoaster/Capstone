import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2'


ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)


function TopGrowthChart({ stock }) {

    const [chart, setChart] = useState([])

    useEffect(async () => {
        const fetchData = async () => {
            await fetch(`/api/stocks/growth/${stock.id}`).then(res => {
                res.json().then((json) => {
                    console.log(json)
                    setChart(json)
                })
            }).catch(error => {
                console.log(error)
            })
        }
        fetchData()
    }, [])

    const data = {
        labels: chart.map(x => x.x),
        datasets: [{
            label: '# of Votes',
            data: chart.map(y => y.y),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    }

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false
            }
        },
        legend: {
            fontSize: 15
        }
    }

    return (
        <div>
            <Line
                data={data}
                options={options}
                height={450}
                width={600}
            />
        </div>
    )
}

export default TopGrowthChart
