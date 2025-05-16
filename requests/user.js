const Joi = require('joi');

// Register Validation
const createSchema = Joi.object({
    name: Joi.string().min(3).max(30).required()
        .messages({
            'string.base': 'Name must be a string',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name must be at least {#limit} characters',
            'string.max': 'Name cannot exceed {#limit} characters',
            'any.required': 'Opps! Name is required'
        }),
    email: Joi.string().email().required()
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
    // role: Joi.string().valid('user', 'admin').required()
    //     .messages({
    //         'any.only': 'Role must be either "user" or "admin"',
    //         'any.required': 'Opps! Role is required'
    //     })
});

module.exports = { createSchema };