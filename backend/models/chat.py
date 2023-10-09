from db import db

class ChatModel(db.Model):

    __tablename__ = "chat"

    id = db.Column(db.Integer, primary_key=True)

    # #many to one relation
    # athlete_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    # athlete = db.relationship("UserModel", foreign_keys=[athlete_id], back_populates="athlete_chats")
    
    # coach_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    # coach = db.relationship("UserModel", foreign_keys=[coach_id], back_populates="coach_chats")

    # #one to many relation
    # messages = db.relationship("MessageModel", back_populates="chat", lazy="dynamic")