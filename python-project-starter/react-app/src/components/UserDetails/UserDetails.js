import React, { useEffect, useState } from 'react'
import TransactionOverview from './TransactionOverview'
import './UserDetails.css'


function UserDetails({ user }) {

    return (
        <>
            <div className='user-card-container'>
                <div className='user-card-details'>
                    <h2 className='user-card-h2'>{user.username}</h2>
                    <h3 className='user-card-h3'>{user.firstName} {user.lastName}</h3>
                    <p className='user-card-email'>{user.email}</p>
                    <span className='user-card-balance'>${parseFloat(user.balance).toFixed(2)}</span>
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
