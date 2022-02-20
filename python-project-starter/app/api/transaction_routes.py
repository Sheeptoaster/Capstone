from flask import Blueprint, jsonify
from app.models import Transaction
from simplejson import dumps

transaction_routes = Blueprint("transactions", __name__)


@transaction_routes.route('/get/<int:userId>')
def get_user_transactions(userId):
    transactions = Transaction.query.filter(userId == Transaction.userId).all()

    res = {}

    for t in transactions:
        res[t.id] = t.to_dict()

    return jsonify(res)
