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
            "stockName": stock.name,
            "currentPrice": dumps(stock.price),
            "ticker": stock.ticker,
            "count": dumps(s.count),
            "purchasePrice": dumps(s.purchasePrice)
        }
    return jsonify(res)



@portfolio_routes.route('/add/<int:stockId>/<int:userId>')
def add_to_portfolio(stockId, userId):
    portfolio = Portfolio.query.filter(userId == Portfolio.userId).filter(stockId == Portfolio.stockId).first()
    user = User.query.get(userId)
    stock = Stock.query.get(stockId)
    data = request.get_json()

    if (stock.price * data['amount'] > user.balance):
        return 'Not Enough Money.'

    portfolio.purchasePrice = ((portfolio.purchasePrice * portfolio.amount) + (stock.price * data['amount'])) / (portfolio.amount + data['amount'])
    portfolio.amount = portfolio.amount + data['amount']
    user.balance = stock.price * data['amount']
    db.session.commit()

    return portfolio.to_dict()
