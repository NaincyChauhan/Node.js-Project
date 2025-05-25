const { Router } = require("express");
const validateRequest = require("../../middlewares/validateRequest");
const { create, update, views, destroy } = require("../../controllers/admin/permission");
const { permissionSchema } = require("../../requests/permission");
const router = Router();

router.get('/view', views);
router.post('/create', validateRequest(permissionSchema), create);
router.post('/update/:id', validateRequest(permissionSchema), update);
router.post('/delete/:id', destroy);


module.exports = router;