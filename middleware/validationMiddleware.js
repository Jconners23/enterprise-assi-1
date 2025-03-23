const { body } = require('express-validator');

const loginValidation = [
    body('username')
        .trim()
        .isString()
        .notEmpty().withMessage('Username is required')
        .escape(), // Prevent XSS

    body('password')
        .trim()
        .isString()
        .notEmpty().withMessage('Password is required')
        .escape(), // Prevent XSS
];

const signupValidation = [
    body('username')
        .trim()
        .isAlphanumeric().withMessage('Username must be alphanumeric')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .escape(), // Prevent XSS

    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .escape(), // Prevent XSS
];

const loanValidation = [
    body('bookTitle')
        .trim()
        .isString().withMessage('Book name must be a string')
        .notEmpty().withMessage('Book name is required')
        .escape(), // Prevent XSS

    body('bookAuthor')
        .trim()
        .isString().withMessage('Author name must be a string')
        .notEmpty().withMessage('Author name is required')
        .escape(), // Prevent XSS

    body('loanDate').isISO8601().withMessage('Invalid loan date format'),

    body('dueDate').isISO8601().withMessage('Invalid loan date format'),
];

module.exports = { loginValidation, signupValidation, loanValidation };