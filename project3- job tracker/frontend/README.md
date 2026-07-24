# Frontend - Job Application Tracker

This React app provides authentication, protected routes, and CRUD screens for managing job applications.

## Features
- Login and register pages
- Protected dashboard
- Create and edit application forms
- Search, filter, and sort controls
- Responsive layout
- Token-based API integration

## Folder Structure
```text
src/
├── api/
├── assets/
├── components/
├── context/
├── pages/
├── App.jsx
├── main.jsx
└── index.css
```

## Environment Variables
Create a `.env` file in the `frontend/` folder using `.env.example`.

- `VITE_API_URL=http://localhost:5000/api`

## Run Locally
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
npm run preview
```

## Deployment Notes
- Use the deployed Render backend URL in `VITE_API_URL`
- Add the Vercel frontend URL to backend CORS settings
