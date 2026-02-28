const router = require("express").Router();
const controller =
 require("../controllers/admission.controller");
const auth = require("../middleware/auth");

router.get("/", auth, controller.getAdmissions);

router.post(
 "/allocate",
 auth,
 controller.allocateSeat
);

router.patch(
 "/fee",
 auth,
 controller.updateFeeStatus
);

router.post(
 "/confirm",
 auth,
 controller.confirmAdmission
);

module.exports = router;