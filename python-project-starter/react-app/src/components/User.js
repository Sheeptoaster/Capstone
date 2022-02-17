import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioMain from './Portfolio/PortfolioMain';
import './User.css'
import Watchlist from './Watchlist/Watchlist';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell } from "@fortawesome/free-solid-svg-icons";

library.add(faBell);


function User({ notifications }) {
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
  if(user.id) {
    if (tab === 1) {
      view = <p>PlaceHolder for User Details</p>
    } else if (tab === 3) {
      view = <Watchlist user={user} />
    } else {
      view = <PortfolioMain user={user} />
    }
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

  let notif

  if (notifications > 0) {
    notif = <label style={{"backgroundColor": "red", "borderRadius": ".25em"}} htmlFor='slide-item-3' className='watchlist-user-tab'>
    <span onClick={handleWatchlist}>Watchlist </span>
    <FontAwesomeIcon icon="bell" />
    </label>
  } else {
    notif = <label htmlFor='slide-item-3' className='watchlist-user-tab' onClick={handleWatchlist}>
            <span >Watchlist </span>
          </label>
  }

  return (
    <>
        <nav className='profile-slidebar'>
          <input type='radio'
          name='slideItem' id='slide-item-1'
          className='slide-toggle' />
          <label htmlFor='slide-item-1'>
            <span onClick={handleUserDetails}>User Details</span>
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

          {notif}

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
