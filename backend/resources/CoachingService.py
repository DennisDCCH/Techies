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
    


@blp.route("/services/<string:listing_id>")
class Services(MethodView):
    @blp.response(200, CoachingServiceSchema(many=True))
    def get(self):
        return CoachingServiceModel.query.all()
    
    
    @blp.arguments(CoachingServiceSchema)
    @blp.response(201, CoachingServiceSchema)
    def delete(self, listing_id):
        coaching_service = CoachingServiceModel(**listing_id)
        try:
            db.session.delete(coaching_service)
            db.session.commit()

        except SQLAlchemyError:
            abort(500, message="An error occurred deleting the service.")

        return coaching_service


    def put(self, listing_id):
        listing_id = CoachingServiceModel(**listing_id)
        listing_id.verified = True
        db.session.commit()
        return {"message": "Service Edited"}, 200


@blp.route("/booking/<string:listing_id>/<string:user_id>")
class Services(MethodView):
    @blp.response(200, CoachingServiceSchema(many=True))
    @blp.arguments(CoachingServiceSchema)
    @blp.response(201, CoachingServiceSchema)
    def post(self, listing_id, user_id):
        coaching_service = CoachingServiceModel(**listing_id)
        try:
            db.session.add(coaching_service)
            db.session.commit()
        except IntegrityError:
            abort(
                400,
                message="The service is already booked.",
            )
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the store.")

        return coaching_service


    def delete(self, listing_id, user_id):
        coaching_service = CoachingServiceModel(**coaching_service_data)
        try:
            db.session.delete(coaching_service)
            db.session.commit()

        except SQLAlchemyError:
            abort(500, message="An error occurred cancelling the service.")

        return coaching_service


    
@blp.route("/savebooking/<string:listing_id>/<string:user_id>")
class Services(MethodView):
    @blp.response(200, CoachingServiceSchema(many=True))
    @blp.arguments(CoachingServiceSchema)
    @blp.response(201, CoachingServiceSchema)
    def post(self, listing_id, user_id):
        coaching_service = CoachingServiceModel(**listing_id)
        db.session.add(coaching_service)
        db.session.commit()
        return coaching_service
