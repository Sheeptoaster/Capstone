from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Stock

def stock_exists(form, field):
    name = field.data
    stock = Stock.query.filter(name == Stock.name).first()
    if stock:
        raise ValidationError("Name Provided is Already In Use")

def ticker_exists(form, field):

    ticker = field.data
    stock = Stock.query.filter(ticker == Stock.ticker).first()
    if stock:
        raise ValidationError("Ticker Provided is Already In Use")

class StockForm(FlaskForm):
    stockName = StringField('stockName', validators=[DataRequired(message="Please Enter A Valid Name for Your Company."), stock_exists, Length(min=1, max=55)])
    ticker = StringField("ticker", validators=[DataRequired("Please Provide A Valid Ticker for Your Company"), ticker_exists, Length(min=1, max=5)])
    price = DecimalField('price', validators=[DataRequired(message="Please Provide A Valid Price for Your Company")])
