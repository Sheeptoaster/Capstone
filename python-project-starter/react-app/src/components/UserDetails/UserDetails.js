import React, { useEffect, useState } from 'react'
import TransactionOverview from './TransactionOverview'
import './UserDetails.css'


function UserDetails({ user }) {
    const data = [
        { value: 'JavaScript', count: 38 },
        { value: 'React', count: 30 },
        { value: 'Nodejs', count: 28 },
        { value: 'Express.js', count: 25 },
        { value: 'HTML5', count: 33 },
        { value: 'MongoDB', count: 18 },
        { value: 'CSS3', count: 20 },
    ]

    return (
        <>
            <div className='user-card-container'>
                <div className='user-card-details'>
                    <h2 className='user-card-h2'>{user.username}</h2>
                    <h3 className='user-card-h3'>{user.firstName} {user.lastName}</h3>
                    <p className='user-card-email'>{user.email}</p>
                    {/* <span className='user-card-balance'>${parseFloat(user.balance).toFixed(2)}</span> */}
                    <span className='user-card-balance'>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(user.balance)}</span>
                    <span className='user-card-portfolio-value'>Portfolio Value</span>
                </div>
            </div>
            <div>
                <TransactionOverview user={user} />
            </div>
        </>
    )
}

export default UserDetails
