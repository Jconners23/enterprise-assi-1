const { body } = require('express-validator');

const loginValidation = [
    body('username').trim().notEmpty().withMessage('Username is required').escape(),
    body('password').trim().notEmpty().withMessage('Password is required').escape(),
];

const signupValidation = [
    body('username').trim().isAlphanumeric().withMessage('Alphanumeric only').isLength({ min: 3 }).escape(),
    body('password').isLength({ min: 6 }).matches(/\d/).matches(/[A-Z]/).escape(),
];

const loanValidation = [
    body('bookTitle').trim().notEmpty().escape(),
    body('bookAuthor').trim().notEmpty().escape(),
    body('loanDate').isISO8601(),
    body('dueDate').isISO8601(),
];

module.exports = { loginValidation, signupValidation, loanValidation };