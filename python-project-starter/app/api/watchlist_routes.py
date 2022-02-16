from flask import Blueprint, jsonify, request
from simplejson import dumps
from app.models import db, Watchlist, Stock, User

watchlist_routes = Blueprint("watchlists", __name__)


@watchlist_routes.route('/<int:userId>')
def get_user_watchlist(userId):
    watchlist = Watchlist.query.filter(userId == Watchlist.userId).all()
    res = {}
    if watchlist == None:
        return
    for w in watchlist:
        stock = Stock.query.get(w.stockId)
        res[w.id] = {
            "id": w.id,
            "stockId": w.stockId,
            "stockName": stock.name,
            "currentPrice": dumps(stock.price),
            "ticker": stock.ticker,
            "priceAlert": dumps(w.priceAlert)
        }
    return jsonify(res)
