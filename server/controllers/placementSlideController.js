const db = require('../config/db');

// Get all placement slides
exports.getPlacementSlides = (req, res) => {
    const sql = 'SELECT * FROM placement_slides ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Add a placement slide
exports.addPlacementSlide = (req, res) => {
    let { title, image_url } = req.body;

    if (req.file) {
        image_url = `${req.protocol}://${req.get('host')}/uploads/placement/${req.file.filename}`;
    }

    if (!image_url) {
        return res.status(400).json({ error: 'Image is required' });
    }

    const sql = 'INSERT INTO placement_slides (image_url, title) VALUES (?, ?)';
    db.query(sql, [image_url, title], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, image_url, title });
    });
};

// Update a placement slide
exports.updatePlacementSlide = (req, res) => {
    const { id } = req.params;
    let { title, image_url } = req.body;

    if (req.file) {
        image_url = `${req.protocol}://${req.get('host')}/uploads/placement/${req.file.filename}`;
    }

    const sql = 'UPDATE placement_slides SET image_url = ?, title = ? WHERE id = ?';
    db.query(sql, [image_url, title, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Slide not found' });
        res.json({ message: 'Slide updated successfully', image_url });
    });
};

// Delete a placement slide
exports.deletePlacementSlide = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM placement_slides WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Slide not found' });
        res.json({ message: 'Slide deleted successfully' });
    });
};
