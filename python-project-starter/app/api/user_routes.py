from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/edit/<int:id>', methods=["PUT"])
def edit_user(id):
    user = User.query.get(id)
    data = request.get_json()
    user.firstName = data['firstName']
    user.lastName = data['lastName']
    user.username = data['username']
    user.email = data['email']

    db.session.commit()
    return user.to_dict()
