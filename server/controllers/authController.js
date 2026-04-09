const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { email, password } = req.body;

    // For first time setup, if table is empty, create an admin (Not production safe, but good for project setup)
    // Or check if user exists.

    // Check if admin exists
    const sql = 'SELECT * FROM admins WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            // OPTIONAL: Auto-create admin strictly for this dev phase if none exists?
            // Better to return 401.
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const admin = results[0];

        // In real app, password should be hashed.
        // For project dummy data compatibility, we might need to handle plain text if inserted via SQL script without hash.
        // Let's assume we want to support hashed.

        // If the stored password matches plain text (from dummy data init), we can allow it OR strictly expect hash.
        // User asked for "Password must be hashed using bcrypt".
        // I will assume the admin inserted manually via SQL might have a hash. 
        // If not, I'll check plain text first (SECURITY RISK, but for debugging) or just stick to bcrypt.

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token, admin: { id: admin.id, email: admin.email } });
    });
};

// Middleware to verify token
exports.protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = decoded;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
