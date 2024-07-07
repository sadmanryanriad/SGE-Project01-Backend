# Shabuj Global Education Backend API Documentation

## Overview

This project provides a RESTful API for managing members and students in the Shabuj Global Education system. It includes authentication and authorization mechanisms to control access based on user roles (`admin`, `mco`, `member`).

## Features

1. **Member Registration**

   - **Endpoint:** `POST /member/registration`
   - **Description:** Registers a new member with basic information.
   - **Request Body:**
     ```json
     {
       "firstName": "John",
       "lastName": "Doe",
       "email": "john.doe@example.com",
       "primaryMobileNumber": 1234567890,
       "whatsappNumber": 1234567890,
       "password": "yourpassword",
       "role": "member"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Member registered successfully",
       "user": {
         "name": "John Doe",
         "email": "john.doe@example.com",
         "role": "member"
       }
     }
     ```

2. **Student Registration**

   - **Endpoint:** `POST /member/student/registration`
   - **Description:** Registers a new student with detailed information.
   - **Request Body:**
     ```json
     {
       "firstName": "Jane",
       "lastName": "Doe",
       "email": "jane.doe@example.com",
       "primaryMobileNumber": 1234567890,
       "whatsappNumber": 1234567890,
       "preferredCourse": "Computer Science",
       "preferredUniversity": "MIT",
       "createdBy": "john.doe@example.com"
     }
     ```
   - **Response:**
     ```json
     {
       "_id": "60f8a7e2f44cd455e4e9b5b3",
       "firstName": "Jane",
       "lastName": "Doe",
       "email": "jane.doe@example.com",
       "primaryMobileNumber": 1234567890,
       "whatsappNumber": 1234567890,
       "preferredCourse": "Computer Science",
       "preferredUniversity": "MIT",
       "createdAt": "2021-07-21T12:34:56.789Z",
       "createdBy": "john.doe@example.com",
       "status": [],
       "studentId": "",
       "comments": [],
       "universityCommunication": [],
       "files": []
     }
     ```

3. **Authentication**

   - Use the `authUser` middleware with a valid token in the request headers to access protected routes.

4. **Authorization**

   - Routes are protected based on user roles (`admin`, `mco`, `member`). Use the `authorizeRole` middleware to restrict access accordingly.

5. **Data Validation Errors**
   - Mongoose handles data validation errors. If the request body does not conform to the schema defined, a validation error will be returned with details on which fields failed validation.

## Getting Started

### Prerequisites

- Node.js
- NPM (Node Package Manager)
- MongoDB Atlas account (or local MongoDB installation)
- `.env` file with the following environment variables:
  ```plaintext
  PORT=5000
  USER=your_mongodb_username
  PASS=your_mongodb_password
  DB=your_database_name
  ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sadmanryanriad/SGE-Project01-Backend.git
   cd SGE-Project01-Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the environment variables mentioned above.

### Running the Server

Start the server:

```bash
npm start
```

The server will be running on `http://localhost:5000`.

## API Endpoints

### Member Accessible APIs

1. **Member Registration API**

   - **Endpoint:** `POST /member/registration`
   - **Description:** Registers a new member with details like first name, last name, email, mobile number, WhatsApp number, and password.

2. **Student Registration API**

   - **Endpoint:** `POST /member/student/registration`
   - **Description:** Registers a new student with details including first name, last name, email, primary mobile number, WhatsApp number, preferred course, preferred university, and createdBy (member email).

3. **Get All Students API**

   - **Endpoint:** `GET /member/students`
   - **Description:** Retrieves a list of all registered students.

4. **Get Student by ID API**
   - **Endpoint:** `GET /member/student/:id`
   - **Description:** Retrieves details of a student by their ID.

### MCO Accessible APIs

1. **MCO Home API**

   - **Endpoint:** `GET /mco`
   - **Description:** Home route for MCO (Member Care Officer) role.

2. **Change Student Status API**

   - **Endpoint:** `POST /mco/update-status/:id`
   - **Description:** Allows MCO to update the status of a student identified by `:id`. Valid status options are "pending", "status-1", "status-2", and "status-3".

3. **Comment on Student API**

   - **Endpoint:** `POST /mco/comments/:id`
   - **Description:** Allows MCO and members to add comments on a student identified by `:id`. Requires fields like comment, subject, and commentedByEmail.

4. **Get All Comments of a Student API**
   - **Endpoint:** `GET /mco/comments/:id`
   - **Description:** Retrieves all comments made on a student identified by `:id`.

### APIs Accessible by Both MCO and Members

1. **Home Page API**

   - **Endpoint:** `GET /`
   - **Description:** Provides a simple "HOME PAGE" message as a placeholder.

2. **Get All Students API**

   - **Endpoint:** `GET /member/students`
   - **Description:** Retrieves a list of all registered students.

3. **Get Student by ID API**

   - **Endpoint:** `GET /member/student/:id`
   - **Description:** Retrieves details of a student by their ID.

4. **Change Student Status API**

   - **Endpoint:** `POST /mco/update-status/:id`
   - **Description:** Allows MCO to update the status of a student identified by `:id`.

5. **Comment on Student API**

   - **Endpoint:** `POST /mco/comments/:id`
   - **Description:** Allows MCO and members to add comments on a student identified by `:id`.

6. **Get All Comments of a Student API**
   - **Endpoint:** `GET /mco/comments/:id`
   - **Description:** Retrieves all comments made on a student identified by `:id`.

These routes provide functionalities accessible to both MCOs and members, facilitating interaction with student data and status updates.

### Note:

- **Admin Access:** Users with the `admin` role have access to all API routes.
