import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import StockOverview from './components/Stocks/StockOverview';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [notifications, setNotifications] = useState(0)

  const dispatch = useDispatch();

  useEffect(async () => {
    const postData = setInterval(async () => {
      const res = await fetch(`/api/stocks/`)
      const alert_res = await fetch(`/api/watchlists/alert/`)
      const data = await alert_res.json()
      setNotifications(Object.keys(data).length)
    }, 30 * 1000)
    return () => clearInterval(postData)
  }, [])

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      const alert_res = await fetch(`/api/watchlists/alert/`)
      const data = await alert_res.json()
      setNotifications(Object.keys(data).length)
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar notifications={notifications} />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/p/:userId' exact={true} >
          <User notifications={notifications}/>
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <StockOverview />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
