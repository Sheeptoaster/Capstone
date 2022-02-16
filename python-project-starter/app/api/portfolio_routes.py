from flask import Blueprint, jsonify, request
from simplejson import dumps
from app.models import db, Portfolio, Stock, User

portfolio_routes = Blueprint("portfolios", __name__)

@portfolio_routes.route('/<int:userId>')
def get_user_portfolio(userId):
    portfolio = Portfolio.query.filter(userId == Portfolio.userId).all()
    res = {}
    if portfolio == None:
        return
    for s in portfolio:
        stock = Stock.query.get(s.id)
        res[s.id] = {
            "id": s.id,
            "stockId": s.stockId,
            "stockName": stock.name,
            "currentPrice": dumps(stock.price),
            "ticker": stock.ticker,
            "count": dumps(s.count),
            "purchasePrice": dumps(s.purchasePrice)
        }
    return jsonify(res)



@portfolio_routes.route('/add/<int:stockId>/<int:userId>', methods=["PUT"])
def add_to_portfolio(stockId, userId):
    portfolio = Portfolio.query.filter(userId == Portfolio.userId).filter(stockId == Portfolio.stockId).first()
    user = User.query.get(userId)
    stock = Stock.query.get(stockId)
    data = request.get_json()


    if (stock.price * data['amount'] > user.balance):
        return 'Not Enough Money.'

    portfolio.purchasePrice = ((portfolio.purchasePrice * portfolio.count) + (stock.price * data['amount'])) / (portfolio.count + data['amount'])
    user.balance = user.balance - stock.price * (data['amount'] - portfolio.count)
    portfolio.count = data['amount']
    db.session.commit()

    return portfolio.to_dict()

@portfolio_routes.route('/sell/<int:stockId>/<int:userId>', methods=["PUT", "DELETE"])
def sell_stock(stockId, userId):
    portfolio = Portfolio.query.filter(userId == Portfolio.userId).filter(stockId == Portfolio.stockId).first()
    user = User.query.get(userId)
    stock = Stock.query.get(stockId)

    data = request.get_json()


    if request.method == 'DELETE':
        user.balance = user.balance + (stock.price * portfolio.count)
        db.session.delete(portfolio)
        db.session.commit()
        return "Stock sold"

    if request.method == 'PUT':
        user.balance = user.balance + (stock.price * (portfolio.count - data['amount']))
        portfolio.count = portfolio.count - (portfolio.count - data['amount'])
        db.session.commit()
        return portfolio.to_dict()
