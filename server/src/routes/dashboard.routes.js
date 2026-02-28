const router = require("express").Router();
const controller =
 require("../controllers/dashboard.controller");
const auth = require("../middleware/auth");

router.get("/", auth, controller.dashboard);

module.exports = router;