from db import db


class UserModel(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    dob = db.Column(db.String(80), nullable=False)
    bio = db.Column(db.String(80), nullable=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80), nullable=False)
    userImg = db.Column(db.String(80), nullable=True)




    #many to many relationships
    booked = db.relationship("CoachingServiceModel", back_populates="athletes", secondary="athlete_service")

    saved = db.relationship("CoachingServiceModel", secondary="athlete_saved")
    
    #One to many relationships
    listings = db.relationship("CoachingServiceModel", back_populates="coach", lazy="dynamic", cascade="all, delete")
    
    reviews = db.relationship("ReviewModel", back_populates="reviewer", lazy="dynamic")
    
    # sentMsgs = db.relationship("MessageModel", back_populates="sender")
    # receivedMsgs = db.relationship("MessageModel", back_populates="receiver")
    
    # athlete_chats = db.relationship("ChatModel", back_populates="athlete")
    # coach_chats = db.relationship("ChatModel", back_populates="coach")

    
    
    