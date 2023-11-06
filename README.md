# Techies

SportSync is a web-based platform that empowers users to live a healthy lifestyle through exercise and sports activities. The application allows athletes to book listed activities while coaches create activities to list. Furthermore, SportSync allows for a post-activity review of the coach, live chat functionality to clarify details of the activity between athletes and the coach, and information on nearby taxis should a user require taxi booking services to easily commute to and from the activities.  

## Our Core Objectives:

### Simplify Training Session Booking: 
We aspire to become the go-to resource for sporty individuals in Singapore. Users can effortlessly browse and book training sessions, making it convenient to pursue their fitness goals and interests. Our platform will host a wide range of training options to cater to diverse preferences and skill levels.

### Community Building: 
Beyond just facilitating green space discovery and training session bookings, we aim to foster a sense of community among users. Our platform will allow individuals to connect with like-minded individuals, arrange joint training sessions, and share their fitness journeys, further encouraging active and social lifestyles.

### Seamless Transportation Integration: 
To enhance the overall user experience, we are committed to integrating with the Taxi API and Car Park API. This integration will allow users to locate alternative transportation options quickly, making it easier to reach their chosen training venues. Additionally, our platform will assist drivers in identifying nearby parking facilities, ensuring hassle-free commutes.

## Frontend
Our frontend is developed with React 18.2.0 & Vite 4.4.11

To run the frontend website:
- Ensure that node.js is installed on your computer:
- run ```npm install``` to install dependencies
- run ```npm run dev```to test the program and go to localhost:5173 to view the frontend

## Backend
Our backend is developed with Flask 2.3.3. 

Our database connected is sqlite

To run the backend server:
- run ```pip install -r requirements.txt```
- run ```flask run``` to start the flask server
- You should now be able to communicate with the server through the frontend at localhost:5173

## File Structure of important files and directories

    Techies
    ├── frontend
    ├── backend               # Backend files and folder
    │   ├── resources         # Contains files for endpoints
    │   ├── models            # Contains files for tables in the sqlite datbase 
    │   ├── scripts           # Scripts to create base users and listings
    │   ├── instance          # Instance of the sqlite database
    │   ├── db.py             # Database code
    │   ├── schemas.py        # File containing all schemas
    │   ├── requirements.txt  # File containing all backend dependencies
    │   └── app.py            # Main app configuration
    └── ...


