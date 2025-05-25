const { Router } = require("express");
const validateRequest = require("../../middlewares/validateRequest");
const { create, update, views, destroy } = require("../../controllers/admin/role");
const { roleSchema } = require("../../requests/role");
const router = Router();

router.get('/view', views);
router.post('/create', validateRequest(roleSchema), create);
router.post('/update/:id', validateRequest(roleSchema), update);
router.post('/delete/:id', destroy);


module.exports = router;