from marshmallow import Schema, fields


class PlainUserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)

class PlainCoachingServiceSchema(Schema):
    id = fields.Int(dump_only=True)
    coach_id = fields.Int(required=True)
    sport = fields.Str(required=True)
    location = fields.Str(required=True)
    price = fields.Float(required=True)
    availability = fields.Str(required=True)
    description = fields.Str(required=True)

class UserSchema(PlainUserSchema):
    password = fields.Str(load_only=True)
    gender = fields.Str(required=True)
    profile_picture = fields.Str(required=True)

    
    savedListings = fields.List(fields.Nested(PlainCoachingServiceSchema()), dump_only=True)
    bookings = fields.List(fields.Nested(PlainCoachingServiceSchema()), dump_only=True)

class CoachingServiceSchema(PlainCoachingServiceSchema):
    athletes = fields.List(fields.Nested(PlainUserSchema()), dump_only=True)

class UserUpdateSchema(Schema):
    username = fields.Str()
    password = fields.Str(load_only=True)
    gender = fields.Str()
    profile_picture = fields.Str()

class LoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(load_only=True)
    
class CoachingServiceUpdateSchema(Schema):
    sport = fields.Str()
    location = fields.Str()
    price = fields.Float()
    availability = fields.Str()
    description = fields.Str()

class ReviewSchema(Schema):
    id = fields.Int(dump_only=True)
    service_id = fields.Int(required=True)
    user_id = fields.Int(required=True)
    rating = fields.Int(required=True)
    comment = fields.Str(required=True)



 