const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Halaman Booking
router.get('/booking', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    db.query('SELECT * FROM lapangan', (err, results) => {
        if (err) throw err;
        res.render('booking', { lapangan: results });
    });
});

// History Booking
router.get('/history', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    db.query(`
        SELECT booking.*, lapangan.nama_lapangan
        FROM booking
        JOIN lapangan ON booking.lapangan_id = lapangan.id
        WHERE booking.user_id = ?
        ORDER BY booking.id DESC
    `,
    [req.session.user.id],
    (err, results) => {
        if (err) throw err;
        res.render('history', { bookings: results });
    });
});

// Proses Booking
router.post('/booking', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const { lapangan_id, tanggal, jam_mulai, durasi } = req.body;
    const user_id = req.session.user.id;

    const mulai = parseInt(jam_mulai.split(':')[0]);
    const selesai = mulai + parseInt(durasi);
    const jam_selesai = `${selesai}:00:00`;

    db.query(
        `SELECT * FROM booking
         WHERE lapangan_id = ?
         AND tanggal = ?
         AND ((? < jam_selesai) AND (? > jam_mulai))`,
        [lapangan_id, tanggal, jam_mulai, jam_selesai],
        (err, results) => {

            if (err) throw err;

            if (results.length > 0) {
                return res.send(`
                    <script>
                        alert("Jadwal bentrok! Pilih jam lain.");
                        window.location.href="/booking";
                    </script>
                `);
            }

            db.query(
                'SELECT * FROM lapangan WHERE id=?',
                [lapangan_id],
                (err, lapangan) => {

                    if (err) throw err;

                    const harga = lapangan[0].harga_per_jam;
                    const total = harga * durasi;

                    db.query(
                        `INSERT INTO booking
                        (user_id, lapangan_id, tanggal, jam_mulai, jam_selesai, durasi, total_harga)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [
                            user_id,
                            lapangan_id,
                            tanggal,
                            jam_mulai,
                            jam_selesai,
                            durasi,
                            total
                        ],
                        (err) => {
                            if (err) throw err;

                            return res.send(`
                                <script>
                                    alert("Booking berhasil!");
                                    window.location.href="/";
                                </script>
                            `);
                        }
                    );
                }
            );
        }
    );
});

module.exports = router;