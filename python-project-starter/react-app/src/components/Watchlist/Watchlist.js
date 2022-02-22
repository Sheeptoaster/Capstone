import React, { useEffect, useRef, useState } from 'react'
import WatchlistTableRow from './WatchlistTableRow'

function Watchlist({ user }) {
    const [stock, setStock] = useState([])
    const [update, setUpdate] = useState(false)
    const isMounted = useRef(false)

    useEffect(() => {
        return () => isMounted.current = true
    }, [])

    useEffect(async () => {
        const watch_res = await fetch(`/api/watchlists/${user.id}`)
        const data = await watch_res.json()
        setStock(data)
        if (isMounted) {
            const update = setInterval(async () => {
                const watch_res = await fetch(`/api/watchlists/${user.id}`)
                const data = await watch_res.json()
                if (isMounted.current) return;
                setStock(data)
            }, 30 * 1000)
            return () => clearInterval(update)
        }
    }, [])

    useEffect(async () => {
        const watch_res = await fetch(`/api/watchlists/${user.id}`)
        const data = await watch_res.json()
        setStock(data)
        setUpdate(false)
    }, [update])

    return (
        <div className="portfolio-container">
            <table>
                <thead>
                    <tr>
                        <th className='stock-name-header'>Name</th>
                        <th>Ticker</th>
                        <th>Current Price</th>
                        <th>Alert Price</th>
                        <th className="options-header">Options</th>
                    </tr>
                </thead>
                {Object.values(stock)?.map(s => (
                    <tbody key={s.id}>
                        <WatchlistTableRow s={s} setUpdate={setUpdate} user={user} />
                    </tbody>
                ))}
            </table>
        </div>
    )
}

export default Watchlist
