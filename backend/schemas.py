from marshmallow import Schema, fields


class PlainUserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    userImg = fields.Str() #required = True
    bio = fields.Str() #required = True
    firstname = fields.Str(required=True)
    lastname = fields.Str(required=True)
    
class PlainCoachingServiceSchema(Schema):
    id = fields.Int(dump_only=True)
    coach_id = fields.Int(load_only=True)
    coach = fields.Nested(PlainUserSchema())
    sport = fields.Str(required=True)
    datetime = fields.Str(required=True)
    coverImg = fields.Str(required=True)
    proficiency = fields.Str(required=True)
    haveNotification = fields.Bool(dump_only=True)

class PlainReviewSchema(Schema):
    id = fields.Int(dump_only=True)
    rating = fields.Int(required=True)
    reviewMsg = fields.Str(required=True)
    reviewer = fields.Nested(PlainUserSchema())
    

class UserSchema(PlainUserSchema):
    password = fields.Str(load_only=True)
    gender = fields.Str(required=True)
    email = fields.Str(required=True)
    dob = fields.Str(required=True)
    bio = fields.Str() #required = True
    booked = fields.List(fields.Nested(PlainCoachingServiceSchema()), dump_only=True)
    saved = fields.List(fields.Nested(PlainCoachingServiceSchema()), dump_only=True)
    

class CoachingServiceSchema(PlainCoachingServiceSchema):
    athletes = fields.List(fields.Nested(PlainUserSchema()), dump_only=True)
    reviews = fields.List(fields.Nested(PlainReviewSchema()), dump_only=True)
    location = fields.Str(required=True)
    price = fields.Float(required=True)
    available = fields.Int(dump_only=True)
    maximum = fields.Int(load_only = True)
    description = fields.Str(required=True)
    overallRating = fields.Float(dump_only=True) 
    numReviews = fields.Int(dump_only=True)

class UserUpdateSchema(Schema):
    username = fields.Str()
    userImg = fields.Str()
    email = fields.Str()
    dob = fields.Str()
    bio = fields.Str()

class UserChangePasswordSchema(Schema):
    password = fields.Str()
    newpw = fields.Str()
    newpw2 = fields.Str()

class LoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(load_only=True)
    
class CoachingServiceUpdateSchema(Schema):
    location = fields.Str()
    datetime = fields.Str()
    description = fields.Str()
    sport = fields.Str()
    price = fields.Float()
    proficiency = fields.Str()
    coverImg = fields.Str()

class CoachingServiceFilterSchema(Schema):
    sport = fields.Str()
    proficiency = fields.Str()
    price = fields.Float()
         
class ReviewSchema(PlainReviewSchema):
    service_id = fields.Int(load_only=True)
    service = fields.Nested(PlainCoachingServiceSchema())
    reviewer_id = fields.Int(load_only=True)
    


 