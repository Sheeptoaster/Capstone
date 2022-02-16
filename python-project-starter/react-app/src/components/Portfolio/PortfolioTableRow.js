import React, { useState, useEffect } from "react";


const PortfolioTableRow = ({ s, setUpdate, user }) => {
    const [newAmount, setNewAmount] = useState(s.count)
    const [stockId, setStockId] = useState('')
    const [editBuy, setEditBuy] = useState(false)
    const [editSell, setEditSell] = useState(false)
    const [editContent, setEditContent] = useState(false)


    const clickBuy = () => {
        setEditContent(true)
        setEditBuy(true)
    }

    const clickSell = () => {
        setEditContent(true)
        setEditSell(true)
    }

    const handleBuy = async () => {
        const res = await fetch(`/api/portfolios/add/${user.id}/${stockId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "amount": newAmount
            })
        })
        setUpdate(true)
        setEditBuy(false)
        setEditContent(false)
    }

    const handleSell = async () => {
        setEditSell(false)
        setEditContent(false)
        return
    }

    const handleCancel = () => {
        if (editBuy) setEditBuy(false)
        if (editSell) setEditSell(false)
        setEditContent(false)
    }


    let btn;

    if (editBuy) {
        btn = <td>
        <button onClick={handleBuy}>Buy</button>
        <button onClick={handleCancel}>Cancel</button>
    </td>
    } else if (editSell) {
        btn = <td>
        <button onClick={handleSell}>Sell</button>
        <button onClick={handleCancel}>Cancel</button>
    </td>
    } else {
        btn = <td>
                <button onClick={clickBuy}>Buy</button>
                <button onClick={clickSell}>Sell</button>
            </td>
    }

    let amountField

    if (editContent) {
        amountField = <td><input name="amount" value={newAmount} onChange={e => setNewAmount(e.target.value)}/></td>
    } else {
        amountField = <td>{parseFloat(s.count).toFixed(3)}</td>
    }

    return (
        <tr>
            <td>{s.stockName}</td>
            <td>{s.ticker}</td>
            <td>${parseFloat(s.currentPrice).toFixed(2)}</td>
            {amountField}
            <td>${parseFloat(s.purchasePrice).toFixed(2)}</td>
            <td>{parseFloat((s.currentPrice - s.purchasePrice) / s.purchasePrice * 100).toFixed(2)}%</td>
            {btn}
        </tr>
    )
}


export default PortfolioTableRow
