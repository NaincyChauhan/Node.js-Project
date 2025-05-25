const Joi = require('joi');

// Register Validation
const permissionSchema = Joi.object({
    name: Joi.string().min(3).max(50).required()
        .messages({
            'string.base': 'Permission must be a string',
            'string.empty': 'Permission cannot be empty',
            'string.min': 'Permission must be at least {#limit} characters',
            'string.max': 'Permission cannot exceed {#limit} characters',
            'any.required': 'Opps! Permission is required'
        }),
});

module.exports = { permissionSchema };