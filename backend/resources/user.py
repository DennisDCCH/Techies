from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, decode_token
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
        user = UserModel.query.filter(
            UserModel.username == user_data["username"]
        ).first()

        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            access_token = create_access_token(identity=user.id)
            return {"access_token": access_token}, 200

        abort(401, message="Invalid credentials.")


@blp.route("/user")
class User(MethodView):

    @blp.response(200, UserSchema)
    @jwt_required()
    def get(self):
        # Access the JWT from the request headers and get the user_id
        authorization_header = request.headers.get('Authorization')
        jwt_token = authorization_header[len('Bearer '):]
        decoded_token = decode_token(jwt_token)
        user_id = decoded_token['sub']
        user = UserModel.query.get(user_id)

        return user

    @blp.arguments(UserUpdateSchema)
    @blp.response(200, UserSchema)
    def put(self, user_data):
        
        # Access the JWT from the request headers and get the user_id
        authorization_header = request.headers.get('Authorization')
        jwt_token = authorization_header[len('Bearer '):]
        decoded_token = decode_token(jwt_token)
        user_id = decoded_token['sub']
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
        # Access the JWT from the request headers and get the user_id
        authorization_header = request.headers.get('Authorization')
        jwt_token = authorization_header[len('Bearer '):]
        decoded_token = decode_token(jwt_token)
        user_id = decoded_token['sub']
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
        # Access the JWT from the request headers and get the user_id
        authorization_header = request.headers.get('Authorization')
        jwt_token = authorization_header[len('Bearer '):]
        decoded_token = decode_token(jwt_token)
        user_id = decoded_token['sub']
        user = UserModel.query.get(user_id)

        saved = user.saved
        if saved:
            return user.saved
        else:
            return jsonify({"message": "You have not saved any services"}), 200