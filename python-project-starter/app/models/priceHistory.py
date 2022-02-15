from .db import db
from sqlalchemy.orm import relationship

class PriceHistory(db.Model):
    __tablename__ = 'priceHistories'

    id = db.Column(db.Integer, primary_key=True)
    stockId = db.Column(db.Integer, db.ForeignKey('stocks.id'))
    price = db.Column(db.Numeric)
    time = db.Column(db.Numeric)
    interval = db.Column(db.String)

    stock = relationship("Stock", foreign_keys=[stockId])
