import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell, faBellSlash } from "@fortawesome/free-solid-svg-icons";
import TopGrowthChart from './TopGrowthChart';
import './HomeStockTableRow.css';

library.add(faBell, faBellSlash)

function HomeStockTableRow({ s, setUpdate, user }) {
    const [newAmount, setNewAmount] = useState(s.owned || 0)
    const [clickBuy, setClickBuy] = useState(false)
    const [clickSell, setClickSell] = useState(false)
    const [watchlist, setWatchlist] = useState(false)
    const [priceAlert, setPriceAlert] = useState(0)
    const [showChart, setShowChart] = useState(false)
    const [errors, setErrors] = useState("")

    const handleClickBuy = () => {
        setClickBuy(true)
    }

    const handleClickSell = () => {
        setClickSell(true)
    }

    const handleCancel = () => {
        setNewAmount(s.owned || 0)
        setPriceAlert(0)
        setWatchlist(false)
        setClickBuy(false)
        setClickSell(false)
        setErrors("")
    }

    const handleBuy = async () => {
        if (newAmount === s.owned || newAmount === 0) {
            setClickBuy(false)
            return
        }
        if (s.owned > 0) {
            const res = await fetch(`/api/stocks/buy/${s.id}/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "amount": parseFloat(newAmount)
                })
            })
        } else {
            const res = await fetch(`/api/stocks/buy/${s.id}/${user.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "amount": parseFloat(newAmount)
                })
            })
        }
        setUpdate(true)
        setClickBuy(false)
    }

    const handleSell = async () => {
        if (newAmount === s.owned) {
            setClickSell(false)
            return
        }

        if (newAmount == 0) {
            const res = await fetch(`/api/stocks/sell/${s.id}/${user.id}`, {
                method: "DELETE"
            })
        } else {
            const res = await fetch(`/api/stocks/sell/${s.id}/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "amount": parseFloat(newAmount)
                })
            })
        }
        setUpdate(true)
        setClickSell(false)
    }

    const handleChart = () => {
        setShowChart(!showChart)
    }

    let owned
    if (s.owned) {
        if (clickBuy) {
            owned = <td><input id='edit-owned' type="number" min={s.owned} name="amount" value={newAmount} onChange={e => setNewAmount(e.target.value)} /></td>
        } else if (clickSell) {
            owned = <td><input id='edit-owned' type="number" min={0} max={s.owned} name="amount" value={newAmount} onChange={e => setNewAmount(e.target.value)} /></td>
        } else {
            owned = <td onClick={handleChart}>{parseFloat(s.owned).toFixed(2)}</td>
        }
    } else {
        if (clickBuy) {
            owned = <td ><input id='edit-owned' type="number" min={0} name="amount" value={newAmount} onChange={e => setNewAmount(e.target.value)} /></td>
        } else {
            owned = <td onClick={handleChart}>0</td>
        }
    }

    let btn
    if (s.owned) {
        if (clickBuy) {
            btn = <td className='portfolio-btn-container'>
                <span className="green-btn" onClick={handleBuy}>Buy</span>
                <span className="red-btn" onClick={handleCancel}>Cancel</span>
            </td>
        } else if (clickSell) {
            btn = <td className='portfolio-btn-container'>
                <span className="red-btn" onClick={handleSell}>Sell</span>
                <span className="red-btn" onClick={handleCancel}>Cancel</span>
            </td>
        } else {
            btn = <td className='portfolio-btn-container'>
                <span className="green-btn" onClick={handleClickBuy}>Buy</span>
                <span className="red-btn" onClick={handleClickSell}>Sell</span>
            </td>
        }
    } else {
        if (clickBuy) {
            btn = <td className='portfolio-btn-container'>
                <span className="green-btn" onClick={handleBuy}>Buy</span>
                <span className="red-btn" onClick={handleCancel}>Cancel</span>
            </td>
        } else {
            btn = <td className='portfolio-btn-container'><span className="green-btn" onClick={handleClickBuy}>Buy</span></td>
        }
    }

    const handleWatchClick = () => {
        setWatchlist(true)
    }
    const handleUnwatch = async () => {
        const res = await fetch(`/api/watchlists/change/${s.id}/${user.id}`, {
            method: "DELETE"
        })
        setPriceAlert(0)
        setUpdate(true)
    }

    const handleEditAlert = async () => {
        if (priceAlert === 0) {
            setErrors("Please Enter A Value Over 0.")
            return
        }
        const res = await fetch(`/api/watchlists/create/${s.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "alert": parseFloat(priceAlert)
            })
        })

        setUpdate(true)
        setWatchlist(false)
    }

    let watched

    if (s.watched) {
        watched = <td><FontAwesomeIcon icon="fa-bell" onClick={handleUnwatch} className='watchlist-bell' /></td>
    } else {
        if (watchlist) {
            watched = <td>
                <p className='watchlist-errors'>{errors}</p>
                <input className='price-alert' id="edit-owned" name="price-alert" type='number' min={0} value={priceAlert} onChange={e => setPriceAlert(e.target.value)} />
                <span className='green-btn' onClick={handleEditAlert}>Submit</span>
                <span className='red-btn' onClick={handleCancel}>Cancel</span>
            </td>
        } else {
            watched = <td onClick={handleWatchClick}><FontAwesomeIcon icon="fa-bell-slash" className='watchlist-bell' /></td>
        }
    }


    let gains

    if (parseFloat((s.price - s.history) / s.history * 100).toFixed(2) < 0) {
        gains = <td id="portfolio-stock-loss" onClick={handleChart} >{parseFloat((s.price - s.history) / s.history * 100).toFixed(2)}%</td>
    } else if (parseFloat((s.price - s.history) / s.history * 100).toFixed(2) > 0) {
        gains = <td id="portfolio-stock-profit" onClick={handleChart} >{parseFloat((s.price - s.history) / s.history * 100).toFixed(2)}%</td>
    } else {
        gains = <td>N/A</td>
    }



    let chart

    if (showChart) {
        chart = <tr><td colSpan={7}><TopGrowthChart stock={s} d={""} w={1325} /></td></tr>
    } else {
        chart = <></>
    }

    return (
        <>
            <tr>
                <td onClick={handleChart}>{s.name}</td>
                <td onClick={handleChart}>{s.ticker}</td>
                <td onClick={handleChart}>{parseFloat(s.price).toFixed(2)}</td>
                {gains}
                {owned}
                {btn}
                {watched}
            </tr>
            {chart}
        </>
    )
}

export default HomeStockTableRow
