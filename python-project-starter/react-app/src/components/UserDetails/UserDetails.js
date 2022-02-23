import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionOverview from "./TransactionOverview";
import "./UserDetails.css";

function UserDetails({ user, setUpdate }) {
    const [portfolioBalance, setPortfolioBalance] = useState(0);
    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [errors, setErrors] = useState([]);

    const current = useSelector((state) => state.session.user);

    useEffect(async () => {
        const res = await fetch(`/api/portfolios/${user.id}`);
        const data = await res.json();
        let total = 0;
        Object.values(data).map((k) => {
            const val = Number(k.count) * Number(k.currentPrice);
            total += val;
        });

        setPortfolioBalance(total);
    }, []);

    const handleCancel = () => {
        setEdit(false);
        setErrors([]);
        setEmail(user.email);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setUsername(user.username);
    };

    const handleEditClick = () => {
        setEdit(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/users/edit/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
            }),
        });
        if (res.ok) {
            setEdit(false);
            setUpdate(true);
        } else if (res.status < 500) {
            const data = await res.json();
            if (data.errors) {
                setErrors(data.errors);
            }
        }
    };

    let editBtn;

    if (current.id === user.id) {
        if (edit) {
            editBtn = (
                <div className="user-edit-btn-container">
                    <button
                        onClick={handleSubmit}
                        className="user-edit-btn-active"
                    >
                        Submit
                    </button>
                    <button
                        onClick={handleCancel}
                        className="user-edit-btn-active"
                    >
                        Cancel
                    </button>
                </div>
            );
        } else {
            editBtn = (
                <button onClick={handleEditClick} className="user-edit-btn">
                    Edit
                </button>
            );
        }
    } else {
        editBtn = <></>;
    }

    let userDetails;
    if (edit) {
        userDetails = (
            <div className="user-card-names" style={{ marginBottom: "2em" }}>
                <div className="login-form-errors-container">
                    {errors?.map((error, ind) => (
                        <div key={ind} className="login-form-errors">
                            {error}
                        </div>
                    ))}
                </div>
                <form className="user-edit-form">
                    <div className="user-edit-container">
                        <div className="user-edit-fields">
                            <label>Username</label>
                            <input
                                className="user-edit-input"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="user-edit-fields">
                            <label>First Name</label>
                            <input
                                className="user-edit-input"
                                name="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="user-edit-fields">
                            <label>Last Name</label>
                            <input
                                className="user-edit-input"
                                name="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="user-edit-fields">
                            <label>Email</label>
                            <input
                                className="user-edit-input"
                                name="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    {editBtn}
                </form>
            </div>
        );
    } else {
        userDetails = (
            <div className="user-card-names" style={{ marginBottom: "5em" }}>
                <div className="user-edit-row">
                    <h3 className="user-card-h2">
                        {user.firstName} {user.lastName}
                    </h3>
                    {editBtn}
                </div>
                <span className="user-card-h3">@{user.username}</span>
            </div>
        );
    }

    return (
        <>
            <div className="user-card-container">
                <div className="user-card-details">
                    {userDetails}

                    <div className="user-card-money">
                        <span className="user-card-balance">
                            Current Balance:{" "}
                            <span className="user-balance-box">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(user.balance)}
                            </span>
                        </span>
                        <span className="user-card-portfolio-value">
                            Portfolio Value:{" "}
                            <span className="user-balance-box">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(portfolioBalance)}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <TransactionOverview user={user} />
            </div>
        </>
    );
}

export default UserDetails;
