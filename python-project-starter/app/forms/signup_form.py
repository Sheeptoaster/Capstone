from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    print("TESTING", form.data)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message="Please Enter A Username"), username_exists])
    email = StringField('email', validators=[DataRequired(
        message="Please Enter An Email"), user_exists, Email()])
    password = StringField('password', validators=[DataRequired()])
    firstName = StringField('firstName', validators=[
                             DataRequired(message="Please Enter A First Name")])
    lastName = StringField('lastName', validators=[
                            DataRequired(message="Please Enter A Last Name")])
