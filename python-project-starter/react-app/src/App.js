import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavAuth from './components/AuthNav';
import ProtectedRoute from './components/auth/ProtectedRoute';
import StockOverview from './components/Stocks/StockOverview';
import User from './components/User';
import Component404 from './Component404';
import AddCompany from './components/Stocks/AddCompany';
import LandingTab from './components/auth/LandingTab';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [notifications, setNotifications] = useState(0)
  const isMounted = useRef(false)
  const dispatch = useDispatch();

  useEffect(() => {
    return () => isMounted.current = true
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


      <NavAuth notifications={notifications} loaded={loaded} setNotifications={setNotifications} />

      <Switch>

        <Route path='/login' exact={true}>
          <LandingTab />
        </Route>

        <ProtectedRoute path="/add/company" >
          <AddCompany />
        </ProtectedRoute>

        <ProtectedRoute path='/p/:userId' exact={true} >
          <User notifications={notifications} />
        </ProtectedRoute>


        <ProtectedRoute path='/' exact={true} >
          <StockOverview />
        </ProtectedRoute>

        <Route path="*">
          <Component404 />
        </Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
