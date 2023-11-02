import requests
import os


class ChatAPI:
    project_id = os.environ.get('CHAT_ENGINE_PROJECT_ID')
    private_key = os.environ.get('CHAT_ENGINE_PRIVATE_KEY')

    @staticmethod
    def get_user(user):
        response = requests.get('https://api.chatengine.io/users/me/',
                                headers={
                                    "Project-ID": ChatAPI.project_id,
                                    "User-Name": user.username,
                                    "User-Secret": user.username
                                })
        return response.json()

    @staticmethod
    def create_user(user_data):
        response = requests.post('https://api.chatengine.io/users/',
                                 data={
                                     "username": user_data["username"],
                                     # Using username as secret because cannot unhash
                                     "secret": user_data["username"],
                                     "email": user_data["email"],
                                     "first_name": user_data["firstname"],
                                     "last_name": user_data["lastname"],
                                 },
                                 headers={
                                     "Private-Key": ChatAPI.private_key
                                 })
        return response.json()

    @staticmethod
    def get_all_users():
        response = requests.get('https://api.chatengine.io/users/',
                                headers={
                                    "Private-Key": ChatAPI.private_key
                                })
        users = [(user["username"], user["id"]) for user in response.json()]
        return users

    @staticmethod
    def delete_all_users():
        users = ChatAPI.get_all_users()
        for user in users:
            user_id = user[1]
            requests.delete(f'https://api.chatengine.io/users/{user_id}',
                            headers={
                                "Private-Key": ChatAPI.private_key
                            })
        return

    @staticmethod
    def create_grp_chat(user, title="Group Chat"):
        response = requests.post('https://api.chatengine.io/chats/', data={"title": title, "is_direct_chat": False},
                                 headers={"Project-ID": ChatAPI.project_id, "User-Name": user.username, "User-Secret": user.username})
        
        if response.status_code == 201:
            return response.json(), True
        else:
            return "Error creating group"

    @staticmethod
    def delete_grp_chat(coaching_service):
        coach = coaching_service.coach
        response = requests.delete(f'https://api.chatengine.io/chats/{coaching_service.chat_id}/',
                                   headers={"Project-ID": ChatAPI.project_id, "User-Name": coach.username, "User-Secret": coach.username})

        if response.status_code == 200:
            return response.json(), True
        else:
            return "Error creating group"

    @staticmethod
    def join_grp_chat(username, coaching_service):
        coach_username = coaching_service.coach.username
        chat_id = coaching_service.chat_id
        response = requests.post(f'https://api.chatengine.io/chats/{chat_id}/people/', data = {"username":username},
                      headers={"Project-ID": ChatAPI.project_id, "User-Name": coach_username, "User-Secret": coach_username})
        if response.status_code == 201:
            return True
        else:
            return False

    @staticmethod
    def leave_grp_chat(username, coaching_service):
        coach_username = coaching_service.coach.username
        chat_id = coaching_service.chat_id
        response = requests.put(f'https://api.chatengine.io/chats/{chat_id}/people/', data = {"username":username},
                      headers={"Project-ID": ChatAPI.project_id, "User-Name": coach_username, "User-Secret": coach_username})
        print(response.json())
        if response.status_code == 200:
            return True
        else:
            return False
