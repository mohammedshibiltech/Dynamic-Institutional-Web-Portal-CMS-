# Project Presentation Guide: College Website System

This guide is designed to help you and your team prepare for your project presentation. It summarizes the work completed, the technologies used, and how the system operates.

---

## 1. Project Overview
**Objective**: To build a modern, responsive, and dynamic website for an Engineering College that includes a public-facing homepage and a secure administrative panel for content management.

---

## 2. Tech Stack (What we used)

### Frontend (User Interface)
- **Vite + React**: For building a fast, component-based single-page application (SPA).
- **Tailwind CSS**: For modern, utility-first styling and fully responsive design.
- **Framer Motion**: (If used in components) For smooth animations and transitions.
- **React Router**: For client-side navigation between Home and Admin pages.
- **Axios**: To handle API communication with the backend.

### Backend (Server Logic)
- **Node.js**: The cross-platform JavaScript runtime.
- **Express.js**: A minimal web framework for building RESTful APIs.
- **Multer**: Middleware used for handling multipart/form-data, specifically for **image uploads**.
- **JSON Web Tokens (JWT)**: For secure, stateless administrator authentication.
- **Bcrypt**: For securely hashing and verifying administrator passwords.

### Database (Data Storage)
- **MySQL**: A relational database to store campus data (Announcements, Events, Slides, etc.).
- **Local File System**: The `/uploads` directory on the server stores the physical image files.

---

## 3. Key Features (What is done)

### Public Website
- **Dynamic Hero Slider**: A professional landing carousel showing campus highlights.
- **Announcements Section**: Real-time news and updates fetched from the database.
- **Event Calendar**: A dedicated section to showcase upcoming college events.
- **About Us / Vision / Mission**: Static sections for college identity and goals.
- **Responsive Navbar/Footer**: Fully optimized for mobile, tablet, and desktop views.

### Admin Panel
- **Secure Admin Login**: Protected by JWT and Bcrypt hashing.
- **Central Dashboard**: A hub for administrators to manage site content.
- **Content Managers (CRUD)**:
    - **Slides Manager**: Upload new images and edit titles for the homepage slider.
    - **Announcements Manager**: Create, view, and delete campus updates.
    - **Events Manager**: Add and manage event details including dates and images.

---

## 4. How it Works (System Flow)

1.  **Direct Navigation**: When a user visits the URL, the **React Frontend** loads and immediately sends `GET` requests via **Axios** to the **Express Backend**.
2.  **Data Retrieval**: The Backend queries the **MySQL Database** for the latest slides, events, and announcements.
3.  **Rendering**: The database returns the data, and the Frontend renders it into beautiful, interactive components.
4.  **Admin Security**: When an admin logs in, the server validates credentials and sends back a **JWT**. The Frontend stores this in `localStorage` and attaches it to the "Header" of every management request (`Authorization: Bearer <token>`).
5.  **Image Handling**: When a slide or event is added, **Multer** saves the image to the server's disk, and the server generates a URL that is stored in the database.

---

## 5. Current Project Status
- [x] Backend API Architecture 
- [x] Frontend Responsive Design
- [x] Database Schema and Dummy Data
- [x] Admin Authentication System
- [x] Content Management Logic (Slides, Announcements, Events)
- [x] Technical Documentation (DFDs, ERDs, Flowcharts)

---

## 6. Setup & Run Instructions (For Demo)

### Step 1: Database
- Ensure MySQL is running.
- Import the database from `database/schema.sql`.

### Step 2: Backend
- Go to `server` folder.
- Run `npm install` then `npm start`.
- Ensure `.env` has correct database credentials.

### Step 3: Frontend
- Go to `client` folder.
- Run `npm install` then `npm run dev`.
- Open the provided local URL (usually `http://localhost:5173`).
