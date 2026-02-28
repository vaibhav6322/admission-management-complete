const router = require("express").Router();

const controller =
 require("../controllers/master.controller");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

/* ======================
   INSTITUTION
====================== */

// Admin create
router.post(
 "/institution",
 auth,
 role(["Admin"]),
 controller.createInstitution
);

// Admin + Officer view
router.get(
 "/institution",
 auth,
 role(["Admin","AdmissionOfficer"]),
 controller.getInstitutions
);


   // CAMPUS
router.post(
 "/campus",
 auth,
 role(["Admin"]),
 controller.createCampus
);

router.get(
 "/campus",
 auth,
 role(["Admin","AdmissionOfficer"]),
 controller.getCampus
);


   // DEPARTMENT
router.post(
 "/department",
 auth,
 role(["Admin"]),
 controller.createDepartment
);

router.get(
 "/department",
 auth,
 role(["Admin","AdmissionOfficer"]),
 controller.getDepartments
);


   // PROGRAM
router.post(
 "/program",
 auth,
 role(["Admin"]),
 controller.createProgram
);

router.get(
 "/program",
 auth,
 role(["Admin","AdmissionOfficer"]),
 controller.getPrograms
);

module.exports = router;