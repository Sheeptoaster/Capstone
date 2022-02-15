from .db import db
from sqlalchemy.orm import relationship

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    stockId = db.Column(db.Integer, db.ForeignKey('stocks.id'))
    priceAlert = db.Column(db.Numeric)

    user = relationship("User", foreign_keys=[userId])
    stock = relationship("Stock", foreign_keys=[stockId])
