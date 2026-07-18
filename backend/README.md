# Backend - Job Application Tracker API

This backend provides authentication, protected CRUD routes, and filtering/searching for a job application tracker built with Node.js, Express, MongoDB, Mongoose, and JWT.

## Features
- JWT authentication
- Register and login
- Protected user profile route
- Create, read, update, and delete job applications
- Search, filter, sort, and pagination
- Validation with `express-validator`
- MongoDB Atlas ready
- Clean MVC structure

## Folder Structure
```text
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── app.js
└── server.js
```

## Environment Variables
Create a `.env` file in the `backend/` folder using `.env.example`.

- `PORT=5000`
- `MONGODB_URI=...`
- `JWT_SECRET=...`
- `JWT_EXPIRES_IN=7d`
- `CLIENT_URL=http://localhost:5173`

## Run Locally
```bash
npm install
npm run dev
```

## API Routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/applications`
- `GET /api/applications`
- `GET /api/applications/:id`
- `PUT /api/applications/:id`
- `DELETE /api/applications/:id`

## Query Parameters
Use these on `GET /api/applications`:
- `search`
- `status`
- `jobType`
- `sortBy`
- `sortOrder`
- `page`
- `limit`

## Example
```http
GET /api/applications?search=google&status=applied&sortBy=applicationDate&sortOrder=desc
```

## Deployment Notes
- Set environment variables in Render
- Use MongoDB Atlas as the database
- Add your frontend URL in `CLIENT_URL`

## Local Demo Account

The following account is already registered in the current local in-memory database session:

- Email: `testuser3@example.com`
- Password: `123456`

This account is only for local testing. If the backend restarts, the in-memory database resets.

## Seeded Test Data

Additional local test users in the current session:

- `testuser4@example.com` / `123456`
- `testuser5@example.com` / `123456`
- `testuser6@example.com` / `123456`
- `testuser7@example.com` / `123456`
- `testuser8@example.com` / `123456`

There are exactly 3 application records seeded in the current local session:

- Google - Frontend Intern
- Microsoft - Software Engineer Intern
- Amazon - Backend Intern

This data is also session-only and will disappear when the backend restarts.
```
