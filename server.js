const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'futsal-secret',
    resave: false,
    saveUninitialized: true
}));

app.use('/', authRoutes);
app.use('/', bookingRoutes);
app.use('/', adminRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});