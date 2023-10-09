from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError


from db import db
from models import CoachingServiceModel
from schemas import CoachingServiceSchema

blp = Blueprint("Coaching Service", "coachingservice", description="Operations on CoachingService")

@blp.route("/coaching_services")
class CoachingServiceList(MethodView):
    @blp.response(200, CoachingServiceSchema(many=True))
    def get(self):
        return CoachingServiceModel.query.all()
    
    
    @blp.arguments(CoachingServiceSchema)
    @blp.response(201, CoachingServiceSchema)
    def post(self, coaching_service_data):
        coaching_service = CoachingServiceModel(**coaching_service_data)
        try:
            db.session.add(coaching_service)
            db.session.commit()
        except IntegrityError:
            abort(
                400,
                message="A store with that name already exists.",
            )
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the store.")

        return coaching_service


    

