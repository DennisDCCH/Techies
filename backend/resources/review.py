from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, jsonify, make_response
from sqlalchemy.exc import SQLAlchemyError, IntegrityError


from db import db
from models import CoachingServiceModel, ReviewModel, UserModel
from schemas import ReviewSchema

blp = Blueprint("Review", "review", description="Operations on Review")

@blp.route("/review/<string:listing_id>")
class Review(MethodView):
    
    @blp.response(201, ReviewSchema(many = True))
    def get(self, listing_id):
        """ Retrieve coaching service reviews """
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
        """ Post a review for the coaching services """
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)

        coaching_service = CoachingServiceModel.query.get(listing_id)
        reviewList = coaching_service.reviews

        if user not in coaching_service.athletes: 
            response = make_response(jsonify({"message":"Not allowed to review as you did not book the service"}), 400)
            return response
        
        for review in reviewList:
            if user_id == review.reviewer_id:
                response = make_response(jsonify({"message":"Not allowed to review as you have already reviewed the service"}), 400)
                return response

        review = ReviewModel(**review_data, reviewer_id = user_id)
        reviewList.insert(0, review)

        coaching_service.numReviews += 1 
        coaching_service.overallRating = (coaching_service.overallRating * (coaching_service.numReviews - 1)+ review.rating)/coaching_service.numReviews

        try:
            db.session.add(review)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the review.")
        return review

