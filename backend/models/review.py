from db import db

class ReviewModel(db.Model):
    
    __tablename__ = "review"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    reviewMsg = db.Column(db.String(255))
    picture = db.Column(db.String(255))

    #many to one relationships
    service_id = db.Column(db.Integer, db.ForeignKey('coaching_service.id'), nullable=False)
    service = db.relationship("CoachingServiceModel", back_populates="reviews")

    #many to one relationships
    reviewer_id = db.Column(db.Integer, db.ForeignKey("user.id"), unique=False, nullable=False)
    reviewer = db.relationship("UserModel", back_populates = "reviews")
