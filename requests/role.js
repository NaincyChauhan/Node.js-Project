const Joi = require('joi');

// Register Validation
const roleSchema = Joi.object({
    name: Joi.string().min(3).max(50).required()
        .messages({
            'string.base': 'Role must be a string',
            'string.empty': 'Role cannot be empty',
            'string.min': 'Role must be at least {#limit} characters',
            'string.max': 'Role cannot exceed {#limit} characters',
            'any.required': 'Opps! Role is required'
        }),
});

module.exports = { roleSchema };