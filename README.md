# User Authentication and Search API

## Overview
This project is a backend application built with **Express.js** and **MongoDB** that enables user registration, authentication using **JWT**, and user search functionality. The API can be tested using **Postman**.

## Features
- **User Registration:** Users can register with their details, which are stored in MongoDB.
- **User Login:** Authenticated users receive a JWT token for secure access.
- **User Search:** Users can search for other users by `username` or `email`.
- **Authentication:** JWT-based authentication is implemented for security.
- **Input Validation:** All user inputs are validated on the server side.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Validation:** Express Validator

## Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/Vishalverma6/search_user_details.git
cd search_user_details
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Create a `.env` File
Add the following environment variables:
```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the Server
```sh
npm start
```

## API Endpoints
### 1. **User Registration**
**Endpoint:** `POST /api/auth/register`
- **Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "gender": "Male",
  "dateOfBirth": "1995-08-07",
  "country": "USA"
}
```
- **Response:**
```json
{
  "message": "User registered successfully",
  "user": { "id": "12345", "username": "john_doe", "email": "john@example.com" }
}
```

### 2. **User Login**
**Endpoint:** `POST /api/auth/login`
- **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "token": "your_jwt_token",
  "user": { "id": "12345", "username": "john_doe", "email": "john@example.com" }
}
```

### 3. **Search User**
**Endpoint:** `GET /api/user/search?query=john_doe`
- **Headers:**
  - `Authorization: Bearer your_jwt_token`
- **Response:**
```json
{
  "id": "12345",
  "username": "john_doe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "gender": "Male",
  "dateOfBirth": "1995-08-07",
  "country": "USA"
}
```

## How to Use
1. **Register a new user** via `/api/auth/register`
2. **Login** to get a JWT token via `/api/auth/login`
3. Use the token in the `Authorization` header to **search users** via `/api/user/search?query=username`



