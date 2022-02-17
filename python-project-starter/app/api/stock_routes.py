## Historic Price Data Function Theory
from crypt import methods
from simplejson import dumps
from flask import Blueprint, jsonify, request
from random import random
from time import time
from decimal import Decimal
from flask_login import current_user

from app.models import db
from app.models import Stock, PriceHistory, Watchlist, Portfolio, User

stock_routes = Blueprint("stocks", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


def post_price_data(stock):
    price_point = PriceHistory(
        stockId=stock.id,
        price=stock.price,
        time=time(),
        interval="30 Seconds"
    )

    db.session.add(price_point)
    db.session.commit()
    return price_point

def purge_price_data(stock):
    data_point = PriceHistory.query.filter(stock.id == PriceHistory.stockId).all()
    if len(data_point) > 500:
        removed = PriceHistory.query.order_by(PriceHistory.id).filter(stock.id == PriceHistory.stockId).first()
        db.session.delete(removed)
        db.session.commit()
    return

def data(stock):
    post_price_data(stock)
    purge_price_data(stock)


## Randomized Price Change Algo

def price_change(stock):
    change = Decimal(random())
    if stock.weight < change:
        stock.price = (stock.price * (change * Decimal(3.5) / Decimal(100))) + stock.price
        stock.weight = stock.weight + (stock.weight * (change / Decimal(8.5)))
        db.session.commit()
    else:
        stock.price = (stock.price * (change * Decimal(3.5) / Decimal(100) * Decimal(-1))) + stock.price
        stock.weight = stock.weight - (stock.weight * (change / Decimal(8.5)))
        db.session.commit()
    data(stock)


@stock_routes.route('/')
def price_data():
    res = {}
    stocks = Stock.query.all()
    for stock in stocks:
        price_change(stock)
    for stock in stocks:
        res[stock.id] = stock.to_dict()
    return res

@stock_routes.route("/all")
def get_all():
    res = {}
    stocks = Stock.query.all()

    for stock in stocks:
        watched = Watchlist.query.filter(current_user.id == Watchlist.userId).filter(stock.id == Watchlist.stockId).first()
        owned = Portfolio.query.filter(current_user.id == Portfolio.userId).filter(stock.id == Portfolio.stockId).first()
        history = PriceHistory.query.filter(stock.id == PriceHistory.stockId).first()

        if watched == None and owned == None:
            res[stock.id] = {
                "id": stock.id,
                "name": stock.name,
                "ticker": stock.ticker,
                "price": dumps(stock.price),
                "owned": False,
                "history": dumps(history.price),
                "watched": False
            }
        elif watched == None and owned:
            res[stock.id] = {
                "id": stock.id,
                "name": stock.name,
                "ticker": stock.ticker,
                "price": dumps(stock.price),
                "owned": dumps(owned.count),
                "history": dumps(history.price),
                "watched": False
            }
        elif watched and owned == None:
            res[stock.id] = {
                "id": stock.id,
                "name": stock.name,
                "ticker": stock.ticker,
                "price": dumps(stock.price),
                "owned": False,
                "history": dumps(history.price),
                "watched": True
            }
        else:
            res[stock.id] = {
                "id": stock.id,
                "name": stock.name,
                "ticker": stock.ticker,
                "price": dumps(stock.price),
                "owned": dumps(owned.count),
                "history": dumps(history.price),
                "watched": True
            }
    return jsonify(res)

@stock_routes.route("/buy/<int:stockId>/<int:userId>", methods=["POST", "PUT"])
def buy_stock(stockId, userId):
    data = request.get_json()
    stock = Stock.query.get(stockId)
    user = User.query.get(current_user.id)
    portfolio = Portfolio.query.filter(stockId == Portfolio.stockId).filter(userId == Portfolio.userId).first()
    if user.balance > (stock.price * data['amount']):
        user.balance = user.balance - (stock.price * (data['amount'] - portfolio.count))
        if request.method == "POST":
            bought = Portfolio(
                userId= current_user.id,
                stockId= stockId,
                count= data["amount"],
                purchasePrice= stock.price
            )
            db.session.add(bought)
            db.session.commit()
            return bought.to_dict()

        if request.method == "PUT":
            portfolio.purchasePrice = ((portfolio.count * portfolio.purchasePrice) + ((data['amount'] - portfolio.count) * stock.price)) / (data['amount'])
            portfolio.count = data['amount']
            db.session.commit()
            return "Purchased"


    return {"errors": validation_errors_to_error_messages("Insufficient funds. Please try again.")}, 401


@stock_routes.route('/sell/<int:stockId>/<int:userId>', methods=["PUT", "DELETE"])
def sell_stock(stockId, userId):
    data = request.get_json()
    stock = Stock.query.get(stockId)
    user = User.query.get(current_user.id)
    portfolio = Portfolio.query.filter(stockId == Portfolio.stockId).filter(userId == Portfolio.userId).first()
    user.balance = user.balance + (stock.price * (portfolio.count - data['amount']))

    if request.method == "PUT":
        portfolio.purchasePrice = ((portfolio.count * portfolio.purchasePrice) + ((portfolio.count - data["amount"]) * stock.price)) / (portfolio.count)
        portfolio.count = data['amount']
        db.session.commit()
        return "Updated"

    if request.method == "DELETE":
        db.session.delete(portfolio)
        db.session.commit()
        return "Deleted"
