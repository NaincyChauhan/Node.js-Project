const { Router } = require("express");
const validateRequest = require("../middlewares/validateRequest");
const { create } = require("../controllers/admin/user");
const { createSchema } = require("../requests/user");
const router = Router();

router.post('/create', validateRequest(createSchema), create);


module.exports = router;