import React, { useEffect, useState } from "react";
import PortfolioTableRow from "./PortfolioTableRow";


const PortfolioMain = ({ user }) => {
    const [stock, setStock] = useState([])
    const [update, setUpdate] = useState(false)

    useEffect(async () => {
        const port_res = await fetch(`/api/portfolios/${user.id}`)
        const data = await port_res.json()
        setStock(data)
        const update = setInterval(async () => {
            const port_res = await fetch(`/api/portfolios/${user.id}`)
            const data = await port_res.json()
            setStock(data)
        }, 5 * 1000)
        return () => clearInterval(update)
    }, [])

    useEffect(async () => {
        const port_res = await fetch(`/api/portfolios/${user.id}`)
        const data = await port_res.json()
        setStock(data)
        setUpdate(false)
    }, [update])

    return (
        <div className="portfolio-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Ticker</th>
                        <th>Current Price</th>
                        <th>Owned</th>
                        <th>Purchase Price</th>
                        <th>Gain/Loss</th>
                        <th className="options-header">Options</th>
                    </tr>
                </thead>
                {Object.values(stock)?.map(s => (
                    <tbody key={s.id}>
                        <PortfolioTableRow s={s} setUpdate={setUpdate} user={user}/>
                    </tbody>
                ))}
            </table>
        </div>
    )
}

export default PortfolioMain
