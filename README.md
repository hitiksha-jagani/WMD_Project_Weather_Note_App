# **Weather & Notes App (MERN Full Stack Project)**

A full-stack MERN application combining real-time weather search with a secure notes management system.
Built using React, TailwindCSS, Node.js, Express, MongoDB, and JWT authentication.

---

# **Project Structure**

<img width="252" height="365" alt="Screenshot from 2025-12-01 12-06-47" src="https://github.com/user-attachments/assets/4530a04b-a9ff-403c-95a7-87e7de286bb3" />
<img width="252" height="573" alt="Screenshot from 2025-12-01 12-07-02" src="https://github.com/user-attachments/assets/e1a7958a-1a77-433c-a94b-2a276ef768c0" />

---

#  **Technologies Used**

### Frontend

* React 
* Tailwind CSS
  
### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcryptjs
* dotenv
* nodemon
* morgan
* cors
* EJS templating

### Third-Party API

* OpenWeatherMap API (for weather data)

---

# **Setup Instructions**

## 1. Clone the repository

* git clone https://github.com/hitiksha-jagani/WMD_Project_Weather_Note_App.git
* cd weather-notes-app

## 2. Backend Setup

* cd backend
* npm install

### Copy `.env-example` file to `.env` file

* cp .env-example .env
* Set all environment variables

### Run backend

* Development mode:
* npm run dev

* Backend runs on:
* http://localhost:5000

## 3. Frontend Setup

* cd frontend
* npm install

### Copy `.env-example` file to `.env` file

* cp .env-example .env
* Set all environment variables

### Run frontend

* npm run dev

* Frontend runs on:
  http://localhost:5173

---

# **Testing API Using POSTMAN**

A Postman collection includes:

* Register user
* Login user
* Notes CRUD

Test procedures:

1. Register → Login
2. Copy JWT token
3. Add token to `Authorization: Bearer <token>`
4. Access protected routes

---

# **API Endpoint Documentation**

## **AUTH ROUTES**

### Register

* POST /api/auth/register
* Body: `{ name, email, password }`

### Login

* POST /api/auth/login
* Body: `{ email, password }`
* Returns: JWT token

---

## **NOTES ROUTES (Protected)**

### Get All Notes

* GET /api/notes

### Create Note

* POST /api/notes
* Body:
  {
    "title": "Some title",
    "content": "Some content"
  }

### Update Full Note

* PUT /api/notes/:id

### Patch Note

* PATCH /api/notes/:id

### Delete Note

* DELETE /api/notes/:id

---

# **Authentication**

* Protected routes use:
  Authorization: Bearer <JWT_TOKEN>
* JWT is generated at login and verified through custom middleware.

---

# **Folder Structure Explanation**

### Backend

* `models/` → Mongoose schemas
* `routes/` → Auth, Notes
* `controllers/` → Business logic
* `middleware/` → JWT validator + custom middleware
* `views/` → EJS templates
* `config/db.js` → MongoDB connection

### Frontend

* `pages/` → Login, Register, Weather, Notes
* `context/` → AuthContext for global state
* `components/` → Reusable UI elements
* `utils/` → Api functioning
* `App.jsx` → Router setup

---

# **Screenshots**

### Login Page

<img width="1854" height="1009" alt="Screenshot from 2025-12-01 10-45-17" src="https://github.com/user-attachments/assets/bd94c835-f018-4843-81e7-98317ee0837c" />

### Register Page

<img width="1854" height="1009" alt="Screenshot from 2025-12-01 10-45-30" src="https://github.com/user-attachments/assets/14d9a012-d214-4d91-9acd-8369e65c578f" />  

### Dashboard

<img width="1854" height="1009" alt="Screenshot from 2025-12-01 10-44-54" src="https://github.com/user-attachments/assets/6b390e67-d1a4-47a1-80d4-6726c45c3af2" />


---

# **Third-Party Libraries Used**

* TailwindCSS
* OpenWeatherMap API
* morgan
* cors
* bcryptjs
* jsonwebtoken
* React Router DOM

---

# **Key Features**

* Real-time weather fetch
* Secure login system
* Notes CRUD
* JWT authentication
* Semantic HTML
* Custom Express middleware
* MongoDB persistence
* EJS server-side rendering

