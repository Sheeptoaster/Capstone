import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PortfolioMain from './Portfolio/PortfolioMain';
import './User.css'
import Watchlist from './Watchlist/Watchlist';
import UserDetails from './UserDetails/UserDetails';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell } from "@fortawesome/free-solid-svg-icons";
library.add(faBell);


function User({ notifications }) {
  const [user, setUser] = useState({});
  const [tab, setTab] = useState(2)
  const [update, setUpdate] = useState(false)
  const { userId } = useParams();


  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      document.title = "User Dashboard"
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
      setUpdate(false)
    })();
  }, [userId, update]);

  if (!user) {
    return null;
  }

  //Declare view var
  let view;

  // Allows Conditional Rendering of Components Based On Current Tab Selected
  if(user.id) {
    if (tab === 1) {
      view = <UserDetails user={user} setUpdate={setUpdate} />
    } else if (tab === 3) {
      view = <Watchlist user={user} />
    } else {
      view = <PortfolioMain user={user} />
    }
  }

  //Sets tab value to allow components to be rendered correctly
  const handleUserDetails = () => {
    setTab(1)
  }
  const handlePortfolio = () => {
    setTab(2)
  }
  const handleWatchlist = () => {
    setTab(3)
  }

  //Declare notif var
  let notif

  //Check for amount of stocks that are under priceAlert val in Watchlist
  //Sets styling based on result
  if (notifications > 0) {
    notif = <label style={{"backgroundColor": "red", "borderRadius": ".25em"}} htmlFor='slide-item-3' className='watchlist-user-tab'>
    <span onClick={handleWatchlist}>Watchlist </span>
      <FontAwesomeIcon icon="bell" onClick={handleWatchlist}/>
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
