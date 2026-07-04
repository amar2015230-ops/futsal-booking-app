const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/admin/add', (req, res) => {
    const { nama_lapangan, harga_per_jam } = req.body;

    db.query(
        'INSERT INTO lapangan (nama_lapangan, harga_per_jam) VALUES (?, ?)',
        [nama_lapangan, harga_per_jam],
        (err) => {
            if (err) throw err;
            res.redirect('/admin');
        }
    );
});

router.get('/admin/delete/:id', (req, res) => {
    db.query(
        'DELETE FROM lapangan WHERE id = ?',
        [req.params.id],
        (err) => {
            if (err) throw err;
            res.redirect('/admin');
        }
    );
});

router.get('/admin', (req, res) => {
    db.query('SELECT * FROM lapangan', (err, results) => {
        if (err) throw err;
        res.render('admin', { lapangan: results });
    });
});

module.exports = router;