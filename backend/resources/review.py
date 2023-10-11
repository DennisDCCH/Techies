from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, jsonify
from sqlalchemy.exc import SQLAlchemyError, IntegrityError


from db import db
from models import CoachingServiceModel, ReviewModel
from schemas import ReviewSchema

blp = Blueprint("Review", "review", description="Operations on Review")

@blp.route("/review/<string:listing_id>")
class Review(MethodView):
    
    @blp.response(201, ReviewSchema(many = True))
    def get(self, listing_id):
        """Retrieve all reviews of a specific coaching service"""
        coaching_service = CoachingServiceModel.query.get(listing_id)
        reviewList = coaching_service.reviews
        if reviewList:
            return reviewList
        else:
            return jsonify({"message": "This listing has no reviews"}), 200

    @jwt_required()
    @blp.arguments(ReviewSchema)
    @blp.response(201, ReviewSchema)
    def post(self, review_data, listing_id):
        """Post a reviews of a specific coaching service"""
        user_id = get_jwt_identity()
        coaching_service = CoachingServiceModel.query.get(listing_id)
        reviewList = coaching_service.reviews
        review = ReviewModel(**review_data, reviewer_id = user_id)
        reviewList.append(review)

        try:
            db.session.add(review)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the review.")
        return review

