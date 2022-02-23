from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms.edit_user_form import EditProfileForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

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
    form = EditProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.get(id)
        user.firstName = form.data['firstName']
        user.lastName = form.data['lastName']
        user.username = form.data['username']
        user.email = form.data['email']

        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
