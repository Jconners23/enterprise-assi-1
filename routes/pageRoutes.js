const express = require('express');
const router = express.Router();

// Home - Redirect to Login
router.get('/', (req, res) => {
    res.redirect('/login');
});

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Signup Page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Add Loan Page
router.get('/add-loan', (req, res) => {
    res.render('addLoan');
});

module.exports = router;
