from db import db

class ReviewModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(255))
    picture = db.Column(db.String(255))

    # service_id = db.Column(db.Integer, db.ForeignKey('CoachingService.id'), nullable=False)
    # service = db.relationship("CoachingService", back_populates="reviews")