import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    window.location.reload();
    <Redirect to="/login" />;
  };

  return <span onClick={onLogout}>Logout</span>;
};

export default LogoutButton;
