-- Create Database
CREATE DATABASE IF NOT EXISTS college_db;
USE college_db;

-- Table: Admin Users
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Home Slides
CREATE TABLE IF NOT EXISTS home_slides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    subtitle TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Announcements
CREATE TABLE IF NOT EXISTS announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Events
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: About Us
CREATE TABLE IF NOT EXISTS about (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL
);

-- Table: Mission & Vision
CREATE TABLE IF NOT EXISTS mission_vision (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('mission', 'vision') NOT NULL UNIQUE,
    content TEXT NOT NULL
);

-- Dummy Data: Admins (Password: admin123 -> hashed manually or via app logic, for now use a placeholder hash)
-- Ideally, generate a hash for 'admin123' using bcrypt and insert it.
-- $2b$10$X7... is just a placeholder example. You should register via API or use a known hash.
-- For this setup, we'll insert a known hash for 'admin123' if possible, or just leave it empty and let the user register/seed.
-- Let's assume we'll use a seed script or the user will create the first admin.

-- Dummy Data: Slides
INSERT INTO home_slides (image_url, title, subtitle) VALUES 
('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', 'Welcome to Excellence', 'Empowering the next generation of engineers'),
('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', 'State of the Art Facilities', 'Innovate and Create with modern labs'),
('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80', 'Vibrant Campus Life', 'Join a community of diverse learners');

-- Dummy Data: Announcements
INSERT INTO announcements (title, description) VALUES 
('Semester Exams 2026', 'The semester exams will commence from April 15th. Check the portal for the schedule.'),
('Tech Fest "Innovate" Registration', 'Registration for the annual tech fest is now open. Visit the student council office.'),
('Guest Lecture on AI', 'Dr. Smith from MIT will be delivering a lecture on AI trends this Friday at the Auditorium.'),
('Library Renovation', ' The main library will be closed for renovation this weekend.'),
('Sports Day Selection', 'Selections for the inter-college sports meet will be held on Monday.');

-- Dummy Data: Events
INSERT INTO events (title, event_date, description, image_url) VALUES 
('Annual Convocation', '2026-05-20', 'Celebrating the graduation of the batch of 2026.', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'),
('Alumni Meet 2026', '2026-06-10', 'Welcoming back our distinguished alumni.', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'),
('Hackathon v5.0', '2026-03-15', '24-hour coding marathon open to all departments.', 'https://images.unsplash.com/photo-1504384308090-c54be3852f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');

-- Dummy Data: About
INSERT INTO about (content) VALUES 
('Founded in 1990, our Engineering College has been a beacon of technical education excellence. We are committed to fostering innovation, critical thinking, and ethical values in our students.');

-- Dummy Data: Mission & Vision
INSERT INTO mission_vision (type, content) VALUES 
('mission', 'To provide high-quality engineering education that prepares students for global challenges and lifelong learning.'),
('vision', 'To be a globally recognized institution for engineering education and research.');

-- Table: Queries
CREATE TABLE IF NOT EXISTS queries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('pending', 'replied') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

