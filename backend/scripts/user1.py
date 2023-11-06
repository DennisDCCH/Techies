import requests

base_url = "http://127.0.0.1:5000"  # Replace with your server's base URL

# User registration request
def register_user(data):
    register_url = f"{base_url}/register"
    response = requests.post(register_url, json=data)
    return response.json()

# User login request
def login_user(data):
    login_url = f"{base_url}/login"
    response = requests.post(login_url, json=data)
    if response.status_code == 200:
        # Extract the JWT token from the response
        access_token = response.json().get('access_token')
        # Store the token for subsequent authorized requests
        return access_token
    return None

def create_listing(data, headers):
    listing_url = f"{base_url}/coaching_services"
    print(headers)
    response = requests.post(listing_url, json=data, headers=headers)
    if response.status_code == 201:  # Assuming 201 is the successful creation status code
        print("Listing created successfully!")
        print(response.json())  # Optional: Print the response data
    else:
        print(f"Failed to create the listing. Status code: {response.status_code}")

# Example user registration data
registration_data = {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "password": "password123",
    "dob" : "12-12-12",
    "gender" : "male",
    "userImg" : " ",
    "bio": "bio"
    # Add other necessary fields based on your schema
}

# Example user login data
login_data = {
    "username": "johndoe",
    "password": "password123"
}

listing_data = {
	"sport":"woohooo",
	"location":"bedok",
	"price":3746,
	"maximum":10,
	"description":"testing script",
	"proficiency":"low",
	"coverImg":"Techies/frontend/images/muchacho.png",
	"datetime":"10-10-2023"
}

# Perform user registration
registration_response = register_user(registration_data)
print("Registration response:", registration_response)

# Perform user login and get JWT token
jwt_token = login_user(login_data)
if jwt_token:
    print("JWT token:", jwt_token)
    headers = {"Authorization": f"Bearer {jwt_token}", 'Content-Type': 'application/json'}
else:
    print("Login failed. JWT token not obtained.")

create_listing(listing_data, headers)

profile_url = f"{base_url}/user"
response = requests.get(profile_url, headers=headers)
print(response.status_code)
