# Task Manager Backend

## Overview

This is the backend server for the Task Manager application.
It provides REST API endpoints for user authentication and task management.

---

## Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Create Tasks
- View Tasks
- Complete Tasks
- Delete Tasks
- User-specific Tasks
- Task Filtering Support

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcrypt
- dotenv
- cors

---

## Installation

### 1. Clone Repository

git clone https://github.com/TentoKlein/task-manager

---

### 2. Navigate to Backend Folder

cd Backend

---

### 3. Install Dependencies

npm install

---

### 4. Configure Environment Variables

Create a `.env` file and add:

PORT=3000
DB_NAME=task_manager
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_SECRET=mysecretkey

---

### 5. Run Server

node server.js

---

## API Endpoints

### User Routes

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | /users/register | Register new user |
| POST | /users/login | Login user |
| GET | /users | Get all users |

---

### Task Routes

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /tasks | Get all user tasks |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

---

## Authentication

Protected routes require JWT token inside request headers.

Example:

Authorization: your_token_here

---

## Author

Nurhafiza Narizan
SEC-12 Bootcamp
