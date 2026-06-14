# Library Management System

A full-stack Library Management System built using **Django REST Framework** and **React.js**. The application provides role-based access for Admins, Authors, and Readers, enabling efficient management of books and borrowing operations.

## Features

### Authentication & Authorization

* User Registration
* JWT Authentication
* Secure Login System
* Role-Based Access Control

### Admin Features

* View Dashboard Statistics
* Manage All Books
* View Total Users
* Monitor Borrowed Books
* Create, Update, and Delete Books

### Author Features

* Add New Books
* View Own Books
* Update Own Books
* Delete Own Books

### Reader Features

* Browse Available Books
* Borrow Books
* View Borrowed Books
* Search Books

## Technology Stack

### Backend

* Python
* Django
* Django REST Framework (DRF)
* Simple JWT Authentication
* SQLite Database

### Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap 5

## Database Models

### User

* Username
* Email
* Password
* Role (Admin / Author / Reader)

### Book

* Book Name
* Author
* Published Date
* Price
* Availability Status

### Borrow

* User
* Book
* Borrow Date
* Return Status

## API Endpoints

### Authentication

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /api/register/ | Register User |
| POST   | /login/        | User Login    |

### Books

| Method | Endpoint        | Description |
| ------ | --------------- | ----------- |
| GET    | /api/book/      | List Books  |
| POST   | /api/book/      | Create Book |
| PUT    | /api/book/<id>/ | Update Book |
| DELETE | /api/book/<id>/ | Delete Book |

### Borrow

| Method | Endpoint               | Description    |
| ------ | ---------------------- | -------------- |
| POST   | /api/borrow/<book_id>/ | Borrow Book    |
| GET    | /api/borrow/           | Borrow History |

### Dashboard

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| GET    | /api/dashboard/ | Dashboard Statistics |

## Installation

### Backend Setup

```bash
git clone <repository-url>
cd backend

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

## Project Structure

```text
Library-Management-System/
│
├── backend/
│   ├── users/
│   ├── library/
│   ├── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│
└── README.md
```

## Key Functionalities Implemented

* JWT Authentication
* Role-Based Authorization
* Book CRUD Operations
* Borrow Management
* Dashboard Analytics
* REST API Integration
* Responsive User Interface

## Future Improvements

* Book Return System
* Search & Filter API
* Pagination
* Email Notifications
* User Profile Management
* Fine Calculation for Late Returns

## Author

Abhijith T M

This project was developed as a learning project to demonstrate Django REST Framework, React.js, JWT Authentication, REST APIs, and Role-Based Access Control.
