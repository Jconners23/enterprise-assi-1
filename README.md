# My Library Tracker 

The **My Library Tracker** is a web application that enables users to manage library book loans efficiently. It provides an intuitive interface for users to log and manage their borrowed books while maintaining a secure and scalable backend. The application incorporates authentication, real-time data updates, and enterprise-grade security to ensure data integrity and protect user information.  

---

## Table of Contents  

- [Introduction](#introduction)  
- [Solution Overview](#solution-overview)  
- [Project Aim & Objectives](#project-aim--objectives)  
- [Enterprise Considerations](#enterprise-considerations)  
  - [Performance](#performance)  
  - [Scalability](#scalability)  
  - [Robustness](#robustness)  
  - [Security](#security)  
  - [Deployment](#deployment)  
- [Installation & Usage Instructions](#installation--usage-instructions)  
  - [Prerequisites](#prerequisites)  
  - [Setup Steps](#setup-steps)  
  - [Running the Application](#running-the-application)  
- [Feature Overview](#feature-overview)  
- [Known Issues & Future Enhancements](#known-issues--future-enhancements)  
- [References](#references)  

---

## Introduction  

People often face challenges in keeping on top of books they have borrowed from the library, particularly students who borrow large quantities of books to help them with their studies. The **My Library Tracker** applcation solves this issue by providing a web-based solution where users can log when they borrow and return library books, tracking them in real time. The system includes authentication, input validation/sanitisation, and an intuitive UI for streamlined book management.  

---

## Solution Overview  

This application allows users to:  

- Sign up and log in securely.  
- Borrow books and track due dates.  
- Return books and update loan records.  
- View their loan history and overdue books.  
- Authenticate API requests using JWT tokens.  

The backend is built using **Node.js and Express**, with **RestDB** for data storage. The frontend uses **Pug** as the templating engine, ensuring a smooth and interactive experience.  

---

## Project Aim & Objectives  

### Aim  

To develop a secure, scalable, and efficient loan management system that tracks personal book borrowings and returns.  

### Objectives  

- Implement **secure authentication** using JWT.  
- Prevent security threats with **input validation and sanitisation**.  
- Maintain a **well-structured, modular** codebase for scalability.  
- Ensure **fast response times** for API endpoints.  
- Provide a **user-friendly UI** for managing loans.  

---

## Enterprise Considerations  

### Performance  

- Optimised database queries to **reduce response time**.  
- Designed with a **structured codebase** for easy imlplementation of future enhancements

### Scalability  

- Designed a **modular architecture** with separate routes and middleware for authentication, loan management, and user handling.  
- Ensured **API endpoints can handle concurrent users** by using **asynchronous operations** and optimised database interactions.

### Robustness  

- Implemented **try/catch blocks** across the backend to handle errors.  
- Used **logging** to track failed API requests and security breaches. 

### Security  

The system follows best security practices, including:  

- **JWT-based authentication** for secure user sessions.  
- **bcrypt password hashing** to protect user credentials.  
- **Input validation using express-validator** to prevent injection attacks.  
- **Sanitisation with DOMPurify** to mitigate XSS vulnerabilities.   

### Deployment  

The application is deployed on **Render** with continuous integration and deployment (CI/CD) enabled.  

- **Live Demo**: [My Library Tracker](https://enterprise-assi-1.onrender.com)  
- **GitHub Repository**: [enterprise-assi-1](https://github.com/Jconners23/enterprise-assi-1)  

---

## Installation & Usage Instructions  

### Prerequisites  

- **Node.js** (v18+ recommended)  

### Setup Steps  

1. **Clone the Repository**  

   ```bash
   git clone https://github.com/your-username/enterprise-assi-1.git
   cd enterprise-assi-1
   ```

2. **Install Dependencies**  

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  

   Copy `.env.example` to `.env`. This file contains temporary credentials to be used for demo purposes.

   ```bash
   cp .env.example .env
   ```

### Running the Application  

Start the server locally:  

```bash
npm start
```

Navigate to `http://localhost:3000` in your browser.  

---

## Feature Overview  

### Authentication & User Management  

- **User Registration & Login**  
  - JWT-based authentication using access tokens and refresh tokens, storing tokens in Session Storage
  - Input sanitisation and validation using DOMPurify and express-valoidator prevents XSS attacks that could steal tokens
  - Secure password hashing with bcrypt  
  - Securely stores refresh tokens in database
- **Logout**
  - Clears access tokens and refresh tokens from Session Storage as well as deleting the refresh token from database
- **Session Management**  
  - Secure JWT access tokens and refresh tokens  

### Loan Management  

- **Borrow Books**  
  - Users can log their borrowed books and view the due dates
- **Return Books**  
  - Users can return thier books and update loan records  
- **Overdue Books**  
  - System flags overdue books and notifies users with real time data updates
- **Loan History**  
  - Users can view their loan records 

All of these actions are verified with JWT authentication to ensure that the user is authoriwed to view, edit and update their data. 

---

## Known Issues & Future Enhancements  

### Known Issues  

- No major issues have been observed in the existing features through testing, but at the moment functionality is quite limited
- Some UI elements don't load instantaneously because API's sometimes take time to fetch the data

### Future Enhancements  

- **Notifications system**: Email reminders for overdue books.  
- **Book search feature**: Implement search and filtering for books.  
- **User roles**: Different permissions for admin and regular users.  
- **Enhanced logging**: Integrate centralised logging for better monitoring.  

---

## References  

- [JWT Authentication In Node.js](https://www.geeksforgeeks.org/jwt-authentication-with-node-js/)  
- [JWT Authentication Tutorial - Node.js](https://youtu.be/mbsmsi7l3r4)
- [Build Node.js User Authentication - Password Login](https://youtu.be/Ud5xKCYQTjM)
- [How to Handle Form Inputs Efficiently with Express-Validator in ExpressJs](https://www.digitalocean.com/community/tutorials/how-to-handle-form-inputs-efficiently-with-express-validator-in-express-js)
- [Password hashing in Node.js with bcrypt](https://blog.logrocket.com/password-hashing-node-js-bcrypt/)
- [ChatGPT](https://chatgpt.com/) - used for code refactoring and debugging

---