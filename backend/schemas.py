from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(load_only=True)
    gender = fields.Str(required=True)
    profile_picture = fields.Str(required=True)

class LoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(load_only=True)

class CoachingServiceSchema(Schema):
    id = fields.Int(dump_only=True)
    coach_id = fields.Int(required=True)
    sport = fields.Str(required=True)
    location = fields.Str(required=True)
    price = fields.Float(required=True)
    availability = fields.Str(required=True)
    description = fields.Str(required=True)

#add in coachingserviceUpdateschema

class ReviewSchema(Schema):
    id = fields.Int(dump_only=True)
    service_id = fields.Int(required=True)
    user_id = fields.Int(required=True)
    rating = fields.Int(required=True)
    comment = fields.Str(required=True)



 