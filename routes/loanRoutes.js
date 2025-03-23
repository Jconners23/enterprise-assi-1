const express = require('express');
const { validationResult } = require('express-validator');

const { authenticateToken } = require('../middleware/authMiddleware');
const { loanValidation } = require('../middleware/validationMiddleware');
const loanRecordsService = require('../models/loanRecordsModel');

const router = express.Router();

// Add Loan
router.post('/add-loan', authenticateToken, loanValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    try {
        const { username, bookTitle, bookAuthor, loanDate, dueDate } = req.body;
        const response = await loanRecordsService.saveLoanRecord(username, bookTitle, bookAuthor, loanDate, dueDate);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Return Book
router.post('/return-book', authenticateToken, async (req, res) => {
    try {
        const response = await loanRecordsService.updateLoanRecordReturnedDate(req.body.id, new Date().toISOString().split('T')[0]);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get Loan Records
router.post('/loan-records', authenticateToken, async (req, res) => {
        try {
            const response = await loanRecordsService.getRecordsForUser(req.body.username);
            return res.status(200).json(response);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

module.exports = router;
