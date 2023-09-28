from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token


from db import db
from models import CoachingServiceModel
from schemas import CoachingServiceSchema

blp = Blueprint("Coaching Service", "coachingservice", description="Operations on CoachingService")

@blp.route("/coaching_services")
class CreateCoachingService(MethodView):
    @blp.arguments(CoachingServiceSchema)
    

