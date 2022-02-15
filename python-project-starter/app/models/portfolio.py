from .db import db
from sqlalchemy.orm import relationship

class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    stockId = db.Column(db.Integer, db.ForeignKey('stocks.id'))
    count = db.Column(db.Numeric)
    purchasePrice = db.Column(db.Numeric)

    user = relationship("User", foreign_keys=[userId])
    stock = relationship("Stock", foreign_keys=[stockId])

