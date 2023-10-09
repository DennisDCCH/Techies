from db import db

class MessageModel(db.Model):

    __tablename__ = "message"

    id = db.Column(db.Integer, primary_key=True)

    #many to one relation
    # sender_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    # sender = db.relationship("UserModel", db.ForeignKey("chat.athlete_id"), back_populates="sentMsgs")
    
    # receiver_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    # receiver = db.relationship("UserModel", foreign_keys=[receiver_id], back_populates="receivedMsgs")


    sender_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    sender = db.relationship("UserModel", db.ForeignKey("chat.athlete_id"))
    
    # receiver_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    # receiver = db.relationship("UserModel", foreign_keys=[receiver_id])
    
    chat_id = db.Column(db.Integer, db.ForeignKey("chat.id"), nullable=False)
    chat = db.relationship("ChatModel", back_populates="messages")