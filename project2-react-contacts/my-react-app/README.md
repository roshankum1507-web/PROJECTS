# React Contact Cards Manager

A beginner-friendly React single-page application for adding, viewing, and searching digital contact cards in real time.

## Features

- Add contact cards with a form
- Instant rendering without page refresh
- Real-time search and filtering by name or company
- Responsive card grid layout
- Friendly empty and no-results states
- Clean, polished UI using CSS only

## Setup

```bash
npm install
npm start
```

## Build for production

```bash
npm run build
```

## How it works

- `App` stores the main contact list and search term with `useState`.
- `ContactForm` uses controlled inputs for the form fields and sends a new contact up to `App` on submit.
- `App` filters contacts with `Array.filter()` using a case-insensitive match against full name and company.
- `ContactList` renders cards with `Array.map()` and `ContactCard` displays each contact cleanly.

## Project Structure

```text
my-react-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ContactForm.js
│   │   ├── ContactList.js
│   │   └── ContactCard.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```
