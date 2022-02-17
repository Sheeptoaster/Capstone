import React, { useState, useEffect } from "react";


const WatchlistTableRow = ({ s, setUpdate, user }) => {
    const [newAmount, setNewAmount] = useState(s.priceAlert)
    const [editAlert, setEditAlert] = useState(false)
    const [conDelete, setConDelete] = useState(false)

    
    const handleUpdate = async () => {
        if (newAmount === s.priceAlert) {
            setEditAlert(false)
            return
        }

        const res = await fetch(`/api/watchlists/change/${s.stockId}/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "amount": parseFloat(newAmount)
            })
        })
        setUpdate(true)
        setEditAlert(false)
    }

    const clickUpdate = () => {
        setEditAlert(true)
    }

    const handleCancel = () => {
        setEditAlert(false)
        setConDelete(false)
        setNewAmount(s.priceAlert)
    }

    const clickDelete = () => {
        setConDelete(true)
    }

    const handleDelete = async () => {
        const res = await fetch(`/api/watchlists/change/${s.stockId}/${user.id}`, {
            method: "DELETE"
        })
        setUpdate(true)
        setConDelete(false)
    }

    let btn
    if (editAlert) {
        btn = <td className="portfolio-btn-container">
        <button className="green-btn" onClick={handleUpdate}>Confirm</button>
        <button className="red-btn" onClick={handleCancel}>Cancel</button>
    </td>
    }else if (conDelete) {
        btn = <td className="portfolio-btn-container">
        <button className="green-btn" onClick={handleDelete}>Confirm</button>
        <button className="red-btn" onClick={handleCancel}>Cancel</button>
    </td>
    } else {
        btn = <td className="portfolio-btn-container">
        <button className="green-btn" onClick={clickUpdate}>Update</button>
        <button className="red-btn" onClick={clickDelete}>Remove</button>
    </td>
    }

    let amountField

    if(editAlert) {
        amountField = <td><input id ='edit-owned' type='number' min={0} name='amount' value={newAmount} onChange={e => setNewAmount(e.target.value)} /></td>
    } else {
        amountField = <td>${parseFloat(s.priceAlert).toFixed(2)}</td>
    }

    return (
        <tr>
            <td>{s.stockName}</td>
            <td>{s.ticker}</td>
            <td>${parseFloat(s.currentPrice).toFixed(2)}</td>
            {amountField}
            {btn}
        </tr>
    )
}

export default WatchlistTableRow
