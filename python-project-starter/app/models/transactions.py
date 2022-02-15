from .db import db
from sqlalchemy.orm import relationship

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    stockId = db.Column(db.Integer, db.ForeignKey('stocks.id'))
    bought = db.Column(db.Boolean)
    amount = db.Column(db.Numeric)
    price = db.Column(db.Numeric)
    timestamp = db.Column(db.Numeric)

    user = relationship("User", foreign_keys=[userId])
    stock = relationship("Stock", foreign_keys=[stockId])
