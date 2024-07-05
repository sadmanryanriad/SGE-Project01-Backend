# Project-01 API Documentation

## Overview

This project provides the following APIs:
1. Member Registration
2. Student Registration

## Getting Started

### Prerequisites

- Nodemon
- A .env file with the following environment variables:
  ```plaintext
  LP=5000
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

2. Install the required dependencies:
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

### Member Registration

**Endpoint:** `POST /member/registration`

**Description:** Registers a new member.

**Request Body:**
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

**Response:**
- **201 Created**
  ```json
  {
    "message": "Member data registered successfully",
    "_id": "60f8a7e2f44cd455e4e9b5b3",
    "role": "member",
    "email": "john.doe@example.com"
  }
  ```
- **400 Bad Request** (if email already exists)
  ```json
  {
    "message": "Email already exists"
  }
  ```
- **400 Bad Request** (if validation error)
  ```json
  {
    "errors": [
      "First name is required",
      "Last name is required",
      "Email is required",
      "Primary mobile number is required",
      "Please enter a password"
    ]
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "An error occurred"
  }
  ```

### Student Registration

**Endpoint:** `POST /member/student/registration`

**Description:** Registers a new student.

**Request Body:**
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

**Response:**
- **201 Created**
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
- **400 Bad Request** (if email already exists)
  ```json
  {
    "message": "Email already exists"
  }
  ```
- **400 Bad Request** (if validation error)
  ```json
  {
    "errors": [
      "First name is required",
      "Last name is required",
      "Email is required",
      "Primary mobile number is required",
      "Member email is required"
    ]
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "An error occurred"
  }
  ```

## Database Schemas

### Member Schema
```javascript
const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberRegistrationSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [3, "First name must be at least 3 characters long"],
    maxlength: [50, "First name must be at most 50 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [3, "Last name must be at least 3 characters long"],
    maxlength: [50, "Last name must be at most 50 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Email is not valid"],
  },
  primaryMobileNumber: {
    type: Number,
    required: [true, "Please enter primary mobile number"],
    minlength: [10, "Primary mobile number must be at least 10 digits"],
  },
  whatsappNumber: {
    type: Number,
    minlength: [10, "WhatsApp number must be at least 10 digits"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  role: {
    type: String,
    enum: ["admin", "mco", "member"],
    default: "member",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  studentAdded: {
    type: Array,
  },
});

const MemberRegistration = mongoose.model("member", memberRegistrationSchema);

module.exports = MemberRegistration;
```

### Student Schema
```javascript
const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [3, "First name must be at least 3 characters long"],
    maxlength: [50, "First name must be at most 50 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [3, "Last name must be at least 3 characters long"],
    maxlength: [50, "Last name must be at most 50 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Email is not valid"],
  },
  primaryMobileNumber: {
    type: Number,
    required: [true, "Please enter primary mobile number"],
    minlength: [10, "Primary mobile number must be at least 10 digits"],
  },
  whatsappNumber: {
    type: Number,
    minlength: [10, "WhatsApp number must be at least 10 digits"],
  },
  preferredCourse: {
    type: String,
  },
  preferredUniversity: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: [true, "Member email is required"],
    match: [/.+\@.+\..+/, "Member email is not valid"],
  },
  status: {
    type: Array,
  },
  studentId: {
    type: String,
  },
  comments: {
    type: Array,
  },
  universityCommunication: {
    type: Array,
  },
  files: {
    type: Array,
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
```