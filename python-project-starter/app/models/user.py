from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import simplejson

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstName = db.Column(db.String(55), nullable=False)
    lastName = db.Column(db.String(55), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    balance = db.Column(db.Numeric, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            "firstName": self.firstName,
            "lastName": self.lastName,
            'email': self.email,
            "balance": simplejson.dumps(self.balance)
        }
