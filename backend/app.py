# Pravin Mark Jayasinghe
# 9/10/2023
# Initialise Flask App
# Add API endpoint for registration, login and password reset

# Imports
# Import flask to create a flask app
from flask import Flask, request, jsonify
# import cors for cross origin resource sharing
from flask_cors import CORS
# import models.py
from models import db, User
# import werkzeug for password hashing
from werkzeug.security import generate_password_hash, check_password_hash
# find email handler for reset password

# initialises a flask app with cors and database


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    db.init_app(app)
    CORS(app)
    return app


app = create_app()


# API ENDPOINT
# REGISTER A NEW USER
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    hashed_password = generate_password_hash(password, method='sha256')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message="User registered successfully"), 200

# API ENDPOINT
# LOGIN A USER
# CHECK IF USER EXISTS IN THE DATABASE


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        return jsonify(message="Login successful"), 200
    else:
        return jsonify(message="Invalid email or password"), 401

# API ENDPOINT
# RESET A USER PASSWORD


@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if user:
        # Generate a new random password or reset token
        # Send an email to the user with the new password or reset link
        # (Implement email sending here) <--needs research
        pass  # Replace this code with the email sending code
        return jsonify(message="Password reset email sent"), 200
    else:
        return jsonify(message="Email address not found"), 404


# this code is mandatory at the end of a flask app
# this code runs the flask app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # ensure tables are created on startup
    app.run()
