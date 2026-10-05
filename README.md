# My Own Shelf 📚

A personal book library and notes management application built with Node.js, Express, and PostgreSQL. Keep track of the books you've read, rate them, and store your thoughts and notes about each book in one place.

## Features

- User Authentication: Secure sign-up and login with bcrypt password hashing
- Book Management: Add, view, and delete books from your personal library
- Book Details: Store book title, author, ISBN, description, recommendation rating, and date added
- Notes System: Create, edit, and delete notes for each book you read
- User Sessions: Persistent user sessions with secure cookie handling
- Responsive UI: Clean EJS-templated frontend for easy navigation

## Tech Stack

- Backend: Node.js + Express.js (v5.2.1)
- Frontend: EJS (v6.0.1) templating engine
- Database: PostgreSQL (via pg driver v8.22.0)
- Authentication: bcrypt (v6.0.0) for password hashing
- Session Management: express-session (v1.19.0)
- HTTP Client: axios (v1.19.0)
- Middleware: body-parser for form data handling

## Project Structure

```text
9_MY_OWN_SHELF/
├── index.js              # Main Express server & routes
├── package.json          # Project dependencies
├── package-lock.json     # Locked dependency tree
├── .gitignore            # Ignore local environment files
│
├── views/                # EJS templates
│   ├── index.ejs         # Home page - list all books
│   ├── login.ejs         # Login page
│   ├── signup.ejs        # Sign-up page
│   ├── new_book.ejs      # Add new book form
│   ├── book_note.ejs     # View book details & notes
│   └── partials/         # Reusable template components
│
└── public/               # Static assets
    ├── css/              # Stylesheets
    └── js/               # Client-side JavaScript
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL (v12+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shoaib-khan-24/9_MY_OWN_SHELF.git
   cd 9_MY_OWN_SHELF
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL database:

   Create a PostgreSQL database and run these SQL commands:
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

4. Create a `.env` file in the root directory:
   ```env
   HOST=localhost
   DATABASE=your_database_name
   PASSWORD=your_database_password
   SESSION_SECRET=your_random_session_secret
   PORT=3000
   ```

5. Start the server:
   ```bash
   node index.js
   ```

   The application will be available at `http://localhost:3000/`.

## Usage

### Authentication
- Visit `/signup` to create a new account
- Use `/login` to access your account
- Submit the logout form to end your session

### Managing Books
- View all books on the home page (`/`)
- Add a new book using the form at `/new-book`
- Open a book to view its details and attached notes
- Delete books when they are no longer needed

### Managing Notes
- Add notes to a book from its detail page
- Edit notes when you gain new insights
- Delete notes you no longer want

## API Routes

### Authentication
- `GET /login` - Login page
- `POST /login` - Submit login credentials
- `GET /signup` - Sign-up page
- `POST /signup` - Create a new account
- `POST /logout` - End session

### Books
- `GET /` - View all books (requires login)
- `GET /new-book` - Add book form (requires login)
- `POST /add-book` - Submit new book (requires login)
- `GET /note/:id` - View book details and notes (requires login)
- `GET /delete-book/:id` - Delete a book (requires login)

### Notes
- `POST /add-note/:id` - Add note to a book (requires login)
- `PATCH /edit-note/:id` - Update a note (requires login)
- `GET /delete-note/:id` - Delete a note (requires login)

## Security Features

- Password hashing with bcrypt
- Parameterized SQL queries to reduce injection risk
- Session-based authentication
- HTTP-only cookies
- User data isolation so each user sees their own books

## Development

### Run the server
```bash
node index.js
```

### Add new features
- Update routes in `index.js`
- Create new EJS templates in `views/`
- Add CSS or JavaScript in `public/`

## Future Enhancements

- Book ratings and reviews
- Search and filter books
- Export notes as PDF
- Reading progress tracking
- Book cover images

## License

ISC License

## Author

Shoaib Khan

---

Happy Reading! 📖
