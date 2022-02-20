import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'


ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
)



function TopGrowthChart({ stock, d, w }) {

    const [chart, setChart] = useState([])

    useEffect(async () => {
        const fetchData = async () => {
            await fetch(`/api/stocks/growth/${stock.id}`).then(res => {
                res.json().then((json) => {
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
            label: 'Price',
            data: chart.map(y => y.y),
            borderColor: [
                '#46AEEF',
            ],
            pointBackgroundColor: [
                "#293F90"
            ],
            pointHoverRadius: 4,
            pointRadius: 3,
            tension: 0.1,
            borderWidth: 2,
        }],
    }


    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false
            }
        },
        legend: {
            fontSize: 15,
            boxWidth: 30,
        },
        responsive: true,
    }

    let banner
    if (d === 'l') {
        banner = <h2 className='h2-chart-decrease'>Biggest Price Drop</h2>
    } else if (d === "g") {
        banner = <h2 className='h2-chart-increase'>Biggest Price Increase</h2>
    } else {
        banner = <h2></h2>
    }

    return (
        <>
                <div className='stock-chart-container'>
                    {banner}
                    <div className='stock-chart-stock-info'>
                        <span className='stock-chart-stock-name'>{stock.name}</span>
                        <span className='stock-chart-stock-ticker'>{stock.ticker}</span>
                        <span className='stock-chart-stock-price'>{parseFloat(stock.price).toFixed(2)}</span>
                    </div>
                    <div>
                        <Line
                            data={data}
                            options={options}
                            height={450}
                            width={w}
                        />
                    </div>
                </div>
        </>
    )
}

export default TopGrowthChart
