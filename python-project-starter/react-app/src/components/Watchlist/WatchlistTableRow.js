import React, { useState, useEffect } from "react";


const WatchlistTableRow = ({ s, setUpdate, user }) => {
    const [newAmount, setNewAmount] = useState(s.priceAlert)
    const [editAlert, setEditAlert] = useState(false)
    const [conDelete, setConDelete] = useState(false)
    const [errors, setErrors] = useState("");

    const handleUpdate = async () => {
        setErrors("")
        if (newAmount === s.priceAlert) {
            setEditAlert(false)
            return
        }

        if (newAmount == 0) {
            setErrors("Please Enter A Value Over 0.");
            return;
        }

        if (newAmount < 0) {
            setErrors("Please Enter A Value Over 0.");
            return;
        }

        if (newAmount === "") {
            setErrors("Please Provide A Valid Price.");
            return;
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
        setErrors("")
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
        <span className="green-btn" onClick={handleUpdate}>Confirm</span>
        <span className="red-btn" onClick={handleCancel}>Cancel</span>
    </td>
    }else if (conDelete) {
        btn = <td className="portfolio-btn-container">
        <span className="green-btn" onClick={handleDelete}>Confirm</span>
        <span className="red-btn" onClick={handleCancel}>Cancel</span>
    </td>
    } else {
        btn = <td className="portfolio-btn-container">
        <span className="green-btn" onClick={clickUpdate}>Update</span>
        <span className="red-btn" onClick={clickDelete}>Remove</span>
    </td>
    }

    let amountField

    if(editAlert) {
        amountField = <td> <p className="watchlist-errors">{errors}</p><input id ='edit-owned' type='number' min={0} name='amount' value={newAmount} onChange={e => setNewAmount(e.target.value)} /></td>
    } else {
        amountField = <td>${parseFloat(s.priceAlert).toFixed(2)}</td>
    }

    return (
        <tr>
            <td>{s.stockName}</td>
            <td>{s.ticker}</td>
            <td>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(s.currentPrice)}</td>
            {amountField}
            {btn}
        </tr>
    )
}

export default WatchlistTableRow
