import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const DemoLogin = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = "demo@aa.io";
    const password = "password";
    await dispatch(login(email, password));
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <button className="form-submit-btn" onClick={handleSubmit}>
      Demo User
    </button>
  );
};

export default DemoLogin;
