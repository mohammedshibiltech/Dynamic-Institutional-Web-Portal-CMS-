const db = require('../config/db');
const emailService = require('../utils/emailService');

exports.getAnnouncements = (req, res) => {
    const sql = 'SELECT * FROM announcements ORDER BY is_important DESC, created_at DESC LIMIT 5';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addAnnouncement = (req, res) => {
    const { title, description, is_important, send_email } = req.body;
    const sql = 'INSERT INTO announcements (title, description, is_important) VALUES (?, ?, ?)';
    db.query(sql, [title, description, is_important || false], async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (send_email) {
            try {
                await emailService.sendGroupEmail(
                    `New Announcement: ${title}`,
                    description
                );
            } catch (emailErr) {
                console.error('Failed to send group email:', emailErr);
                // We still return 201 because the database record was created
            }
        }

        res.status(201).json({ id: result.insertId, title, description, is_important });
    });
};

exports.updateAnnouncement = (req, res) => {
    const { id } = req.params;
    const { title, description, is_important } = req.body;
    const sql = 'UPDATE announcements SET title = ?, description = ?, is_important = ? WHERE id = ?';
    db.query(sql, [title, description, is_important, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Announcement not found' });
        res.json({ message: 'Announcement updated successfully' });
    });
};

exports.deleteAnnouncement = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM announcements WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Announcement not found' });
        res.json({ message: 'Announcement deleted successfully' });
    });
};
