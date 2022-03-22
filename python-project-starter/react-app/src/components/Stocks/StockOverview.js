import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import HomeStockTableRow from "./HomeStockTableRow";
import TopGrowthChart from "./TopGrowthChart";
import "./StockOverview.css";

function StockOverview() {
    const [stocks, setStocks] = useState([]);
    const user = useSelector((state) => state.session.user);
    const [update, setUpdate] = useState(false);
    const [growth, setGrowth] = useState([]);
    const [loss, setLoss] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const isMounted = useRef(false);

    useEffect(() => {
        return () => (isMounted.current = true);
    }, []);

    useEffect(async () => {
        document.title = "Home";
        const updateData = setInterval(async () => {
            if (user) {
                const res = await fetch(`/api/stocks/all/${user.id}`);
                const data = await res.json();
                const change_res = await fetch("/api/stocks/daily-change");
                const change_data = await change_res.json();
                if (isMounted.current) return;
                if (!user) return () => clearInterval(updateData);
                setGrowth(change_data["growth"]);
                setLoss(change_data["loss"]);
                setStocks(data);
            }
        }, 30 * 1000);
        return () => clearInterval(updateData);
    }, []);

    useEffect(async () => {
        if (user) {
            const res = await fetch(`/api/stocks/all/${user.id}`);
            const change_res = await fetch("/api/stocks/daily-change");

            const data = await res.json();
            const change_data = await change_res.json();

            setStocks(data);
            setGrowth(change_data["growth"]);
            setLoss(change_data["loss"]);
            setShowTable(true);
            setUpdate(false);
        }
    }, [update]);
    return (
        <>
            {showTable && (
                <>
                    <h2 className="stock-chart-highlight-h2">Investment Highlights</h2>
                    <div className="growth-chart-overview">
                        <TopGrowthChart stock={growth} d={"g"} w={800} />
                        <TopGrowthChart stock={loss} d={"l"} w={800} />
                    </div>
                </>
            )}
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Ticker</th>
                            <th>Price</th>
                            <th>Day Gain/Loss</th>
                            <th style={{"width": "165px"}}>Owned</th>
                            <th>Buy/Sell</th>
                            <th style={{"width": "250px"}}>Watchlist</th>
                        </tr>
                    </thead>
                    {Object.values(stocks).map((s) => (
                        <tbody key={s.id}>
                            <HomeStockTableRow
                                s={s}
                                setUpdate={setUpdate}
                                user={user}
                            />
                        </tbody>
                    ))}
                </table>
            </div>
        </>
    );
}

export default StockOverview;
