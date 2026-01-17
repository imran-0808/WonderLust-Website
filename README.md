# 🌍 Wanderlust – Room & Property Booking Web Application

Wanderlust is a **full-stack room and property booking web application** built using **MERN stack (MongoDB, Express.js, Node.js)** with a **server-rendered frontend using HTML & CSS**.  
The application focuses on **secure authentication, authorization, and clean backend architecture**.

---

## ✨ Features

### 👤 User Features
- User registration and login
- Browse available rooms and properties
- View detailed property information
- Secure session-based authentication

### 🏠 Owner / Host Features
- Create new property listings
- Edit **only their own** listed properties
- Delete **only properties created by them**
- Protected routes using role-based authorization

### 🔐 Security & Authorization
- Role-based authentication system
- Property ownership verification before edit/delete
- Session handling with Passport.js
- Server-side authorization middleware

---

## 🧑‍💻 Tech Stack

### Frontend
- HTML5
- CSS3
- EJS (Server-Side Rendering)
- Bootstrap (if used)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Utilities
- Passport.js
- Express-Session
- bcrypt
- dotenv

---

## 🏗️ Project Structure

Wanderlust/
│
├── init/ # MongoDB connection
├── models/ # MongoDB schemas
├── public/ # CSS & static assets
├── routes/ # Express routes
├── views/ # EJS templates (HTML rendering)
├── app.js
├── ExpressError.js
├── middleware.js # Auth & role-based checks
├── package.json
└── README.md


---

## 🔑 Role-Based Authentication Logic

- Each property is associated with its **creator (owner)**
- Only the **owner of a property** can:
  - Edit the listing
  - Delete the listing
- Other authenticated users **cannot modify** listings they do not own
- Authorization is enforced using **custom middleware**

---

 ## 📸 Screenshots

**All Listings**

[!all_listings](./screenshots/all_listings.png)

**Registration for new user**

[!signup](./screenshots/signup_page.png)
 
**Login**

[!login](./screenshots/login_page.png)

**Listing Details**

[!listing_details](./screenshots/listing_details.png)

**Create new Listing**

[!create_listing](./screenshots/create_new_listing.png)

**Edit listing**

[!edit_listing](./screenshots/edit_listing.png)

**Review**

[!Review](./screenshots/review.png)

---

## 🎯 Project Highlights
- Implemented secure role-based authorization
- Prevented unauthorized property modification
- Clean MVC-based backend structure
- Focused on backend security & data integrity
