import React, { useState, useEffect } from "react";
import "./PortfolioMain.css";

const PortfolioTableRow = ({ s, setUpdate, user }) => {
   const [newAmount, setNewAmount] = useState(s.count);
   const [userBalance, setUserBalance] = useState(user.balance);
   const [newBalance, setNewBalance] = useState(userBalance);
   const [editBuy, setEditBuy] = useState(false);
   const [editSell, setEditSell] = useState(false);
   const [editContentBuy, setEditContentBuy] = useState(false);
   const [editContentSell, setEditContentSell] = useState(false);
   const [errors, setErrors] = useState("")

   //Changes spans from Buy/Sell To Buy/Cancel and Turns Owned Field to Input
   const clickBuy = () => {
      setEditContentBuy(true);
      setEditBuy(true);
   };

   //Changes spans from Buy/Sell To Sell/Cancel and Turns Owned Field to Input
   const clickSell = () => {
      setEditContentSell(true);
      setEditSell(true);
   };

   //Checks InputVal against prevVal to run appropriate action
   const handleBuy = async () => {
      //Reverts spans to starting state and returns out
      if (newAmount === s.count) {
         setEditBuy(false);
         setEditContentBuy(false);
         return;
      }

      if (newAmount < 0) {
         setErrors("Please Enter A Valid Amount")
         return;
      }

      if (newAmount * s.currentPrice > user.balance) {
        setErrors("Insufficient Balance. Please Select a New Amount.");
        return;
     }

      const res = await fetch(`/api/portfolios/add/${s.stockId}/${user.id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            amount: parseFloat(newAmount),
         }),
      });
      setUpdate(true);
      setEditBuy(false);
      setEditContentBuy(false);
   };

   const handleSell = async () => {
      //Reverts spans to starting state and returns out
      if (newAmount === s.count) {
         setEditSell(false);
         setEditContentSell(false);
         return;
      }

      if (newAmount < 0) {
         setErrors("Please Enter A Valid Amount")
         return;
      }

      if (newAmount == 0) {
         const sell_res = await fetch(
            `/api/portfolios/sell/${s.stockId}/${user.id}`,
            {
               method: "DELETE",
            }
         );
         setUpdate(true);
         setEditSell(false);
         setEditContentSell(false);
         return;
      }

      const sell_some_res = await fetch(
         `/api/portfolios/sell/${s.stockId}/${user.id}`,
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               amount: parseFloat(newAmount),
            }),
         }
      );
      setUpdate(true);
      setEditSell(false);
      setEditContentSell(false);
      return;
   };

   //Blanket Cancel Function to Revert to default View
   const handleCancel = () => {
      if (editBuy) setEditBuy(false);
      if (editSell) setEditSell(false);
      setNewBalance(userBalance);
      setEditContentBuy(false);
      setEditContentSell(false);
      setNewAmount(s.count);
   };

   //Declare Btn var
   let btn;

   //Checks if Edit or Sell Btn have been clicked to render new spans to complete either action
   if (editBuy) {
      btn = (
         <td className="portfolio-btn-container">
            <span className="green-btn" onClick={handleBuy}>
               Buy
            </span>
            <span className="red-btn" onClick={handleCancel}>
               Cancel
            </span>
         </td>
      );
   } else if (editSell) {
      btn = (
         <td className="portfolio-btn-container">
            <span className="red-btn" onClick={handleSell}>
               Sell
            </span>
            <span className="red-btn" onClick={handleCancel}>
               Cancel
            </span>
         </td>
      );
      //Default Btn render
   } else {
      btn = (
         <td className="portfolio-btn-container">
            <span className="green-btn" onClick={clickBuy}>
               Buy
            </span>
            <span className="red-btn" onClick={clickSell}>
               Sell
            </span>
         </td>
      );
   }

   //Declare amountField var
   let amountField;

   //Declare profit var
   let profit;

   //Runs equation to determine positive or negative values and returns value with appropriate id to style
   if (
      (
         (parseFloat(s.currentPrice - s.purchasePrice) / s.purchasePrice) *
         100
      ).toFixed(2) > 0
   ) {
      profit = (
         <td id="portfolio-stock-profit">
            {parseFloat(
               ((s.currentPrice - s.purchasePrice) / s.purchasePrice) * 100
            ).toFixed(2)}
            %
         </td>
      );
   } else if (
      (
         (parseFloat(s.currentPrice - s.purchasePrice) / s.purchasePrice) *
         100
      ).toFixed(2) < 0
   ) {
      profit = (
         <td id="portfolio-stock-loss">
            {parseFloat(
               ((s.currentPrice - s.purchasePrice) / s.purchasePrice) * 100
            ).toFixed(2)}
            %
         </td>
      );
   } else {
      profit = (
         <td id="portfolio-stock-proft">
            {parseFloat(
               ((s.currentPrice - s.purchasePrice) / s.purchasePrice) * 100
            ).toFixed(2)}
            %
         </td>
      );
   }

   //Run when Buy or Sell Btn have been clicked to render input field with conditions
   if (editContentBuy) {
      amountField = (
         <td>
            <p className="watchlist-errors">{errors}</p>
            <input
               id="edit-owned"
               type="number"
               min={s.count}
               name="amount"
               value={newAmount}
               onChange={(e) => {
                  setNewAmount(e.target.value);
                  setNewBalance(
                     Number(user.balance) - (((Number(e.target.value) - Number(s.count))) * Number(s.purchasePrice))
                  );
               }}
            />
            <p className="new-balance">New Balance: </p>
            <span className="stock-buy-balance">
               {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
               }).format(newBalance)}
            </span>
         </td>
      );
   } else if (editContentSell) {
      amountField = (
         <td className="portfolio-td">
            <input
               type="number"
               id="edit-owned"
               min={0}
               max={s.count}
               name="amount"
               value={newAmount}
               onChange={(e) => {
                  setNewAmount(e.target.value);
                  setNewBalance(
                     Number(user.balance) + (((Number(s.count) - Number(e.target.value))) * Number(s.purchasePrice))
                  );
               }}
            />
            <p className="new-balance">New Balance: </p>
            <span className="stock-sell-balance">
               {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
               }).format(newBalance)}
            </span>
         </td>
      );
      //Default render for amountField
   } else {
      amountField = <td>{parseFloat(s.count).toFixed(3)}</td>;
   }

   return (
      <tr>
         <td>{s.stockName}</td>
         <td>{s.ticker}</td>
         <td>
            {new Intl.NumberFormat("en-US", {
               style: "currency",
               currency: "USD",
            }).format(s.currentPrice)}
         </td>
         {amountField}
         <td>
            {new Intl.NumberFormat("en-US", {
               style: "currency",
               currency: "USD",
            }).format(s.purchasePrice)}
         </td>
         {profit}
         {btn}
      </tr>
   );
};

export default PortfolioTableRow;
