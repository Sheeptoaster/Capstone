import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import HomeStockTableRow from './HomeStockTableRow'

function StockOverview() {
    const [stocks, setStocks] = useState([])
    const user = useSelector(state => state.session.user)
    const [update, setUpdate] = useState(false)

    useEffect(async () => {
        const res = await fetch("/api/stocks/all")
        const data = await res.json()
        setStocks(data)
        setUpdate(false)
    }, [update])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Ticker</th>
                        <th>Price</th>
                        <th>Day Gain/Loss</th>
                        <th>Owned</th>
                        <th>Buy/Sell</th>
                        <th>Watchlist</th>
                    </tr>
                </thead>
                {Object.values(stocks).map(s => (
                    <tbody key={s.id}>
                        <HomeStockTableRow s={s} setUpdate={setUpdate} user={user}/>
                    </tbody>
                ))}
            </table>
        </div>
    )
}

export default StockOverview
