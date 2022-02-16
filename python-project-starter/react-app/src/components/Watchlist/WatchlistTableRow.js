import React, { useState, useEffect } from "react";


const WatchlistTableRow = ({ s, setUpdate, user }) => {
    const [editAlert, setEditAlert] = useState(false)
    const [conDelete, setConDelete] = useState(false)

    const handleUpdate = () => {
        return
    }

    const clickUpdate = () => {
        setEditAlert(true)
    }

    const handleCancel = () => {
        setEditAlert(false)
        setConDelete(false)
    }

    const clickDelete = () => {
        setConDelete(true)
    }

    const handleDelete = () => {
        return
    }

    let btn
    if (editAlert) {
        btn = <td className="portfolio-btn-container">
        <button className="green-btn" onClick={handleUpdate}>Buy</button>
        <button className="red-btn" onClick={handleCancel}>Cancel</button>
    </td>
    }else if (conDelete) {
        btn = <td className="portfolio-btn-container">
        <button className="green-btn" onClick={handleDelete}>Remove</button>
        <button className="red-btn" onClick={handleCancel}>Cancel</button>
    </td>
    } else {
        btn = <td className="portfolio-btn-container">
        <button className="green-btn" onClick={clickUpdate}>Update</button>
        <button className="red-btn" onClick={clickDelete}>Remove</button>
    </td>
    }

    return (
        <tr>
            <td>{s.stockName}</td>
            <td>{s.ticker}</td>
            <td>${parseFloat(s.currentPrice).toFixed(2)}</td>
            <td>${parseFloat(s.priceAlert).toFixed(2)}</td>
            {btn}
        </tr>
    )
}

export default WatchlistTableRow
