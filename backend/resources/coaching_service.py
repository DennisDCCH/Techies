from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import request, jsonify
from sqlalchemy.exc import SQLAlchemyError, IntegrityError


from db import db
from models import CoachingServiceModel
from models import UserModel
from schemas import CoachingServiceSchema, CoachingServiceUpdateSchema, CoachingServiceFilterSchema
from resources.chatApi_interaction import ChatAPI

blp = Blueprint("Coaching Service", "coachingservice", description="Operations on CoachingService")


@blp.route("/coaching_services/filter")
class CoachingServiceSearch(MethodView):

    @blp.arguments(CoachingServiceFilterSchema)
    @blp.response(201, CoachingServiceSchema(many = True))
    def post(self, filters):
        """ Gets a list of filtered coaching services """
        query = db.session.query(CoachingServiceModel).order_by(CoachingServiceModel.price.desc()).all()

        if "proficiency" in filters:
            query = [service for service in query if service.proficiency == filters["proficiency"]]

        if "price" in filters:
            query = [service for service in query if service.price <= filters["price"]]

        if "sport" in filters:
            query = [service for service in query if service.sport == filters["sport"]]

        return query


@blp.route("/coaching_services")
class CoachingServiceList(MethodView):
    @blp.response(200, CoachingServiceSchema(many=True))
    def get(self):
        """ Retrieve all listing services """

        # Order it from last service to first service
        return CoachingServiceModel.query.order_by(CoachingServiceModel.id.desc()).all()
    
    
    @blp.arguments(CoachingServiceSchema)
    @blp.response(201, CoachingServiceSchema)
    @jwt_required()
    def post(self, coaching_service_data):
        """ List coaching service """
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        
        coaching_service = CoachingServiceModel(**coaching_service_data, coach_id = user_id, numReviews = 0, overallRating = 0, available = coaching_service_data["maximum"])
        response, createdChat = ChatAPI.create_grp_chat(user, coaching_service_data["description"])
        coaching_service.chat_id = response["id"]
        try:
            db.session.add(coaching_service)
            db.session.commit()

        except SQLAlchemyError:
            abort(500, message="An error occurred creating the service.")

        return coaching_service
    


@blp.route("/services/<string:listing_id>")
class Services(MethodView):
    @jwt_required()
    @blp.response(200, CoachingServiceSchema)
    def get(self, listing_id):
        """ Retrieve a specific listing given listing id """
        user_id = get_jwt_identity()
        coaching_service = CoachingServiceModel.query.get_or_404(listing_id)
        if coaching_service.coach_id == user_id:
            coaching_service.haveNotification = False
            db.session.commit()
        coaching_service.reviews.reverse()
        return coaching_service
    
    @jwt_required()
    def delete(self, listing_id):
        """ Delete coaching services """
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        coaching_service = CoachingServiceModel.query.get_or_404(listing_id)
        

        if coaching_service in user.listings:
            db.session.delete(coaching_service)
            db.session.commit()
            response, deleted = ChatAPI.delete_grp_chat(coaching_service)
            return {"message": "Item and Group Chat deleted.", "Group chat deletion status": deleted}
        else:
            return {"message": "You do not have the rights to delete this listing."}

    @jwt_required()
    @blp.arguments(CoachingServiceUpdateSchema)
    def put(self,coaching_service_data, listing_id):
        """ Edit coaching services listing """
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        coaching_service = CoachingServiceModel.query.get_or_404(listing_id)
        
        coaching_service = CoachingServiceModel.query.get(listing_id)

        if coaching_service in user.listings:  
            coaching_service.sport = coaching_service_data["sport"]
            coaching_service.location = coaching_service_data["location"]
            coaching_service.price = coaching_service_data["price"]
            coaching_service.description = coaching_service_data["description"]
            coaching_service.proficiency = coaching_service_data['proficiency']
            coaching_service.coverImg = coaching_service_data['coverImg']
            coaching_service.datetime = coaching_service_data['datetime']
       
            db.session.commit()
            return {"message": "Service Edited"}, 200
        else:
            return {"message": "You do not have the rights to edit this listing."}
        


@blp.route("/book/<string:listing_id>")
class Booking(MethodView):
    
    @jwt_required()
    def post(self, listing_id):
        """ Booking of coaching services listing """
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        coaching_service = CoachingServiceModel.query.get(listing_id)
        
        if user is None or coaching_service is None:
            return {'message': 'User or service not found'}, 404
        if coaching_service.coach_id == user_id:
            return {'message': 'You cannot book your own listing'}, 400        
        if coaching_service in user.booked:
            return {'message': 'You have already booked this service'}, 400
        if coaching_service.available == 0:
            return {'message': 'There are no more available slots'}, 400
        
        user.booked.append(coaching_service)
        coaching_service.athletes.append(user)

        #add user into as chat member for coaching service grp chat
        joined = ChatAPI.join_grp_chat(user.username, coaching_service)
        
        coaching_service.available -= 1
        coaching_service.haveNotification = True
        db.session.commit()

        return {'message': 'Service booked successfully', "Joined group chat status": joined}, 200

    @jwt_required()
    def delete(self, listing_id):
        """ Cancel a booking of coaching services"""
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        coaching_service = CoachingServiceModel.query.get(listing_id)

        if user is None or coaching_service is None:
            return {'message': 'User or service not found'}, 404

        if coaching_service not in user.booked:
            return {'message': 'You have not booked this service yet'}, 400
        user.booked.remove(coaching_service)
        coaching_service.available += 1
        db.session.commit()
        left = ChatAPI.leave_grp_chat(user.username, coaching_service)

        return {'message': 'Service removed successfully from bookings', "Left group chat status": left}


    
@blp.route("/save/<string:listing_id>")
class Saving(MethodView):
    
    @jwt_required()
    def post(self, listing_id):
        """ Saving coaching services listing """
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
        """ Delete the saved coaching service listing """
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
        """ Retrieve all services """
        services = CoachingServiceModel.query.all()
        return services, 200
    
    def delete(self):
        """ Delete all services """
        services = CoachingServiceModel.query.all()
        for service in services:
            db.session.delete(service)
        db.session.commit()
        return jsonify({"message":"all services deleted"})
