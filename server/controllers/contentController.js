const db = require('../config/db');

exports.getAbout = (req, res) => {
    const sql = 'SELECT * FROM about LIMIT 1';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0] || {});
    });
};

exports.getMissionVision = (req, res) => {
    const sql = 'SELECT * FROM mission_vision';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Generic update for simplicity in this phase, assuming predefined IDs or types
exports.updateContent = (req, res) => {
    const { type, content } = req.body; // type: 'about', 'mission', 'vision'

    let sql = '';
    let params = [];

    if (type === 'about') {
        sql = 'UPDATE about SET content = ? WHERE id = 1'; // Assuming single row setup
        params = [content];
    } else if (type === 'mission' || type === 'vision') {
        sql = 'UPDATE mission_vision SET content = ? WHERE type = ?';
        params = [content, type];
    } else {
        return res.status(400).json({ message: 'Invalid content type' });
    }

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Content updated successfully' });
    });
};
