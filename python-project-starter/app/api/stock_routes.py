## Historic Price Data Function Theory
from crypt import methods
from flask import Blueprint
from random import random
from time import time
from decimal import Decimal

from app.models import db
from app.models import Stock, PriceHistory

stock_routes = Blueprint("stocks", __name__)


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
    if stock.weight > change:
        stock.price = (stock.price * (change * Decimal(2.5) / Decimal(100))) + stock.price
        # stock.weight = (stock.weight - (Decimal(0.05) * stock.weight)) + stock.weight
        stock.weight = stock.weight - (stock.weight * (change / Decimal(8.5)))
        db.session.commit()
    else:
        stock.price = (stock.price * (change * Decimal(2.5) / Decimal(100) * Decimal(-1))) + stock.price
        # stock.weight = stock.weight / Decimal(1.05)
        stock.weight = stock.weight + (stock.weight * (change / Decimal(8.5)))
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

