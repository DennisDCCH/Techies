from db import db

class MessageModel(db.Model):

    __tablename__ = "Messages"

    id = db.Column(db.Integer, primary_key=True)

    #many to one relation
    sender_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    sender = db.relationship("UserModel", back_populates="sentMsgs")
    
    receiver_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    receiver = db.relationship("UserModel", back_populates="receivedMsgs")
    
    chat_id = db.Column(db.Integer, db.ForeignKey("chat.id"), nullable=False)
    chat = db.relationship("ChatModel", back_populates="messages")