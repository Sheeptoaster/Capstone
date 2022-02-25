import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const DemoLogin = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [demo, setDemo] = useState([])

  useEffect(async () => {
    const res = await fetch(`/api/users/1`)
    if (res.ok) {
      const data = await res.json()
      setDemo(data)
      console.log(demo);
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = demo.email;
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
