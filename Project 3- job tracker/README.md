# JobTrack Pro

JobTrack Pro is a student-friendly MERN stack job application tracker built for internship preparation and portfolio presentation. It includes JWT authentication, protected CRUD routes, search/filter/sort features, a clean responsive frontend, and deployment-ready backend setup.

## Project Idea Selection

1. Job application tracker
2. Task manager
3. Expense tracker

## Best Choice

**Job application tracker** is the best portfolio project because it feels realistic, demonstrates full-stack CRUD plus auth, and gives you interview-friendly features like protected routes, filtering, pagination, and ownership-based access control.

## Project Overview

This application helps students track job and internship applications in one place. Users can register, log in, create application records, update application status, search by company or role, filter by status or job type, and delete records they no longer need.

## Core Features

- User registration and login with JWT
- Protected routes on backend and frontend
- Job application CRUD
- Search, filter, and sort
- Validation and error handling
- MongoDB Atlas with Mongoose
- Responsive React UI
- Render backend deployment ready
- Vercel frontend deployment ready

## Tech Stack

- Backend: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcryptjs, cors, dotenv, express-validator
- Frontend: React, React Router, Axios, responsive CSS

## Folder Structure

```text
project-root/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── README.md
└── postman_collection.json
```

## Database Schema Design

### User
Stores account data for authentication.

Fields:
- `name`
- `email`
- `password`
- `timestamps`

Why it exists:
- Handles signup/login
- Stores each user's profile
- Supports secure password hashing

### JobApplication
Stores one application record per company role entry.

Fields:
- `user`
- `companyName`
- `roleTitle`
- `location`
- `status`
- `jobType`
- `applicationDate`
- `salaryRange`
- `applicationLink`
- `notes`
- `timestamps`

Why it exists:
- Tracks application progress
- Allows user-specific ownership
- Supports search, filter, and sort

## Backend API Design

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/applications`
- `GET /api/applications`
- `GET /api/applications/:id`
- `PUT /api/applications/:id`
- `DELETE /api/applications/:id`

### Query Params

Use these on `GET /api/applications`:
- `search`
- `status`
- `jobType`
- `sortBy`
- `sortOrder`
- `page`
- `limit`

## Authentication Flow

1. User registers or logs in.
2. Backend verifies input and hashes the password.
3. Backend returns a JWT.
4. Frontend stores the token in `localStorage`.
5. Protected routes attach the token to API requests.
6. Backend verifies the token before serving private routes.

## Frontend Pages and Components

- `Login.jsx`
- `Register.jsx`
- `Dashboard.jsx`
- `CreateItem.jsx`
- `EditItem.jsx`
- `NotFound.jsx`
- `Navbar.jsx`
- `ProtectedRoute.jsx`
- `FormComponent.jsx`
- `AuthContext.jsx`

## Environment Variables

### Backend
Create `backend/.env` from `backend/.env.example`.

- `PORT=5000`
- `MONGODB_URI=...`
- `JWT_SECRET=...`
- `JWT_EXPIRES_IN=7d`
- `CLIENT_URL=http://localhost:5173`

### Frontend
Create `frontend/.env` from `frontend/.env.example`.

- `VITE_API_URL=http://localhost:5000/api`

## Local Setup Steps

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Render Deployment Steps

1. Create a new Render Web Service for the backend.
2. Set the build/start command if needed.
3. Add environment variables from `backend/.env.example`.
4. Use your MongoDB Atlas connection string.
5. Deploy and copy the public Render URL.

## Vercel Deployment Steps

1. Create a new Vercel project for the frontend.
2. Set `VITE_API_URL` to your deployed backend URL.
3. Deploy the app.
4. Add the Vercel URL to the backend `CLIENT_URL` CORS setting.

## Postman Guide

Use `postman_collection.json` to test:
- Register
- Login
- Get current user
- Create application
- List applications with search/filter/sort
- Get application by ID
- Update application
- Delete application

## Local Demo Account

For quick checking in the current local setup, this account is already registered:

- Email: `testuser3@example.com`
- Password: `123456`

Note: this is for local testing only. The backend in this workspace uses an in-memory MongoDB fallback, so the data resets if the server restarts.

## Seeded Test Data

The current local session also includes these extra test users:

- `testuser4@example.com` / `123456`
- `testuser5@example.com` / `123456`
- `testuser6@example.com` / `123456`
- `testuser7@example.com` / `123456`
- `testuser8@example.com` / `123456`
- `testuser9@example.com` / `123456`
- `testuser10@example.com` / `123456`
- `testuser11@example.com` / `123456`
- `testuser12@example.com` / `123456`
- `testuser13@example.com` / `123456`

Sample applications were added in the current local session. There are exactly 6 application records total:

- Google - Frontend Intern
- Microsoft - Software Engineer Intern
- Amazon - Backend Intern
- TCS - Junior Developer Intern
- Oracle - Backend Engineering Intern
- IBM - Full Stack Intern

Like the demo account above, this data is local-session only and will reset if the backend restarts.

## Screenshots

Add screenshots here after running the app:

- Dashboard screenshot
- Login screenshot
- Register screenshot
- Create form screenshot
- Edit form screenshot

## Deployment Links

- Backend: `https://your-render-app.onrender.com`
- Frontend: `https://your-vercel-app.vercel.app`

## Resume-Ready Description

A full-stack MERN job application tracker with JWT authentication, protected CRUD operations, search/filter/sort, MongoDB Atlas integration, and responsive React UI, deployed-ready for Render and Vercel.

## Resume Bullet Points

- Built a MERN job application tracker with JWT authentication and protected CRUD workflows.
- Implemented search, filter, sort, and pagination for application management.
- Designed a modular MVC backend using Express, Mongoose, and MongoDB Atlas.
- Created a responsive React frontend with reusable components and API integration.
- Prepared the app for deployment on Render and Vercel with environment-based configuration.

## Interview Explanation

This project demonstrates how a user can securely manage personal job application data. The backend handles authentication, authorization, validation, and MongoDB data storage. The frontend stores the JWT, protects private routes, and provides a clean user experience for creating and managing applications.

## Common Viva Questions

1. Why use JWT?
2. Why use MongoDB for this project?
3. Why is route protection important?
4. How did you implement search and filter?
5. Why is MVC useful here?
6. How is password security handled?
7. How would you improve this project next?
