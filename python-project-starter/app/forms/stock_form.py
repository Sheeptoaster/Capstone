from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Stock

def stock_exists(form, field):
    stockName = field.data['stockName']
    stock = Stock.query.filter(Stock.name == stockName)
    if not stock:
        raise ValidationError("Name Provided is Already In Use")

def ticker_exists(form, field):
    ticker = field.data['ticker']
    stock = Stock.query.filter(Stock.ticker == ticker)
    if not stock:
        raise ValidationError("Ticker Provided is Already In Use")

class StockForm(FlaskForm):
    stockName = StringField('stockName', validators=[DataRequired(message="Please Enter A Valid Name for Your Company."), Length(min=1, max=55)])
    ticker = StringField("ticker", validators=[DataRequired("Please Provide A Valid Ticker for Your Company"), Length(min=1, max=5)])
    price = DecimalField('price', validators=[DataRequired(message="Please Provide A Valid Price for Your Company")])
