# Members Only

A membership-based message board built as part of [The Odin Project Node.js](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs) course. It focuses on authentication, sessions, and role-based access control.

## Objective

The goal of this project was to practice:
- Building user authentication flows
- Managing sessions with PostgreSQL-backed storage
- Protecting routes and actions based on user roles
- Hashing passwords securely with bcrypt
- Using Passport with a local strategy

## What is it?

A message board where:
- Visitors can sign up and log in
- Members can post messages
- Users can upgrade to member or admin status
- Authenticated users stay logged in through sessions
- The app shows user-related state in the UI

## How to Use

1. Open the project folder.
2. Install dependencies:

```bash
npm install
```

3. Configure your environment variables using `.env.example` as a reference.
4. Build the database schema if needed:

```bash
npm run seed
```

5. Start the development server:

```bash
npm run dev
```

6. Open the browser at `http://localhost:3000`.

## Features

- **Sign up and login**: users can create an account and authenticate
- **Session management**: login state persists with server-side sessions
- **Role upgrades**: users can become members or admins
- **Message posting**: members can create new messages
- **Protected actions**: access is controlled through authentication and roles
- **PostgreSQL storage**: users, sessions, and messages are persisted in the database

## Project Structure

- `index.js`: Express app bootstrap and session setup
- `authUtils.js`: Passport configuration and auth helpers
- `routes/`: authentication, user, and message routes
- `controllers/`: request handlers for auth, users, and messages
- `db/`: database queries and helpers
- `views/`: EJS templates
- `public/`: static assets

## Technologies Used

- Node.js
- Express
- EJS
- PostgreSQL
- Passport
- Passport Local
- express-validator
- express-session
- connect-pg-simple
- bcryptjs

---

Project developed following: [The Odin Project - Members Only](https://www.theodinproject.com/lessons/node-path-nodejs-members-only)

📍 **Main repository with all projects**: [ChristoferLv/TheOdinProject](https://github.com/ChristoferLv/TheOdinProject)
