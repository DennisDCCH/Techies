from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, jsonify
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
    @jwt_required()
    def post(self, coaching_service_data):

        user_id = get_jwt_identity()
        coaching_service = CoachingServiceModel(**coaching_service_data, coach_id = user_id)
        try:
            db.session.add(coaching_service)
            db.session.commit()
        except IntegrityError:
            abort(
                400,
                message="A service with that time and location already exists.",
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
    
    @jwt_required()
    def delete(self, listing_id):

        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        coaching_service = CoachingServiceModel.query.get_or_404(listing_id)

        if coaching_service in user.listings:
            db.session.delete(coaching_service)
            db.session.commit()
            return {"message": "Item deleted."}
        else:
            return {"message": "You do not have the rights to delete this listing."}

    @jwt_required()
    @blp.arguments(CoachingServiceUpdateSchema)
    def put(self,coaching_service_data, listing_id):
        
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        coaching_service = CoachingServiceModel.query.get_or_404(listing_id)
        
        coaching_service = CoachingServiceModel.query.get(listing_id)

        if coaching_service in user.listings:  
            coaching_service.sport = coaching_service_data["sport"]
            coaching_service.location = coaching_service_data["location"]
            coaching_service.price = coaching_service_data["price"]
            coaching_service.availability = coaching_service_data["availability"]
            coaching_service.description = coaching_service_data["description"]
            db.session.commit()
            return {"message": "Service Edited"}, 200
        else:
            return {"message": "You do not have the rights to edit this listing."}
        


@blp.route("/book/<string:listing_id>")
class Booking(MethodView):
    
    @jwt_required()
    def post(self, listing_id):
        
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        coaching_service = CoachingServiceModel.query.get(listing_id)
        
        if user is None or coaching_service is None:
            return {'message': 'User or service not found'}, 404
        
        if coaching_service in user.booked:
            return {'message': 'You have already booked this service'}, 400
        user.booked.append(coaching_service)
        coaching_service.athletes.append(user)
        db.session.commit()

        return {'message': 'Service booked successfully'}, 200

    @jwt_required()
    def delete(self, listing_id):
        
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        coaching_service = CoachingServiceModel.query.get(listing_id)

        if user is None or coaching_service is None:
            return {'message': 'User or service not found'}, 404

        if coaching_service not in user.booked:
            return {'message': 'You have not booked this service yet'}, 400
        user.booked.remove(coaching_service)
        db.session.commit()

        return {'message': 'Service removed successfully from bookings'}


    
@blp.route("/save/<string:listing_id>")
class Saving(MethodView):
    
    @jwt_required()
    def post(self, listing_id):
        
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        coaching_service = CoachingServiceModel.query.get(listing_id)
        
        if user is None or coaching_service is None:
            return {'message': 'User or service not found'}, 404
        
        if coaching_service in user.saved:
            return {'message': 'You have already saved this service'}, 400
        user.saved.append(coaching_service)
        db.session.commit()

        return {'message': 'Service saved successfully'}, 200

    @jwt_required()
    def delete(self, listing_id):
        
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        coaching_service = CoachingServiceModel.query.get(listing_id)

        if user is None or coaching_service is None:
            return {'message': 'User or service not found'}, 404

        if coaching_service not in user.saved:
            return {'message': 'You have not booked this service yet'}, 400
        user.saved.remove(coaching_service)
        db.session.commit()

        return {'message': 'Service removed successfully from saved listings'}


"""THIS IS ALL THE ADMIN STUFF, EASIER FOR DEVELOPMENT ONLY! DO NOT USE IN PRODUCTION"""
@blp.route("/services/godmode")
class GodMode(MethodView):
    @blp.response(200, CoachingServiceSchema(many = True))
    def get(self):
        services = CoachingServiceModel.query.all()
        return services, 200
    
    def delete(self):
        services = CoachingServiceModel.query.all()
        for service in services:
            db.session.delete(service)
        db.session.commit()
        return jsonify({"message":"all services deleted"})