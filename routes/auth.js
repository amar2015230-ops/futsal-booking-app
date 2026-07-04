const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { nama, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (nama, email, password) VALUES (?, ?, ?)',
        [nama, email, hashedPassword],
        (err, result) => {
            if (err) throw err;
            res.redirect('/login');
        }
    );
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, results) => {
            if (err) throw err;

            if (results.length === 0) {
                return res.send('User tidak ditemukan');
            }

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.send('Password salah');
            }

            req.session.user = user;
            res.redirect('/dashboard');
        }
    );
});

router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('dashboard', {
        user: req.session.user
    });
});

module.exports = router;