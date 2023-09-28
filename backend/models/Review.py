from db import db

class ReviewModel(db.Model):
    
    __tablename__ = "Reviews"
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(255))

    #many to one
    service_id = db.Column(db.Integer, db.ForeignKey('coaching_service.id'), nullable=False)
    service = db.relationship("CoachingService", back_populates="reviews")
    
    reviewer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reviewer = db.relationship("UserModel", back_populates="reviews")