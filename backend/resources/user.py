from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity, set_access_cookies, set_refresh_cookies
from flask import request, jsonify
from passlib.hash import pbkdf2_sha256

from db import db
from models import UserModel
from schemas import UserSchema, UserUpdateSchema, LoginSchema, CoachingServiceSchema


blp = Blueprint("Users", "users", description="Operations on users")


@blp.route("/register")
class UserRegister(MethodView): 
    @blp.arguments(UserSchema)
    def post(self, user_data):
        """ Registers a user given a JSON input of their details"""
        # NEED TO CHECK THAT PASSWORD FULFILLS REQUIREMENTS
        
        if UserModel.query.filter(UserModel.username == user_data["username"]).first():
            abort(409, message="A user with that username already exists.")

        user = UserModel(
            username=user_data["username"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            gender = user_data["gender"],
            profile_picture = user_data["profile_picture"]
        )
        db.session.add(user)
        db.session.commit()

        return {"message": "User created successfully."}, 201

@blp.route("/login")
class UserLogin(MethodView):
    @blp.arguments(LoginSchema)
    def post(self, user_data):
        """ Authenticates a user via username and password with the database, grants them an access token and a refresh token"""
        
        user = UserModel.query.filter(
            UserModel.username == user_data["username"]
        ).first()

        # Havent Give user a refresh token
        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            access_token = create_access_token(identity=user.id)
            response = jsonify({"access_token": access_token})
            set_access_cookies(response, access_token)
            return response, 200

        abort(401, message="Invalid credentials.")


@blp.route("/user")
class User(MethodView):

    @blp.response(200, UserSchema)
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        return user

    @blp.arguments(UserUpdateSchema)
    @blp.response(200, UserSchema)
    def put(self, user_data):
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)

        if UserModel.query.filter(UserModel.username == user_data["username"]).first():
            abort(409, message="A user with that username already exists.")

        user.username = user_data["username"]
        user.password = user_data["password"]
        user.gender = user_data["gender"]
        user.profile_picture = user_data["profile_picture"]
        db.session.commit()

        return user, 201

    # def delete(self, user_id):
    #     user = UserModel.query.get_or_404(user_id)
    #     db.session.delete(user)
    #     db.session.commit()
    #     return {"message": "User deleted."}, 200

@blp.route("/user/booked")
class ViewBooked(MethodView):
    @blp.response(200, CoachingServiceSchema(many = True))
    def get(self):
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)

        bookings = user.booked
        if bookings:
            return user.booked
        else:
            return jsonify({"message": "You have not booked any services"}), 200


@blp.route("/user/saved")
class ViewSaved(MethodView):
    @blp.response(200, CoachingServiceSchema(many = True))
    def get(self):
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        saved = user.saved
        if saved:
            return user.saved
        else:
            return jsonify({"message": "You have not saved any services"}), 200