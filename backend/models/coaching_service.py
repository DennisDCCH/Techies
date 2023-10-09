from db import db

class CoachingServiceModel(db.Model):

    __tablename__ = "coaching_service"

    id = db.Column(db.Integer, primary_key=True)
    
    sport = db.Column(db.String(80), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    availability = db.Column(db.String(255))
    description = db.Column(db.String(255))

    #many to many relation
    athletes = db.relationship("UserModel", back_populates="bookings", secondary="athlete_service")
    
    #many to one relation
    # coach_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # coach = db.relationship("UserModel", back_populates="listings")
    
    #one to many relation
    reviews = db.relationship("ReviewModel", back_populates="service", lazy="dynamic")