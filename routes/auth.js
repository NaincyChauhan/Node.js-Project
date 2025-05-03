const { Router } = require("express");
const { body } = require('express-validator');
const { register, login, dashboard } = require("../controllers/auth");
const authenticateJWT = require("../middlewares/authenticateJWT");
const router = Router();

const validateRegister = [
    body('name').isLength({ min: 4 }).notEmpty().withMessage('Opps! Name is required.').trim().escape(),
    body('email').isEmail().notEmpty().withMessage('Opps! Email is required.').trim().escape(),
    body('password').isLength({ min: 8 }).withMessage('Opps! Password is required.').trim().escape(),
];

const validateLogin = [
    body('email').isEmail().notEmpty().withMessage('Opps! Email is required.').trim().escape(),
    body('password').notEmpty().withMessage('Opps! Password is required.').trim().escape(),
];

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/dashboard',authenticateJWT , dashboard);

module.exports = router;