from .db import db

class Stock(db.Model):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55))
    ticker = db.Column(db.String(5))
    price = db.Column(db.Numeric)
    weight = db.Column(db.Numeric)


    @property

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ticker': self.ticker,
            'price': self.price,
            'weight': self.weight
        }
