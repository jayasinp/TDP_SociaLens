# Pravin Mark Jayasinghe
# 9/10/2023
# models.py defines the database schema for user authentication
# models.py is the first API endpoint in app.py

from flask_sqlalchemy import SQLAlchemy

# initialise database
db = SQLAlchemy()
# configure a schema for the database


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
