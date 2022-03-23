import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import DemoLogin from "./DemoUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "./LoginForm.css";

library.add(faUser, faLock);

const LoginForm = ({ setTab }) => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <div className="login-form-container">
                <form onSubmit={onLogin} className="login-form">
                    <div className="login-container-tab">
                        <div
                            className="login-tab-active"
                            onClick={(e) => setTab(0)}
                        >
                            <h2>Login</h2>
                        </div>

                        <div className="login-tab" onClick={(e) => setTab(1)}>
                            <h2>Sign Up</h2>
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

                    <div className="form-btn-container">
                        <button className="form-submit-btn" type="submit">
                            Login
                        </button>
                        <DemoLogin />
                    </div>
                    <div className="landing-links">
                        <a
                            href="https://github.com/Sheeptoaster/Capstone"
                            target={"_blank"}
                            className="landing-about-links"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/jacob-weber-662a08153/"
                            target={"_blank"}
                            className="landing-about-links"
                        >
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginForm;
