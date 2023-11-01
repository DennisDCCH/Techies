from db import db

class CoachingServiceModel(db.Model):

    __tablename__ = "coaching_service"

    id = db.Column(db.Integer, primary_key=True)
    
    sport = db.Column(db.String(80), nullable=False)
    datetime = db.Column(db.String(80), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    description = db.Column(db.String(255))
    coverImg = db.Column(db.String(255))
    proficiency = db.Column(db.String(255))
    overallRating = db.Column(db.Float(precision=2)) 
    numReviews = db.Column(db.Integer)
 
    maximum = db.Column(db.Integer)
    available = db.Column(db.Integer)
    haveNotification = db.Column(db.Boolean, default = False, nullable = False)

    #many to many relation
    athletes = db.relationship("UserModel", back_populates="booked", secondary="athlete_service")
    
    #many to one relation
    coach_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    coach = db.relationship("UserModel", back_populates="listings")
    
    #one to many relation
    reviews = db.relationship("ReviewModel", back_populates="service", cascade="all, delete")

    #__table_args__ = (db.UniqueConstraint('location', 'datetime', name='uq_location_time'),)