const validateRequest = (schema) => (req, res, next) => {
    const dataToValidate = req.body || {};
    const { error } = schema.validate(dataToValidate, { abortEarly: false, stripUnknown: true });
    if (error) {
        const errors = error.details.map((detail) => {
            return { 
                field: detail.path[0], 
                msg: detail.message 
            };
        });
        return res.status(400).json({ 
            status: "Error", 
            msg: "Validation Error", 
            errors 
        });
    }
    next();
};

module.exports = validateRequest;
