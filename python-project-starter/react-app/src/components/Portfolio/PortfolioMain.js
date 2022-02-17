import React, { useEffect, useState } from "react";
import PortfolioTableRow from "./PortfolioTableRow";


const PortfolioMain = ({ user }) => {
    const [stock, setStock] = useState([])
    const [update, setUpdate] = useState(false)

    useEffect(async () => {
        const port_res = await fetch(`/api/portfolios/${user.id}`)
        const data = await port_res.json()
        setStock(data)
        // Function to Fetch Updated Price Information Every n Seconds
        const update = setInterval(async () => {
            const port_res = await fetch(`/api/portfolios/${user.id}`)
            const data = await port_res.json()
            setStock(data)
        }, 5 * 1000)
        // Clears Interval to Prevent Memory Leak
        return () => clearInterval(update)
    }, [])

    useEffect(async () => {
        //Runs Fetch for Updated Price Information When Update is Called On
        const port_res = await fetch(`/api/portfolios/${user.id}`)
        const data = await port_res.json()
        setStock(data)
        
        //Set Update to False Allow Conditional Calls in Same Component to Continue to Work
        setUpdate(false)
    }, [update])

    return (
        <div className="portfolio-container">
            <table>
                <thead>
                    <tr>
                        <th className="stock-name-header">Name</th>
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
