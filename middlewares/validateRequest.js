const validateRequest = (schema) => (req, res, next) => {
    const dataToValidate = req.body || {};
    const { error } = schema.validate(dataToValidate, { abortEarly: false, stripUnknown: true });
    if (error) {
        const errors = error.details.map((err) => {
            return { 
                field: err.path[0], 
                msg: err.message 
            };
        });
        return res.status(400).json({ 
            status: "error", 
            msg: "Validation Error", 
            errors 
        });
    }
    next();
};

module.exports = validateRequest;
