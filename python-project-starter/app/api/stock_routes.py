## Historic Price Data Function Theory
from random import random
from time import time, sleep
# import datetime

# def post_price_data(stock):
#     price_point = HistoricPrice(
#         stockId: stock.id,
#         price: stock.price,
#         timestamp: time(),
#         interval: "30 Seconds",
#     )
#     db.session.add(price_point)
#     db.session.commit()
#     return price_point

# def purge_price_data(stock):
#     data_points = HistoricPrice.query
#     .filter(stock.id == stockId)
#     .filter(stock.timestamp < time() - 30000)
#     .order_by(desc(timestamp)).all()
#     while len(data_points > 1000):
#         return


# while True:
#     sleep(30 - time() % 30)
#     stocks = Stocks.query.all()
#     for stock in stocks:
#         post_price_data(stock)
#         purge_price_data(stock)


# ## Randomized Price Change Algo

# def price_change(stock):
#     change = random()
#     if stock.weight > change:
#         stock.price = (stock.price * (change * 2.5 / 100)) + stock.price
#         stock.weight = stock.weight * 1.05
#         db.session.commit()
#     stock.price = (stock.price * (change * 2.5 / 100 * -1)) + stock.price
#     stock.weight = stock.weight / 1.05 - 0.01
#     db.session.commit()

# while True:
#     sleep(30 - time() % 30)
#     stocks = Stocks.query.all()
#     for stock in stocks:
#         price_change(stocks)

print(random())
