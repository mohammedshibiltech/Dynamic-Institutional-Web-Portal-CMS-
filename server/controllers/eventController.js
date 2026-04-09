const db = require('../config/db');
const emailService = require('../utils/emailService');

exports.getEvents = (req, res) => {
    const sql = 'SELECT * FROM events ORDER BY event_date ASC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addEvent = (req, res) => {
    console.log('Add Event Request Body:', req.body);
    console.log('Add Event Uploaded File:', req.file);
    const { title, event_date, description, send_email } = req.body;
    let image_url = req.body.image_url;
    if (req.file) {
        image_url = `${req.protocol}://${req.get('host')}/uploads/events/${req.file.filename}`;
    }
    const sql = 'INSERT INTO events (image_url, title, event_date, description) VALUES (?, ?, ?, ?)';
    db.query(sql, [image_url, title, event_date, description], async (err, result) => {
        if (err) {
            console.error('Database error in addEvent:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Event added successfully, ID:', result.insertId);

        const shouldSendEmail = send_email === 'true' || send_email === true;
        if (shouldSendEmail) {
            try {
                await emailService.sendGroupEmail(
                    `Upcoming Event: ${title}`,
                    `Date: ${new Date(event_date).toLocaleDateString()}\n\n${description}`
                );
            } catch (emailErr) {
                console.error('Failed to send group email:', emailErr);
            }
        }

        res.status(201).json({ id: result.insertId, image_url, title, event_date, description });
    });
};

exports.updateEvent = (req, res) => {
    const { id } = req.params;
    const { title, event_date, description } = req.body;
    let image_url = req.body.image_url;
    if (req.file) {
        image_url = `${req.protocol}://${req.get('host')}/uploads/events/${req.file.filename}`;
    }
    const sql = 'UPDATE events SET image_url = ?, title = ?, event_date = ?, description = ? WHERE id = ?';
    db.query(sql, [image_url, title, event_date, description, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event updated successfully' });
    });
};

exports.deleteEvent = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM events WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted successfully' });
    });
};
