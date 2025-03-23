const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Generate Access Token (short-lived)
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Generate Refresh Token (long-lived)
function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

module.exports = { generateAccessToken, generateRefreshToken };
