import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell, faBellSlash } from "@fortawesome/free-solid-svg-icons";



library.add(faBell, faBellSlash)

function HomeStockTableRow({ s, setUpdate, user }) {
    const [newAmount, setNewAmount] = useState(s.owned || 0)
    const [clickBuy, setClickBuy] = useState(false)
    const [clickSell, setClickSell] = useState(false)
    const [watchlist, setWatchlist] = useState(false)

    const handleClickBuy = () => {
        setClickBuy(true)
    }

    const handleClickSell = () => {
        setClickSell(true)
    }

    const handleCancel = () => {
        setNewAmount(s.owned || 0)
        setClickBuy(false)
        setClickSell(false)
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

        if (newAmount === 0) {
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

        setClickSell(false)
        setUpdate(true)
    }

    let owned
    if (s.owned) {
        if (clickBuy) {
            owned = <td><input id='edit-owned' type="number" min={s.owned} name="amount" value={newAmount} onChange={e => setNewAmount(e.target.value)} /></td>
        } else if (clickSell) {
            owned = <td><input id='edit-owned' type="number" min={0} max={s.owned} name="amount" value={newAmount} onChange={e => setNewAmount(e.target.value)} /></td>
        } else {
            owned = <td>{parseFloat(s.owned).toFixed(2)}</td>
        }
    } else {
        if (clickBuy) {
            owned = <td><input id='edit-owned' type="number" min={0} name="amount" value={newAmount} onChange={e => setNewAmount(e.target.value)} /></td>
        } else {
            owned = <td>0</td>
        }
    }

    let btn
    if (s.owned) {
        if (clickBuy) {
            btn = <td>
                <button onClick={handleBuy}>Buy</button>
                <button onClick={handleCancel}>Cancel</button>
            </td>
        } else if (clickSell) {
            btn = <td>
                <button onClick={handleSell}>Sell</button>
                <button onClick={handleCancel}>Cancel</button>
            </td>
        } else {
            btn = <td>
                <button onClick={handleClickBuy}>Buy</button>
                <button onClick={handleClickSell}>Sell</button>
            </td>
        }
    } else {
        if (clickBuy) {
            btn = <td>
                <button onClick={handleBuy}>Buy</button>
                <button onClick={handleCancel}>Cancel</button>
            </td>
        } else {
            btn = <td><button onClick={handleClickBuy}>Buy</button></td>
        }
    }

    let watched
    if (s.watched) {
        watched = <td><FontAwesomeIcon icon="fa-bell" /></td>
    } else {
        watched = <td><FontAwesomeIcon icon="fa-bell-slash" /></td>
    }

    return (
        <tr>
            <td>{s.name}</td>
            <td>{s.ticker}</td>
            <td>{parseFloat(s.price).toFixed(2)}</td>
            <td>{parseFloat((s.price - s.history) / s.history * 100).toFixed(2)}%</td>
            {owned}
            {btn}
            {watched}
        </tr>
    )
}

export default HomeStockTableRow
