from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Email, Length
from app.models import User

def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()

    if email == current_user.email:
        return
    elif user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()

    if username == current_user.username:
        return
    elif user:
        raise ValidationError('Username is already in use.')


class EditProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message="Please Provide A Valid Username"), username_exists])
    firstName = StringField('firstName', validators=[DataRequired(message="Please Provide A Valid First Name")])
    lastName = StringField('lastName', validators=[DataRequired(message="Please Provide A Valid Last Name")])
    email= StringField('email', validators=[DataRequired(message="Please Provide A Valid Email Address"), user_exists, Email()])
