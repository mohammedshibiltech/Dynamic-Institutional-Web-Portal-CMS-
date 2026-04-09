const db = require('../config/db');
const emailService = require('../utils/emailService');

// Submit a new query
exports.submitQuery = (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = 'INSERT INTO queries (name, email, subject, message) VALUES (?, ?, ?, ?)';
    console.log('Inserting query:', { name, email, subject });
    db.query(sql, [name, email, subject, message], (err, result) => {
        if (err) {
            console.error('Error saving query:', err);
            return res.status(500).json({ message: 'Failed to submit query' });
        }
        console.log('Query saved successfully, ID:', result.insertId);
        res.status(201).json({ message: 'Query submitted successfully', id: result.insertId });
    });
};


// Get all queries (for Admin)
exports.getQueries = (req, res) => {
    console.log('Fetching all queries for admin...');
    const sql = 'SELECT * FROM queries ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching queries:', err);
            return res.status(500).json({ message: 'Failed to fetch queries' });
        }
        console.log(`Fetched ${results.length} queries.`);
        res.json(results);
    });
};


// Reply to a query
exports.replyQuery = async (req, res) => {
    const { id } = req.params;
    const { replyMessage } = req.body;

    if (!replyMessage) {
        return res.status(400).json({ message: 'Reply message is required' });
    }

    const getQuerySql = 'SELECT * FROM queries WHERE id = ?';
    db.query(getQuerySql, [id], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: 'Query not found' });
        }

        const queryValue = results[0];
        try {
            const subject = `Re: ${queryValue.subject}`;
            const text = `Dear ${queryValue.name},\n\n${replyMessage}\n\nBest regards,\nCollege Administration`;

            await emailService.sendEmail(queryValue.email, subject, text);

            const updateSql = "UPDATE queries SET status = 'replied' WHERE id = ?";
            db.query(updateSql, [id], (updateErr) => {
                if (updateErr) {
                    console.error('Error updating query status:', updateErr);
                }
                res.json({ message: 'Reply sent successfully' });
            });
        } catch (error) {
            console.error('Error sending reply email:', error);
            res.status(500).json({ message: 'Failed to send reply email' });
        }
    });
};

// Delete a query
exports.deleteQuery = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM queries WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Query not found' });
        res.json({ message: 'Query deleted successfully' });
    });
};
