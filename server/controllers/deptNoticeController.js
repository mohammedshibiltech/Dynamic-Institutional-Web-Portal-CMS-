const db = require('../config/db');

exports.getDeptNotices = (req, res) => {
    const { deptId } = req.params;
    const sql = 'SELECT * FROM department_notices WHERE department_id = ? ORDER BY is_important DESC, created_at DESC';
    db.query(sql, [deptId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getAllDeptNotices = (req, res) => {
    const sql = 'SELECT * FROM department_notices ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addDeptNotice = (req, res) => {
    const { department_id, title, description, is_important } = req.body;
    const sql = 'INSERT INTO department_notices (department_id, title, description, is_important) VALUES (?, ?, ?, ?)';
    db.query(sql, [department_id, title, description, is_important || false], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, department_id, title, description, is_important });
    });
};

exports.updateDeptNotice = (req, res) => {
    const { id } = req.params;
    const { department_id, title, description, is_important } = req.body;
    const sql = 'UPDATE department_notices SET department_id = ?, title = ?, description = ?, is_important = ? WHERE id = ?';
    db.query(sql, [department_id, title, description, is_important, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Notice not found' });
        res.json({ message: 'Notice updated successfully' });
    });
};

exports.deleteDeptNotice = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM department_notices WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Notice not found' });
        res.json({ message: 'Notice deleted successfully' });
    });
};
