from crypt import methods
from flask import Blueprint, jsonify, request
from simplejson import dumps
from app.models import db, Watchlist, Stock, User
from flask_login import current_user

watchlist_routes = Blueprint("watchlists", __name__)


@watchlist_routes.route('/<int:userId>')
def get_user_watchlist(userId):
    watchlist = Watchlist.query.filter(userId == Watchlist.userId).all()
    res = {}
    if watchlist == None:
        return
    for w in watchlist:
        stock = Stock.query.get(w.stockId)
        db.session.remove()
        res[w.id] = {
            "id": w.id,
            "stockId": w.stockId,
            "stockName": stock.name,
            "currentPrice": dumps(stock.price),
            "ticker": stock.ticker,
            "priceAlert": dumps(w.priceAlert)
        }
    return jsonify(res)


@watchlist_routes.route('/change/<int:stockId>/<int:userId>', methods=["PUT", "DELETE"])
def change_price_alert(userId, stockId):
    watched = Watchlist.query.filter(userId == Watchlist.userId).filter(stockId == Watchlist.stockId).first()

    data = request.get_json()

    if request.method == "DELETE":
        db.session.delete(watched)
        db.session.commit()
        db.session.remove()
        return "Removed"

    if request.method == "PUT":
        watched.priceAlert = data['amount']
        db.session.commit()
        db.session.remove()
        return "Updated"


@watchlist_routes.route('/alert/')
def get_alerts():
    res = {}

    if current_user == None:
        return jsonify(res)

    alert = Watchlist.query.filter(current_user.id == Watchlist.userId).all()


    for a in alert:
        stock = Stock.query.get(a.stockId)
        if a.priceAlert > stock.price:
            res[a.id] = a.to_dict()
    db.session.remove()
    return jsonify(res)

@watchlist_routes.route('/create/<int:stockId>', methods=["POST"])
def add_watchlist(stockId):
    data = request.get_json()
    watch = Watchlist(
        userId= current_user.id,
        stockId= stockId,
        priceAlert= data['alert']
    )
    db.session.add(watch)
    db.session.commit()
    db.session.remove()
    return "Added"
