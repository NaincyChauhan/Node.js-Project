const { Router } = require("express");
const { body } = require('express-validator');
const { register, login, dashboard } = require("../controllers/auth");
const authenticateJWT = require("../middlewares/authenticateJWT");
const validateRequest = require("../middlewares/validateRequest");
const { registerSchema, loginSchema } = require("../requests/auth");
const router = Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.get('/dashboard',authenticateJWT , dashboard);

module.exports = router;