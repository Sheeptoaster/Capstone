import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    <NavLink to="/login" />
  };

  return <span onClick={onLogout}>Logout</span>;
};

export default LogoutButton;
