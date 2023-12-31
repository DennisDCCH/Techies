from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity, set_access_cookies, set_refresh_cookies
from flask import request, jsonify
from passlib.hash import pbkdf2_sha256
import requests, os
from dotenv import load_dotenv

from db import db
from models import UserModel
from schemas import UserSchema, UserUpdateSchema, LoginSchema, CoachingServiceSchema, UserChangePasswordSchema, PlainCoachingServiceSchema
from resources.chatApi_interaction import ChatAPI

load_dotenv()
blp = Blueprint("Users", "users", description="Operations on users")

@blp.route("/homepage")
class HomePage(MethodView): 
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        listings = user.listings.all()
        overallNotification = False

        #overallNotification also should return true when there is a message (need to check API how to check for message)

        for listing in listings:
            if listing.haveNotification == True:
                overallNotification = True
        return jsonify({"overallNotification": overallNotification})


@blp.route("/register")
class UserRegister(MethodView): 
    @blp.arguments(UserSchema)
    def post(self, user_data):
        """ Registers a user given a JSON input of their details"""
        
        if UserModel.query.filter(UserModel.username == user_data["username"]).first():
            abort(409, message="A user with that username already exists.")

        user = UserModel(
            firstname = user_data["firstname"],
            lastname = user_data["lastname"],
            email = user_data["email"],
            username=user_data["username"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            dob = user_data["dob"],
            gender = user_data["gender"],
            userImg = user_data["userImg"],
            bio = user_data["bio"]

        )
        db.session.add(user)
        db.session.commit()

        #call chatAPI to create user in their database
        response = ChatAPI.create_user(user_data)

        return {"message": "User created successfully.", "chat_api_response":response}, 200

@blp.route("/mychats")
class UserChats(MethodView):
    @jwt_required()
    def get(self):
        """ Returns user info (ChatAPI)"""
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        response = ChatAPI.get_user(user)
        return response

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
        """ Retrieve user id """
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)

        return user

    @blp.arguments(UserUpdateSchema)
    @blp.response(200, UserSchema)
    @jwt_required()
    def put(self, user_data):
        """ Edit user profile """
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)

        user.email = user_data["email"]
        user.dob = user_data["dob"]
        user.bio = user_data["bio"]
        user.username = user_data["username"]

        if user_data["userImg"] != "":
            user.userImg = user_data["userImg"]
        db.session.commit()

        return user, 201


@blp.route("/user/changepassword")
class ChangePassword(MethodView):
    @blp.arguments(UserChangePasswordSchema)
    @jwt_required()
    def put(self,user_data):
        """ Change Password """
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        if pbkdf2_sha256.verify(user_data["password"], user.password) == False:
            abort(400, message="Old password does not match current password")
        
        if pbkdf2_sha256.verify(user_data["newpw"], user.password):
            abort(409, message="Password needs to be different from old password.")

        user.password = pbkdf2_sha256.hash(user_data["newpw"])
        db.session.commit()
        return jsonify({"message": "password changed"}), 201



@blp.route("/user/booked")
class ViewBooked(MethodView):
    @jwt_required()
    @blp.response(200, PlainCoachingServiceSchema(many = True))
    def get(self):
        """ Retrieve User's booking services """
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)

        bookings = user.booked
        if bookings:
            bookings.reverse()
            return bookings
        else:
            return jsonify({"message": "You have not booked any services"}), 200


@blp.route("/user/saved")
class ViewSaved(MethodView):
    @jwt_required()
    @blp.response(200, PlainCoachingServiceSchema(many = True))
    def get(self):
        """ Retrieve user's saved coaching services """
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        saved = user.saved
        if saved:
            saved.reverse()
            return saved
        else:
            return jsonify({"message": "You have not saved any services"}), 200


@blp.route("/user/listings")
class ViewListings(MethodView):
    @jwt_required()
    @blp.response(200, PlainCoachingServiceSchema(many = True))
    def get(self):
        """ Retrieve user's listed coaching services """
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        listings = user.listings.all()
        if listings:
            listings.reverse()
            return listings
        else:
            return jsonify({"message": "You have not listed any services"}), 200

"""THIS IS ALL THE ADMIN STUFF, EASIER FOR DEVELOPMENT ONLY! DO NOT USE IN PRODUCTION"""
@blp.route("/user/godmode")
class GodMode(MethodView):
    @blp.response(200, UserSchema(many=True))
    def get(self):
        users = UserModel.query.all()
        return users, 200
    
    def delete(self):
        users = UserModel.query.all()
        for user in users:
            db.session.delete(user)
        db.session.commit()
        return jsonify({"message":"all users deleted"})

@blp.route("/chatapi/godmode")
class ChatAPIGodMode(MethodView):
    def get(self):
        user_list = ChatAPI.get_all_users()
        return user_list, 200
    
    def delete(self):
        ChatAPI.delete_all_users()
        return jsonify({"message":"all users deleted"})