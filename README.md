# My Own Shelf 📚

My Own Shelf is a personal book library and notes app for tracking books you want to remember, rate, and revisit. It lets you save books, write notes, and get AI-powered reading recommendations based on your shelf.

## Features

- Secure signup/login with password hashing and session-based authentication
- Add, view, and delete books from your personal library
- Store book details like title, author, ISBN, description, rating, and date added
- Add, edit, and delete notes for each book
- Ask an AI assistant for recommendations based on your current shelf
- Simple EJS-based interface with a clean, responsive layout

## Tech Stack

- Node.js
- Express.js
- EJS templates
- PostgreSQL
- bcrypt
- express-session
- Google Gemini API via `@google/genai`

## Project Structure

```text
MY_OWN_SHELF/
├── index.js              # Express server and app routes
├── package.json          # Dependencies and scripts
├── package-lock.json     # Lock file
├── .gitignore            # Ignored files
├── public/               # Static assets (CSS, JS)
├── views/                # EJS pages and partials
└── .env                  # Local environment configuration
```

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Create the PostgreSQL database

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20),
    description TEXT,
    recommendation INTEGER,
    book_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE note (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES book(id) ON DELETE CASCADE,
    note_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3) Configure environment variables

Create a `.env` file in the project root:

```env
HOST=localhost
DATABASE=your_database_name
PASSWORD=your_database_password
SESSION_SECRET=your_session_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

### 4) Run the app

```bash
node index.js
```

Then open:

```text
http://localhost:3000
```

## Main Routes

- `GET /` - View your library
- `GET /login` - Login page
- `GET /signup` - Sign up page
- `GET /new-book` - Add a new book
- `GET /note/:id` - View book details and notes
- `POST /add-book` - Save a new book
- `POST /add-note/:id` - Add a note
- `POST /recommendations` - Get AI book recommendations based on your shelf
- `POST /logout` - Log out

## Notes

This project is designed as a personal reading tracker rather than a production SaaS app. It focuses on a simple workflow: save books, collect highlights, and use AI to discover more reads that match your taste.

## Author

Shoaib Khan
