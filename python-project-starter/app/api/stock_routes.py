# Historic Price Data Function Theory
from crypt import methods
from simplejson import dumps
from flask import Blueprint, jsonify, request
from random import random
from time import time
from decimal import Decimal
from flask_login import current_user, AnonymousUserMixin, user_logged_out

from app.models import db
from app.models import Stock, PriceHistory, Watchlist, Portfolio, User, Transaction
from app.forms.stock_form import StockForm


stock_routes = Blueprint("stocks", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


def post_price_data(stock):
    price_point = PriceHistory(
        stockId=stock.id,
        price=stock.price,
        time=time(),
        interval="60 Seconds"
    )

    db.session.add(price_point)
    db.session.commit()
    return price_point


def purge_price_data(stock):
    data_point = PriceHistory.query.filter(
        stock.id == PriceHistory.stockId).all()
    if len(data_point) > 90:
        removed = PriceHistory.query.order_by(PriceHistory.id).filter(
            stock.id == PriceHistory.stockId).first()
        db.session.delete(removed)
        db.session.commit()
    return


def data(stock):
    # Posts Price Data Point to PriceHistory Table
    post_price_data(stock)
    # Removes Data from PriceHistory Table if more than 500 entries with that stockId exist
    purge_price_data(stock)


# Randomized Price Change Algo

def price_change(stock):
    # Creates Random Dec Between 0 and 1
    change = Decimal(random())

    # If stock's weight is less than change
    # Stock Weight Increases + Stock Value Increase
    if stock.weight < change - Decimal(0.01):
        stock.price = (stock.price * (change * Decimal(3.25) /
                       Decimal(100))) + stock.price
        stock.weight = stock.weight + (stock.weight * (change / Decimal(6.75)))
        db.session.commit()
    # If Stock's weight is greater than change
    # Stock Weight Decreases + Stock Value Decreases
    else:
        stock.price = (stock.price * (change * Decimal(3.45) /
                       Decimal(100) * Decimal(-1))) + stock.price
        stock.weight = stock.weight - (stock.weight * (change / Decimal(6.75)))
        db.session.commit()

    # Sends Updated Stock to Be Catalogged
    data(stock)


@stock_routes.route('/')
def price_data():
    res = {}
    stocks = Stock.query.all()
    for stock in stocks:
        price_change(stock)
    for stock in stocks:
        res[stock.id] = stock.to_dict()
    db.session.remove()
    return res


@stock_routes.route("/all/<int:userId>")
def get_all(userId):
    res = {}
    stocks = Stock.query.all()

    print(userId)
    if userId:
        for stock in stocks:
            watched = Watchlist.query.filter(userId == Watchlist.userId).filter(
                stock.id == Watchlist.stockId).first()
            owned = Portfolio.query.filter(userId == Portfolio.userId).filter(
                stock.id == Portfolio.stockId).first()
            history = PriceHistory.query.filter(
                stock.id == PriceHistory.stockId).first()

            if watched == None and owned == None and history == None:
                res[stock.id] = {
                    "id": stock.id,
                    "name": stock.name,
                    "ticker": stock.ticker,
                    "price": dumps(stock.price),
                    "owned": False,
                    "history": False,
                    "watched": False
                }
            elif watched == None and owned == None:
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
        db.session.remove()
    return jsonify(res)


@stock_routes.route("/buy/<int:stockId>/<int:userId>", methods=["POST", "PUT"])
def buy_stock(stockId, userId):
    data = request.get_json()
    stock = Stock.query.get(stockId)
    user = User.query.get(current_user.id)
    portfolio = Portfolio.query.filter(stockId == Portfolio.stockId).filter(
        userId == Portfolio.userId).first()
    if user.balance > (stock.price * data['amount']):

        if request.method == "POST":
            user.balance = user.balance - (stock.price * data['amount'])
            bought = Portfolio(
                userId=current_user.id,
                stockId=stockId,
                count=data["amount"],
                purchasePrice=stock.price
            )

            bt = Transaction(
                userId=userId,
                stockId=stockId,
                bought=True,
                amount=data['amount'],
                price=stock.price
            )
            t_count = Transaction.query.filter(
                userId == Transaction.userId).all()
            if (len(t_count) > 20):
                r = Transaction.query.order_by(Transaction.id).filter(
                    userId == Transaction.userId).first()
                db.session.delete(r)

            db.session.add(bt)
            db.session.add(bought)
            db.session.commit()
            return bought.to_dict()

        if request.method == "PUT":

            bt = Transaction(
                userId=userId,
                stockId=stockId,
                bought=True,
                amount=data['amount'] - portfolio.count,
                price=stock.price
            )
            t_count = Transaction.query.filter(
                userId == Transaction.userId).all()

            if (len(t_count) > 20):
                r = Transaction.query.order_by(Transaction.id).filter(
                    userId == Transaction.userId).first()
                db.session.delete(r)

            user.balance = user.balance - \
                (stock.price * (data['amount'] - (portfolio.count)))

            portfolio.purchasePrice = ((portfolio.count * portfolio.purchasePrice) + (
                (data['amount'] - portfolio.count) * stock.price)) / (data['amount'])

            portfolio.count = data['amount']

            db.session.add(bt)
            db.session.commit()
            db.session.remove()
            return "Purchased"

    return {"errors": validation_errors_to_error_messages("Insufficient funds. Please try again.")}, 401


@stock_routes.route('/sell/<int:stockId>/<int:userId>', methods=["PUT", "DELETE"])
def sell_stock(stockId, userId):
    data = request.get_json()
    stock = Stock.query.get(stockId)
    user = User.query.get(current_user.id)
    portfolio = Portfolio.query.filter(stockId == Portfolio.stockId).filter(
        userId == Portfolio.userId).first()

    if request.method == "PUT":
        st = Transaction(
            userId=userId,
            stockId=stockId,
            bought=False,
            amount=portfolio.count - data['amount'],
            price=stock.price
        )

        t_count = Transaction.query.filter(userId == Transaction.userId).all()
        if (len(t_count) > 20):
            r = Transaction.query.order_by(Transaction.id).filter(
                userId == Transaction.userId).first()
            db.session.delete(r)

        user.balance = user.balance + \
            (stock.price * (portfolio.count - data['amount']))

        portfolio.purchasePrice = ((portfolio.count * portfolio.purchasePrice) + (
            (portfolio.count - data["amount"]) * stock.price)) / (portfolio.count)

        portfolio.count = data['amount']

        db.session.add(st)
        db.session.commit()
        db.session.remove()
        return "Updated"

    if request.method == "DELETE":
        st = Transaction(
            userId=userId,
            stockId=stockId,
            bought=False,
            amount=portfolio.count,
            price=stock.price
        )
        t_count = Transaction.query.filter(userId == Transaction.userId).all()
        if (len(t_count) > 20):
            r = Transaction.query.order_by(Transaction.id).filter(
                userId == Transaction.userId).first()
            db.session.delete(r)

        user.balance = user.balance + (stock.price * portfolio.count)

        db.session.add(st)
        db.session.delete(portfolio)
        db.session.commit()
        db.session.remove()
        return "Deleted"


@stock_routes.route('/daily-change')
def get_top_change():
    stocks = Stock.query.all()

    res = {}
    top = 0
    t_stock = None

    loss = 100000000000000000000000
    l_stock = None

    for stock in stocks:
        history = PriceHistory.query.filter(
            stock.id == PriceHistory.stockId).order_by(PriceHistory.id).first()
        change = (Decimal(stock.price) - Decimal(history.price)) / \
            Decimal(history.price) * 100
        if history == None:
            return jsonify(res)
        if top <= change:
            top = change
            t_stock = stock
        if loss >= change:
            loss = change
            l_stock = stock

    res['growth'] = {
        "id": t_stock.id,
        "name": t_stock.name,
        "ticker": t_stock.ticker,
        "price": dumps(t_stock.price),
        "growth": dumps(top)
    }
    res['loss'] = {
        "id": l_stock.id,
        "name": l_stock.name,
        "ticker": l_stock.ticker,
        "price": dumps(l_stock.price),
        "loss": dumps(loss)
    }
    db.session.remove()
    return jsonify(res)


@stock_routes.route('/growth/<int:stockId>')
def get_top_growth(stockId):
    history = PriceHistory.query.filter(
        stockId == PriceHistory.stockId).limit(90).all()
    res = []
    count = len(history)
    for s in history:
        res.append({
            "x": "{} Minutes Ago".format(count),
            "y": dumps(round(s.price, 3))
        })
        count -= 1

    return jsonify(res)


@stock_routes.route('/get/<int:stockId>')
def get_stock_by_id(stockId):
    stock = Stock.query.get(stockId)

    return stock.to_dict()


@stock_routes.route("/post/new", methods=["POST"])
def post_stock():
    form = StockForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_stock = Stock(
            name=form.data['stockName'],
            ticker=form.data['ticker'],
            price=form.data['price'],
            weight=Decimal(0.5)
        )
        db.session.add(new_stock)
        db.session.commit()

        new_price = PriceHistory(
            stockId=new_stock.id,
            price=form.data['price'],
            time=time(),
            interval="60 Seconds"
        )

        db.session.add(new_price)
        db.session.commit()
        return new_stock.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
