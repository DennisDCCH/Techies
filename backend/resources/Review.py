from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token


from db import db
from models import ReviewModel
from schemas import ReviewSchema

blp = Blueprint("Review", "review", description="Operations on Review")

@blp.route("/reviews")
class CreateReview(MethodView):
    @blp.arguments(ReviewSchema)
    def get():
        pass




@blp.route("/reviews")
class GetReview(MethodView):
    @blp.arguments(ReviewSchema)
    def get():
        pass
