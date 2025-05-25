const Joi = require('joi');

// Register Validation
const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required()
        .messages({
            'string.base': 'Name must be a string',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name must be at least {#limit} characters',
            'string.max': 'Name cannot exceed {#limit} characters',
            'any.required': 'Opps! Name is required'
        }),
    email: Joi.string().email().max(50).required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Opps! Email is required'
        }),
    password: Joi.string().min(3).max(30).required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least {#limit} characters',
            'string.max': 'Password cannot exceed {#limit} characters',
            'any.required': 'Opps! Password is required'
        }),

    // password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,30}$/).required()
    //     .messages({
    //         'string.pattern.base': 'Password must be 8-30 characters long and include uppercase, lowercase, number, and special character',
    //         'any.required': 'Opps! Password is required'
    //     }),
});

// Login Validation
const loginSchema = Joi.object({
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(3).max(30).required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least {#limit} characters',
            'string.max': 'Password cannot exceed {#limit} characters',
            'any.required': 'Opps! Password is required'
        }),

    // password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,30}$/).required()
    //     .messages({
    //         'string.pattern.base': 'Password must be 8-30 characters long and include uppercase, lowercase, number, and special character',
    //         'any.required': 'Opps! Password is required'
    //     }),
});

module.exports = { registerSchema, loginSchema };