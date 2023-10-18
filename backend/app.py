from flask import Flask, jsonify
from flask_smorest import Api
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, set_access_cookies, get_jwt
from flask_cors import CORS, cross_origin

from datetime import datetime
from datetime import timedelta
from datetime import timezone
import os

from db import db

from resources.user import blp as UserBlueprint
from resources.coaching_service import blp as CoachingServiceBlueprint
from resources.review import blp as ReviewBlueprint
from resources.taxiapi import blp as TaxiApiBlueprint

def create_app(db_url="postgresql://postgres:techies@localhost:5432/postgres"):
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    app.config["API_TITLE"] = "SportSync REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    #PATH TO SEE DOCUMENTATION: http://127.0.0.1:5000/swagger-ui
    app.config[
        "OPENAPI_SWAGGER_UI_URL"
    ] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(db_url, "sqlite:///data.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True
    

    db.init_app(app)
    api = Api(app)

    app.config["JWT_SECRET_KEY"] = "Techies"
    app.config["JWT_COOKIE_SECURE"] = False
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=10)
    jwt = JWTManager(app)


    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            # Case where there is not a valid JWT. Just return the original response
            return response

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return (jsonify({"message": "The token has expired.", "error": "token_expired"}),401,)

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return (jsonify({"message": "Signature verification failed.", "error": "invalid_token"}),401,)

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return (jsonify({"description": "Request does not contain an access token.","error": "authorization_required",}),401,)

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return (jsonify({"description": "The token has been revoked.", "error": "token_revoked"}),401,)

    # JWT configuration ends

    with app.app_context():
        import models  # noqa: F401

        db.create_all()

    api.register_blueprint(UserBlueprint)
    api.register_blueprint(CoachingServiceBlueprint)
    api.register_blueprint(ReviewBlueprint)
    api.register_blueprint(TaxiApiBlueprint)
    
    return app