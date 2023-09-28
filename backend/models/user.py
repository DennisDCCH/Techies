from db import db


class UserModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80), nullable=False)
    profile_picture = db.Column(db.String(255))


    #many to many relationships
    bookings = db.relationship("CoachingServices", back_populates="athletes", secondary="athlete_service")
    
    #One to many relationships
    listings = db.relationship("CoachingServices", back_populates="coach", lazy="dynamic")
    chats = db.relationship("ChatModel", back_populates="user", lazy="dynamic")
    sent_Msgs = db.relationship("MessageModel", back_populates="sender", lazy="dynamic")
    received_Msgs = db.relationship("MessageModel", back_populates="receiver", lazy="dynamic")
    reviews = db.relationship("ReviewModel", back_populates="reviewer", lazy="dynamic")
    