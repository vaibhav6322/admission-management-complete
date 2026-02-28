const Admission = require("../models/Admission");
const Program = require("../models/Program");

// SEAT ALLOCATION

exports.allocateSeat = async (req, res) => {

  const { applicantId, programId, quota } = req.body;

  const program = await Program.findById(programId);

  if (!program)
    return res.status(404).json({
      message: "Program not found"
    });

  // RULE: block if quota full
  if (
    program.quotas[quota].filled >=
    program.quotas[quota].total
  ) {
    return res.status(400).json({
      message: "Quota Full"
    });
  }

  // increase filled count
  program.quotas[quota].filled += 1;
  await program.save();

  const admission = await Admission.create({
    applicant: applicantId,
    program: programId,
    quota,
    status: "Seat Locked"
  });

  res.json(admission);
};

// CONFIRM ADMISSION

exports.confirmAdmission = async (req, res) => {

  const { admissionId } = req.body;

  const admission =
    await Admission.findById(admissionId)
      .populate("program");

  if (!admission)
    return res.status(404).json({
      message: "Admission not found"
    });

  // Fee rule
  if (admission.feeStatus !== "Paid") {
    return res.status(400).json({
      message: "Fee Pending"
    });
  }

  // Immutable rule
  if (admission.admissionNumber) {
    return res.status(400).json({
      message: "Already Confirmed"
    });
  }

  const program = admission.program;

  // admission serial
  const serial =
    (await Admission.countDocuments()) + 1;

  admission.admissionNumber =
    `INST/${program.academicYear}/` +
    `${program.courseType}/` +
    `${program.code}/` +
    `${admission.quota}/` +
    `${String(serial).padStart(4, "0")}`;

  admission.status = "Confirmed";

  await admission.save();

  res.json(admission);
};
exports.getAdmissions = async (_, res) => {

 const data = await Admission.find()
   .populate("applicant")
   .populate("program");

 res.json(data);
};
exports.updateFeeStatus = async (req, res) => {

  const { admissionId, feeStatus } = req.body;

  const admission =
    await Admission.findById(admissionId);

  if (!admission)
    return res.status(404).json({
      message: "Admission not found"
    });

  admission.feeStatus = feeStatus;

  await admission.save();

  res.json({
    message: "Fee Updated",
    admission
  });
};