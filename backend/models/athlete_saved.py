from db import db


class AthleteSaved(db.Model):
    __tablename__ = "athlete_saved"

    id = db.Column(db.Integer, primary_key=True)
    athlete_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    service_id = db.Column(db.Integer, db.ForeignKey("coaching_service.id"))