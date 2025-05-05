const { validationResult } = require("express-validator")
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();
const User = db.User;

exports.register = async (req, res) => {
    const errors = validationResult(req);

    // Return validations errors
    if (!errors.isEmpty()) {
        return res.status(401).json({
            status: 'error',
            msg: 'Validation error',
            errors: errors.array()
        });
    }

    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name, email, password: hashedPassword,
        });

        // genrate user token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRATION_TIME
            }
        )
        return res.status(200).json({
            status: 'Success',
            msg: 'User Created Successfully.',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                token
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error.',
            errors: error
        });
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req);

    // Return validations errors
    if (!errors.isEmpty()) {
        return res.status(401).json({
            status: 'error',
            msg: 'Validation error',
            errors: errors.array()
        });
    }
    
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if(!user || !(await bcrypt.compare(password, user.password ))){
            return res.status(401).json({
                status: 'Error',
                msg: 'Invalid credentials',
                errors: [{ msg: "Invalid credentials"}]
            });
        }

        // Genrate user token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, 
            {
                expiresIn: process.env.JWT_EXPIRATION_TIME,
            }
        );

        return res.status(200).json({
            status: 'Success',
            msg: 'Logged in successfully.',
            user: {
                name: user.name,
                email: user.email,
                token
            }
        });
    } catch (error) {
        return res.status(500).json({ 
            status: 'Error',
            error,
            msg: 'Internal Server Error.'
        });
    }
}

exports.dashboard = async (req, res) => {
    return res.status(200).json({
        msg: "This is the Dashboard Page."
    });
}