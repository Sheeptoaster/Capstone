import React, { useEffect, useState } from 'react'
import TransactionTableRow from './TransactionTableRow'

function TransactionOverview({ user }) {
    const [transaction, setTransation] = useState([])
    const [update, setUpdate] = useState(true)
    useEffect(async () => {
        const res = await fetch(`/api/transactions/get/${user.id}`)

        const data = await res.json()

        setTransation(data)

        setUpdate(false)
    }, [update])
    if (transaction !== []) {
        return (
            <div>
                <h2 className='user-transactions-h2'>{user.firstName} {user.lastName} Transactions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Stock</th>
                            <th>Ticker</th>
                            <th>Amount</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    {Object.values(transaction).map(t => (
                        <tbody key={t.id}>
                            <TransactionTableRow t={t} />
                        </tbody>
                    ))}
                </table>
            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

export default TransactionOverview
