from .db import db
import simplejson

class Stock(db.Model):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55))
    ticker = db.Column(db.String(5))
    price = db.Column(db.Numeric)
    weight = db.Column(db.Numeric)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ticker': self.ticker,
            'price': simplejson.dumps(self.price),
            'weight': simplejson.dumps(self.weight)
        }
