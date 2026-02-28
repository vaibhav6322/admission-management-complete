const router = require("express").Router();
const Applicant = require("../models/Applicant");
const auth = require("../middleware/auth");
const controller =
 require("../controllers/applicant.controller");

// CREATE APPLICANT
router.post("/", auth, async (req, res) => {
  const applicant = await Applicant.create(req.body);
  res.json(applicant);
});

router.patch(
 "/verify-documents",
 auth,
 controller.updateDocumentStatus
);
// GET ALL
router.get("/", auth, async (_, res) => {
  const data = await Applicant.find();
  res.json(data);
});

module.exports = router;