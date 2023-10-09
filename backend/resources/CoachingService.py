from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError


from db import db
from models import CoachingServiceModel
from models import UserModel
from schemas import CoachingServiceSchema, CoachingServiceUpdateSchema

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
                message="A service with that name already exists.",
            )
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the service.")

        return coaching_service
    


@blp.route("/services/<string:listing_id>")
class Services(MethodView):
    @blp.response(200, CoachingServiceSchema)
    def get(self, listing_id):
        coaching_service = CoachingServiceModel.query.get_or_404(listing_id)
        return coaching_service
    
    def delete(self, listing_id):
        coaching_service = CoachingServiceModel.query.get_or_404(listing_id)
        db.session.delete(coaching_service)
        db.session.commit()

        return {"message": "Item deleted."}

    @blp.response(200, CoachingServiceSchema)
    @blp.arguments(CoachingServiceUpdateSchema)
    def put(self,coaching_service_data, listing_id):
        coaching_service = CoachingServiceModel.query.get(listing_id)

        if coaching_service:
            coaching_service.sport = coaching_service_data["sport"]
            coaching_service.location = coaching_service_data["location"]
            coaching_service.price = coaching_service_data["price"]
            coaching_service.availability = coaching_service_data["availability"]
            coaching_service.description = coaching_service_data["description"]
        else:
            coaching_service = CoachingServiceModel(id = listing_id, **coaching_service_data)

        db.session.commit()
        return {"message": "Service Edited"}, 200


@blp.route("/booking/<string:listing_id>/<string:user_id>")
class Services(MethodView):
    def post(self, listing_id, user_id):
        coaching_service = CoachingServiceModel.query.get_or_404(listing_id)
        user = UserModel.query.get_or_404(user_id)
        
        if user is None or coaching_service is None:
            return {'message': 'User or service not found'}, 404
        
        if coaching_service in user.bookings:
            return {'message': 'You have already booked this service'}, 400
        user.bookings.append(coaching_service)
        db.session.commit()

        return {'message': 'Service booked successfully'}, 200


    def delete(self, listing_id, user_id):
        coaching_service = CoachingServiceModel.query.get_or_404(listing_id)
        user = UserModel.query.get_or_404(user_id)

        if user is None or coaching_service is None:
            return {'message': 'User or service not found'}, 404

        if coaching_service not in user.bookings:
            return {'message': 'You have not booked this service yet'}, 400
        user.bookings.remove(coaching_service)
        db.session.commit()

        return {'message': 'Service removed successfully from bookings'}


    
@blp.route("/save/<string:listing_id>/<string:user_id>")
class Services(MethodView):
    
    def post(self, listing_id, user_id):
        coaching_service = CoachingServiceModel.query.get_or_404(listing_id)
        user = UserModel.query.get_or_404(user_id)
        
        # TO DO Add service into specific user

        try:
            db.session.add()
            db.session.commit()
        except IntegrityError:
            abort(
                400,
                message="The service is already booked.",
            )
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the store.")

        return {"message": "NOT IMPLEMENTED"}, 200
