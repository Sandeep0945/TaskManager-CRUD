📝 Task Manager

A full-stack task management app with authentication — sign up, log in, and manage your personal tasks through a clean, dark, purple-neon themed dashboard.

https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white

Features
🔐 Authentication — Sign up and log in with hashed passwords (bcrypt)
✅ Task CRUD — Create, read, update, and delete personal tasks
🎨 Themed UI — Dark, purple-neon interface built with Tailwind CSS
👤 Profile panel — Slide-in panel with avatar initial, name, email, and logout
🔒 Route protection — Logged-out users are redirected away from protected pages, and logged-in users skip the login/signup screens
Tech Stack

Backend

Node.js + Express
MongoDB with Mongoose
bcryptjs for password hashing

Frontend

HTML, vanilla JavaScript
Tailwind CSS (via CDN)
Project Structure
TASK-CRUD/
├── Backend/
│   ├── config/
│   │   └── db.js
│   ├── controller/
│   │   ├── authcontroller.js
│   │   └── taskcontroller.js
│   ├── models/
│   │   ├── usermodel.js
│   │   └── taskmodel.js
│   ├── routes/
│   │   ├── authroute.js
│   │   └── taskroute.js
│   ├── .env
│   └── server.js
└── Frontend/
    ├── js/
    │   ├── login.js
    │   ├── signup.js
    │   ├── dashboard.js
    │   └── index.js
    ├── login.html
    ├── signup.html
    ├── task.html
    └── index.html
Getting Started
Prerequisites
Node.js installed
A MongoDB connection string (local MongoDB or MongoDB Atlas)
Installation
Clone the repository
bash
   git clone https://github.com/Sandeep0945/TaskManager-CRUD.git
   cd TASK-CRUD/Backend
Install dependencies
bash
   npm install
Set up environment variables Create a .env file inside the Backend folder:
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
Start the server
bash
   node server.js

The backend will run at http://localhost:3000

Open the frontend Open Frontend/login.html in your browser (or serve the Frontend folder with a live server extension).
How to Use
Open the app — you'll land on the Sign Up page.
Create an account with your name, email, and password.
Log in with your credentials.
On the dashboard, click Create Task to add a new task.
Each task card shows its title and description, with Update and Delete actions.
Click the profile icon (top-right) to view your name, email, and log out.
API Endpoints
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Log in a user
GET	/api/task/tasks	Get all tasks
POST	/api/task/create	Create a new task
PUT	/api/task/update/:id	Update a task
DELETE	/api/task/delete/:id	Delete a task
Roadmap / Future Improvements
 Scope tasks to the logged-in user (currently all tasks are shared)
 JWT-based authentication for secured API routes
 Single-task fetch endpoint (GET /api/task/:id) for faster edit loading


Built by Sandeep — feel free to fork and improve!
