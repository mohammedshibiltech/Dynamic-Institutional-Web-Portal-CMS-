# Presentation Q&A: Defense Guide

Be prepared for these common technical and conceptual questions from your judges.

---

## 1. Security & Authentication

**Q: Why did you use JWT (JSON Web Tokens) instead of traditional Session Cookies?**
*   **Draft Answer**: JWT is stateless, meaning the server doesn't need to store session data in memory. This makes the system more scalable and fits perfectly with our decoupled React + Express architecture. It also allows us to easily handle authentication across different domains or mobile apps in the future.

**Q: How are you ensuring sensitive data like passwords are secure?**
*   **Draft Answer**: We never store plain-text passwords. We use **Bcrypt** to hash passwords with a "salt" before saving them to the MySQL database. Even if the database were compromised, the actual passwords remain protected.

---

## 2. Architecture & Tech Stack

**Q: Why choose MySQL over a NoSQL database like MongoDB?**
*   **Draft Answer**: Our data (Events, Announcements, Admin accounts) is highly structured and relational. MySQL provides strong data integrity and is ideal for projects where the relationships between entities are well-defined.

**Q: What is the benefit of using Vite over Create React App (CRA)?**
*   **Draft Answer**: Vite provides a significantly faster development experience through Hot Module Replacement (HMR) and uses ES modules for instant starts. For the final build, it uses Rollup, which is highly efficient.

---

## 3. Data Handling & Logic

**Q: How do you handle large image uploads to prevent the server from crashing?**
*   **Draft Answer**: We implemented **Multer** as middleware with a strict `fileSize` limit (currently 5MB). We also use `checkFileType` logic to ensure only valid image formats (JPEG, PNG, GIF) are processed, preventing malicious file injections.

**Q: If an administrator deletes a slide, how does the frontend update?**
*   **Draft Answer**: After the API confirms a successful deletion, the React frontend triggers a state update (re-fetching the list or filtering the local state) to ensure the UI reflects the change immediately without a full page reload.

---

## 4. Scalability & Future Work

**Q: How would you scale this application to handle thousands of simultaneous users?**
*   **Draft Answer**: We would implement a caching layer (like **Redis**) for frequent database queries (like active announcements), move the `/uploads` folder to a dedicated **Cloud Object Storage** (like AWS S3), and potentially deploy the backend as a load-balanced cluster.

**Q: What features would you add in "Phase 2"?**
*   **Draft Answer**: Phase 2 would include:
    - User/Student portals for personalized dashboards.
    - An online fee payment integration.
    - A digital library and resource sharing system.
    - Automated email notifications for new announcements.

---

## 5. Challenges Faced

**Q: What was the biggest technical challenge during development?**
*   **Draft Answer**: (Example) Handling synchronization between binary file uploads and database metadata. We solved this by ensuring the file is successfully written to the disk first, and only then is the relative URL committed to the MySQL table, maintaining data consistency.
