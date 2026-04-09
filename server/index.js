const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('College Website API is running...');
});

// Import Routes
const slideRoutes = require('./routes/slideRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const eventRoutes = require('./routes/eventRoutes');
const contentRoutes = require('./routes/contentRoutes');
const authRoutes = require('./routes/authRoutes');
const deptNoticeRoutes = require('./routes/deptNoticeRoutes');
const placementSlideRoutes = require('./routes/placementSlideRoutes');
const queryRoutes = require('./routes/queryRoutes');


app.use('/api/slides', slideRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dept-notices', deptNoticeRoutes);
app.use('/api/placement-slides', placementSlideRoutes);
app.use('/api/queries', queryRoutes);


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Database Connection Status: Checking...');

    db.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection failed:', err.message);
        } else {
            console.log('Connected to MySQL Database');
            connection.release();
        }
    });
});
