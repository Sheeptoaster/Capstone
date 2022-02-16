import React, { useState, useEffect } from "react";


const PortfolioTableRow = ({ s, setUpdate, user }) => {
    const [newAmount, setNewAmount] = useState(s.count)
    const [editBuy, setEditBuy] = useState(false)
    const [editSell, setEditSell] = useState(false)
    const [editContentBuy, setEditContentBuy] = useState(false)
    const [editContentSell, setEditContentSell] = useState(false)



    const clickBuy = () => {
        setEditContentBuy(true)
        setEditBuy(true)
    }

    const clickSell = () => {
        setEditContentSell(true)
        setEditSell(true)
    }

    const handleBuy = async () => {
        const res = await fetch(`/api/portfolios/add/${s.stockId}/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "amount": parseFloat(newAmount)
            })
        })
        setUpdate(true)
        setEditBuy(false)
        setEditContentBuy(false)
    }
    const handleSell = async () => {
        if (newAmount == 0) {
            const sell_res = await fetch(`/api/portfolios/sell/${s.stockId}/${user.id}`, {
                method: "DELETE"
            })
            setEditSell(false)
            setEditContentSell(false)
            return
        }

        const sell_some_res = await fetch(`/api/portfolios/sell/${s.stockId}/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "amount": parseFloat(newAmount)
            })
        })
        setEditSell(false)
        setEditContentSell(false)
        return
    }

    const handleCancel = () => {
        if (editBuy) setEditBuy(false)
        if (editSell) setEditSell(false)
        setEditContentBuy(false)
        setEditContentSell(false)
        setNewAmount(s.count)
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

    if (editContentBuy) {
        amountField = <td><input type="number" min={s.count} name="amount" value={newAmount} onChange={e => setNewAmount(e.target.value)}/></td>
    } else if (editContentSell) {
        amountField = <td><input type="number" min={0} max={s.count} name="amount" value={newAmount} onChange={e => setNewAmount(e.target.value)}/></td>
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
