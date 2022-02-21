import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavAuth from './components/AuthNav';
import ProtectedRoute from './components/auth/ProtectedRoute';
import StockOverview from './components/Stocks/StockOverview';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [notifications, setNotifications] = useState(0)

  const dispatch = useDispatch();

  useEffect(async () => {
    // Executes Price Logging Route Function Every n Seconds
    const postData = setInterval(async () => {
      const res = await fetch(`/api/stocks/`)
      const alert_res = await fetch(`/api/watchlists/alert/`)
      const data = await alert_res.json()
      setNotifications(Object.keys(data).length)
    }, 60 * 1000)
    // Clears Interval to Prevent Memory Leak
    return () => clearInterval(postData)
  }, [])

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch, loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>


      <NavAuth notifications={notifications} loaded={loaded} />

      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/p/:userId' exact={true} >
          <User notifications={notifications} />
        </ProtectedRoute>

        <ProtectedRoute path='/' exact={true} >
          <StockOverview />
        </ProtectedRoute>

      </Switch>

    </BrowserRouter>
  );
}

export default App;
