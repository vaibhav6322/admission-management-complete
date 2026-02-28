const Applicant = require("../models/Applicant");

// UPDATE DOCUMENT STATUS

exports.updateDocumentStatus = async (req, res) => {

  const { applicantId, status } = req.body;

  const applicant =
    await Applicant.findById(applicantId);

  if (!applicant)
    return res.status(404).json({
      message: "Applicant not found"
    });

  applicant.documents.status = status;

  await applicant.save();

  res.json({
    message: "Document status updated",
    applicant
  });
};