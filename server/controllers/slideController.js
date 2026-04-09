const db = require('../config/db');

// Get all slides
exports.getSlides = (req, res) => {
    const sql = 'SELECT * FROM home_slides ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Add a slide
exports.addSlide = (req, res) => {
    let { title, subtitle, image_url } = req.body;

    if (req.file) {
        image_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    if (!image_url) {
        return res.status(400).json({ error: 'Image is required' });
    }

    const sql = 'INSERT INTO home_slides (image_url, title, subtitle) VALUES (?, ?, ?)';
    db.query(sql, [image_url, title, subtitle], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, image_url, title, subtitle });
    });
};

// Update a slide
exports.updateSlide = (req, res) => {
    const { id } = req.params;
    let { title, subtitle, image_url } = req.body;

    if (req.file) {
        image_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const sql = 'UPDATE home_slides SET image_url = ?, title = ?, subtitle = ? WHERE id = ?';
    db.query(sql, [image_url, title, subtitle, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Slide not found' });
        res.json({ message: 'Slide updated successfully', image_url });
    });
};

// Delete a slide
exports.deleteSlide = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM home_slides WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Slide not found' });
        res.json({ message: 'Slide deleted successfully' });
    });
};
