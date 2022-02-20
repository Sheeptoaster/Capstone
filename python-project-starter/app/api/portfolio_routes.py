from flask import Blueprint, jsonify, request
from simplejson import dumps
from app.models import db, Portfolio, Stock, User, Transaction

portfolio_routes = Blueprint("portfolios", __name__)

@portfolio_routes.route('/<int:userId>')
def get_user_portfolio(userId):
    portfolio = Portfolio.query.filter(userId == Portfolio.userId).all()
    res = {}
    if portfolio == None:
        return
    for s in portfolio:
        stock = Stock.query.get(s.stockId)
        res[s.id] = {
            "id": s.id,
            "stockId": s.stockId,
            "stockName": stock.name,
            "currentPrice": dumps(stock.price),
            "ticker": stock.ticker,
            "count": dumps(s.count),
            "purchasePrice": dumps(s.purchasePrice)
        }
    db.session.remove()
    return jsonify(res)



@portfolio_routes.route('/add/<int:stockId>/<int:userId>', methods=["PUT"])
def add_to_portfolio(stockId, userId):
    portfolio = Portfolio.query.filter(userId == Portfolio.userId).filter(stockId == Portfolio.stockId).first()
    user = User.query.get(userId)
    stock = Stock.query.get(stockId)
    data = request.get_json()

    ## User balance validation Check
    if (stock.price * data['amount'] > user.balance):
        return 'Not Enough Money.'

    ## Averages Current PurchasePrice with Amount Owned and Recalculates New Avergage with New purchase values
    portfolio.purchasePrice = ((portfolio.purchasePrice * portfolio.count) + (stock.price * (data['amount'] - portfolio.count))) / (data['amount'])

    ## Updates User balance to reflect remaining balance after purchase
    user.balance = user.balance - stock.price * (data['amount'] - portfolio.count)

    bt = Transaction(
        userId=userId,
        stockId=stockId,
        bought=True,
        amount=data['amount'] - portfolio.count,
        price = stock.price
    )

    t_count = Transaction.query.filter(userId == Transaction.userId).all()
    if (len(t_count) > 20):
        r = Transaction.query.order_by(Transaction.id).filter(userId == Transaction.userId).first()
        db.session.delete(r)
        db.session.commit()

    portfolio.count = data['amount']
    db.session.add(bt)
    db.session.commit()
    return portfolio.to_dict()

@portfolio_routes.route('/sell/<int:stockId>/<int:userId>', methods=["PUT", "DELETE"])
def sell_stock(stockId, userId):
    portfolio = Portfolio.query.filter(userId == Portfolio.userId).filter(stockId == Portfolio.stockId).first()
    user = User.query.get(userId)
    stock = Stock.query.get(stockId)

    data = request.get_json()


    if request.method == 'DELETE':
        ## Updates User Balance to Reflect Updated Balance
        user.balance = user.balance + (stock.price * portfolio.count)
        st = Transaction(
        userId=userId,
        stockId=stockId,
        bought=False,
        amount=portfolio.count,
        price = stock.price
        )

        t_count = Transaction.query.filter(userId == Transaction.userId).all()
        if (len(t_count) > 20):
            r = Transaction.query.order_by(Transaction.id).filter(userId == Transaction.userId).first()
            db.session.delete(r)

        db.session.add(st)
        db.session.delete(portfolio)
        db.session.commit()
        return "Stock sold"

    if request.method == 'PUT':
        ## Updates User Balance to Reflect Updated Balance
        user.balance = user.balance + (stock.price * (portfolio.count - data['amount']))
        st = Transaction(
        userId=userId,
        stockId=stockId,
        bought=False,
        amount=portfolio.count - data['amount'],
        price = stock.price
        )
        t_count = Transaction.query.filter(userId == Transaction.userId).all()
        if (len(t_count) > 20):
            r = Transaction.query.order_by(Transaction.id).filter(userId == Transaction.userId).first()
            db.session.delete(r)

        ## Updates Portfolio Owned Count
        portfolio.count = portfolio.count - (portfolio.count - data['amount'])
        db.session.add(st)
        db.session.commit()
        return portfolio.to_dict()
