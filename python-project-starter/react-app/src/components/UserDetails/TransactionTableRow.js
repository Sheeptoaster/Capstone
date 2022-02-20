import React, { useEffect, useState } from 'react'

function TransactionTableRow({ t }) {
    const [s, setStock] = useState([])
    useEffect(async () => {
        const res = await fetch(`/api/stocks/get/${t.stockId}`)
        const data = await res.json()
        setStock(data)
    }, [])

    let amount;
    let price;
    if(t.bought) {
        amount = <td id='portfolio-stock-profit'>{t.amount}</td>
        price = <td id='portfolio-stock-profit'>${parseFloat(t.price).toFixed(2)}</td>
    } else {
        amount = <td id='portfolio-stock-loss'>{t.amount}</td>
        price = <td id='portfolio-stock-loss'>${parseFloat(t.price).toFixed(2)}</td>
    }

    return (
        <tr>
            <td>{s.name}</td>
            <td>{s.ticker}</td>
            {amount}
            {price}
        </tr>
    )
}

export default TransactionTableRow
