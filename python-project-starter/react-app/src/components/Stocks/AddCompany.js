import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './AddCompany.css'

function AddCompany() {
    const [stockName, setStockName] = useState("");
    const [ticker, setTicker] = useState("");
    const [listPrice, setListPrice] = useState(0);
    const [errors, setErrors] = useState([]);

    const history = useHistory()

    useEffect(() => {
        document.title = "List Company"
    })

    const handleCancel = (e) => {
        e.preventDefault();
        setStockName("");
        setTicker("");
        setListPrice(0);
        return history.push("/")
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        const res = await fetch("/api/stocks/post/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                stockName: stockName,
                ticker: ticker,
                price: listPrice,
            }),
        });
        if (res.ok) {
            const data = await res.json()
            return history.push("/")
        } else if (res.status < 500) {
            const data = await res.json();
            setErrors(data.errors)
        }

    };

    return (
        <>
            <div className="stock-form-container">
                <h3>List Company</h3>
                <div className="login-form-errors-container">
                    {errors?.map((error, ind) => (
                        <div key={ind} className="login-form-errors">
                            {error}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="stock-form">
                    <div className="stock-container">
                        <label className="stock-label" htmlFor="stockName">
                            Company Name
                        </label>
                        <input
                            className="stock-input"
                            name="stockName"
                            value={stockName}
                            maxLength={55}
                            onChange={(e) => setStockName(e.target.value)}
                        />
                    </div>
                    <div className="stock-container">
                        <label className="stock-label" htmlFor="ticker">
                            Ticker
                        </label>
                        <input
                            className="stock-input"
                            name="ticker"
                            value={ticker}
                            maxLength={5}
                            onChange={(e) => setTicker(e.target.value.toUpperCase())}
                        />
                    </div>
                    <div className="stock-container">
                        <label className="stock-label" htmlFor="listPrice">
                            List Price
                        </label>
                        <input
                            className="stock-input"
                            name="listPrice"
                            type="number"
                            value={listPrice}
                            onChange={(e) => setListPrice(e.target.value)}
                        />
                    </div>
                    <button className="stock-submit-btn">
                        Submit
                    </button>
                    <button className="stock-submit-btn" onClick={handleCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        </>
    );
}

export default AddCompany;
