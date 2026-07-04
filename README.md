# Futsal Booking Web App

## Deskripsi
Futsal Booking Web App adalah aplikasi berbasis web full-stack yang digunakan untuk melakukan pemesanan lapangan futsal secara online.

Aplikasi ini memungkinkan user untuk:
- Registrasi akun
- Login
- Melakukan booking lapangan
- Melihat riwayat booking
- Mengelola data lapangan (admin)

Teknologi yang digunakan:
- Node.js
- Express.js
- EJS
- MySQL
- CSS

---

## Cara Menjalankan Project Secara Lokal

### 1. Clone Repository

```bash
git clone https://github.com/USERNAME/futsal-booking-app.git
```

Masuk ke folder project:

```bash
cd futsal-booking-app
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Database MySQL

Buka phpMyAdmin lalu buat database:

```sql
CREATE DATABASE futsal_booking;
```

Import atau jalankan query untuk membuat tabel:

#### users

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255)
);
```

#### lapangan

```sql
CREATE TABLE lapangan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_lapangan VARCHAR(100),
    harga_per_jam INT
);
```

#### booking

```sql
CREATE TABLE booking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    lapangan_id INT,
    tanggal DATE,
    jam_mulai TIME,
    jam_selesai TIME,
    durasi INT,
    total_harga INT
);
```

---

### 4. Konfigurasi Database

Edit file:

```text
config/db.js
```

Sesuaikan:

```javascript
host: 'localhost',
user: 'root',
password: '',
database: 'futsal_booking'
```

---

### 5. Jalankan Server

```bash
node server.js
```

Jika berhasil:

```text
Server running on port 3000
```

---

### 6. Buka Browser

```text
http://localhost:3000
```

---

## Author
Nama: Mohamad Amar Maulana Nurhuda
NIM: 25552012019
Jurusan: Informatika
