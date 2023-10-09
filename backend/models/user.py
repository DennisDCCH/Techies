from db import db


class UserModel(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80), nullable=False)
    profile_picture = db.Column(db.String(80), nullable=False)




    #many to many relationships
    bookings = db.relationship("CoachingServiceModel", back_populates="athletes", secondary="athlete_service")
    
    #One to many relationships
    listings = db.relationship("CoachingServiceModel", back_populates="coach", lazy="dynamic")
    
    sentMsgs = db.relationship("MessageModel", back_populates="sender")
    # receivedMsgs = db.relationship("MessageModel", back_populates="receiver")
    
    athlete_chats = db.relationship("ChatModel", back_populates="athlete")
    # coach_chats = db.relationship("ChatModel", back_populates="coach")

    
    reviews = db.relationship("ReviewModel", back_populates="reviewer", lazy="dynamic")
    