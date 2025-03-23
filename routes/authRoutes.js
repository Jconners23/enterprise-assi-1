const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const userService = require('../models/userModel');
const tokenService = require('../models/tokenModel');
const { generateAccessToken, generateRefreshToken } = require('../utilities/jwt');
const { loginValidation, signupValidation } = require('../middleware/validationMiddleware');

const router = express.Router();

// Login
router.post('/login', loginValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    const { username, password } = req.body;
    const user = await userService.findUserByUsername(username);
    if (!user) return res.status(400).send({ error: 'User not found' });

    try {
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Invalid password' });
        }

        const accessToken = generateAccessToken({ username });
        const refreshToken = generateRefreshToken({ username });

        await tokenService.saveRefreshToken(username, refreshToken);

        res.status(200).json({ user: username, token: accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Signup
router.post('/signup', signupValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send({ error: 'Passwords do not match' });
    }

    if (await userService.findUserByUsername(username)) {
        return res.status(400).send({ error: 'Username already taken' });
    }

    try {
        const newUser = await userService.createNewUser(username, password);
        const accessToken = generateAccessToken({ username: newUser.username });
        const refreshToken = generateRefreshToken({ username: newUser.username });

        await tokenService.saveRefreshToken(newUser.username, refreshToken);
        res.status(201).json({ user: newUser.username, token: accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Refresh Token
router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: "Refresh token required" });

    if (!await tokenService.getRefreshToken(refreshToken)) {
        return res.status(403).json({ error: "Invalid refresh token" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid refresh token" });

        const newAccessToken = generateAccessToken({ username: user.username });
        res.json({ accessToken: newAccessToken });
    });
});

// Logout
router.post('/logout', async (req, res) => {
    try {
        if (!await tokenService.deleteRefreshToken(req.body.refreshToken)) {
            return res.status(400).json({ error: 'Issue logging out' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
