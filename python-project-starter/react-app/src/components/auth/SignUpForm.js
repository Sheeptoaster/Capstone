import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./LoginForm.css";

library.add(faUser, faLock);

const SignUpForm = ({ setTab }) => {
   const [errors, setErrors] = useState([]);
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastname] = useState("");
   const [password, setPassword] = useState("");
   const [repeatPassword, setRepeatPassword] = useState("");
   const user = useSelector((state) => state.session.user);
   const dispatch = useDispatch();

   const onSignUp = async (e) => {
      e.preventDefault();
      if (password === repeatPassword) {
         const data = await dispatch(
            signUp(username, email, firstName, lastName, password)
         );
         if (data) {
            setErrors(data);
         }
      }
   };

   const updateUsername = (e) => {
      setUsername(e.target.value);
   };

   const updateEmail = (e) => {
      setEmail(e.target.value);
   };

   const updateFirstName = (e) => {
      setFirstName(e.target.value);
   };

   const updateLastName = (e) => {
      setLastname(e.target.value);
   };

   const updatePassword = (e) => {
      setPassword(e.target.value);
   };


   let submitbtn = (
      <button className="form-submit-btn-grey" disabled type="submit">
         Signup
      </button>
   );

   if (password !== "" && password === repeatPassword) {
      submitbtn = (
         <button className="form-submit-btn" type="submit">
            Signup
         </button>
      );
   }

   const updateRepeatPassword = (e) => {
      setRepeatPassword(e.target.value);

   };

   if (user) {
      return <Redirect to="/" />;
   }
   console.log(errors);
   return (
      <>
         <div className="login-form-container">
            <form onSubmit={onSignUp} className="login-form">
               <div className="login-container-tab">
                  <div className="login-tab" onClick={(e) => setTab(0)}>
                     <h2>Login</h2>
                  </div>

                  <div className="login-tab-active" onClick={(e) => setTab(1)}>
                     <h2>Signup</h2>
                  </div>
               </div>
               <div className="login-form-errors-container">
                  {errors.map((error, ind) => (
                     <div key={ind} className="login-form-errors">
                        {error}
                     </div>
                  ))}
               </div>

               <div className="form-container">
                  <label className="login-label" htmlFor="username">
                     <FontAwesomeIcon icon="user" />
                  </label>
                  <input
                     className="form-input"
                     name="username"
                     type="text"
                     placeholder="Username"
                     value={username}
                     onChange={updateUsername}
                  />
               </div>

               <div className="form-container">
                  <label className="login-label" htmlFor="email">
                     <FontAwesomeIcon icon="user" />
                  </label>
                  <input
                     className="form-input"
                     name="email"
                     type="text"
                     placeholder="Email"
                     value={email}
                     onChange={updateEmail}
                  />
               </div>

               <div className="form-container">
                  <label className="login-label" htmlFor="firstName">
                     <FontAwesomeIcon icon="user" />
                  </label>
                  <input
                     className="form-input"
                     name="firstName"
                     type="text"
                     placeholder="First Name"
                     value={firstName}
                     onChange={updateFirstName}
                  />
               </div>

               <div className="form-container">
                  <label className="login-label" htmlFor="lastName">
                     <FontAwesomeIcon icon="user" />
                  </label>
                  <input
                     className="form-input"
                     name="lastName"
                     type="text"
                     placeholder="Last Name"
                     value={lastName}
                     onChange={updateLastName}
                  />
               </div>

               <div className="form-container">
                  <label htmlFor="password" className="login-label">
                     <FontAwesomeIcon icon="lock" />
                  </label>
                  <input
                     className="form-input"
                     name="password"
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={updatePassword}
                  />
               </div>

               <div className="form-container">
                  <label htmlFor="passwordConfirm" className="login-label">
                     <FontAwesomeIcon icon="lock" />
                  </label>
                  <input
                     className="form-input"
                     name="passwordConfirm"
                     type="password"
                     placeholder="Confirm Password"
                     value={repeatPassword}
                     onChange={updateRepeatPassword}
                  />
               </div>

               <div className="form-btn-container">{submitbtn}</div>
            </form>
         </div>
      </>
   );
};

export default SignUpForm;
