import React, { useState, useEffect } from "react";
import './PortfolioMain.css'

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
        if (newAmount === s.count) {
            setEditBuy(false)
            setEditContentBuy(false)
            return
        }

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
        if (newAmount === s.count) {
            setEditSell(false)
            setEditContentSell(false)
            return
        }

        if (newAmount == 0) {
            const sell_res = await fetch(`/api/portfolios/sell/${s.stockId}/${user.id}`, {
                method: "DELETE"
            })
            setUpdate(true)
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
        setUpdate(true)
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
        btn = <td className="portfolio-btn-container">
        <button className="green-btn" onClick={handleBuy}>Buy</button>
        <button className="red-btn" onClick={handleCancel}>Cancel</button>
    </td>
    } else if (editSell) {
        btn = <td className="portfolio-btn-container">
        <button className="red-btn" onClick={handleSell}>Sell</button>
        <button className="red-btn" onClick={handleCancel}>Cancel</button>
    </td>
    } else {
        btn = <td className="portfolio-btn-container">
                <button className="green-btn" onClick={clickBuy}>Buy</button>
                <button className="red-btn" onClick={clickSell}>Sell</button>
            </td>
    }

    let amountField

    let profit

    if ((parseFloat(s.currentPrice - s.purchasePrice) / s.purchasePrice * 100).toFixed(2) > 0) {
        profit = <td id='portfolio-stock-profit'>{parseFloat((s.currentPrice - s.purchasePrice) / s.purchasePrice * 100).toFixed(2)}%</td>
    } else {
        profit = <td id='portfolio-stock-loss'>{parseFloat((s.currentPrice - s.purchasePrice) / s.purchasePrice * 100).toFixed(2)}%</td>
    }

    if (editContentBuy) {
        amountField = <td><input id="edit-owned" type="number" min={s.count} name="amount" value={newAmount} onChange={e => setNewAmount(e.target.value)}/></td>
    } else if (editContentSell) {
        amountField = <td className="portfolio-td"><input type="number" id="edit-owned" min={0} max={s.count} name="amount" value={newAmount} onChange={e => setNewAmount(e.target.value)}/></td>
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
            {profit}
            {btn}
        </tr>
    )
}


export default PortfolioTableRow
