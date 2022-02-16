import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioMain from './auth/Portfolio/PortfolioMain';
import './User.css'

function User() {
  const [user, setUser] = useState({});
  const [tab, setTab] = useState(2)
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  let view;

  if (tab === 1) {
    view = <p>PlaceHolder for User Details</p>
  } else if (tab === 3) {
    view = <p>PlaceHolder for Watchlist</p>
  } else {
    view = <PortfolioMain user={user}/>
  }

  const handleUserDetails = () => {
    setTab(1)
  }
  const handlePortfolio = () => {
    setTab(2)
  }
  const handleWatchlist = () => {
    setTab(3)
  }

  return (
    <>
        <nav className='profile-slidebar'>
          <input type='radio'
          name='slideItem' id='slide-item-1'
          className='slide-toggle' />
          <label htmlFor='slide-item-1'>
            <span onClick={handleUserDetails}>Portfolio</span>
          </label>

          <input type='radio'
          name='slideItem' id='slide-item-2'
          className='slide-toggle' defaultChecked />
          <label htmlFor='slide-item-2'>
            <span onClick={handlePortfolio}>Portfolio</span>
          </label>

          <input type='radio'
          name='slideItem' id='slide-item-3'
          className='slide-toggle' />
          <label htmlFor='slide-item-3'>
            <span onClick={handleWatchlist}>Portfolio</span>
          </label>

          <div className='clear'></div>

          <div className='slider'>
            <div className='bar'></div>
          </div>
        </nav>
      {view}
    </>
  );
}
export default User;
