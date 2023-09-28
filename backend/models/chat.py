from db import db

class ChatModel(db.Model):

    __tablename__ = "Chats"

    id = db.Column(db.Integer, primary_key=True)

    #many to one relation
    user1_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user1 = db.relationship("UserModel", back_populates="chats")
    user2_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    user2 = db.relationship("UserModel", back_populates="chats")

    #one to many relation
    messages = db.relationship("MessageModel", back_populates="chats", lazy="dynamic")