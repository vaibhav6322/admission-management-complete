const Program = require("../models/Program");
const Applicant = require("../models/Applicant");
const Admission = require("../models/Admission");

exports.dashboard = async (_, res) => {

  const programs = await Program.find();

  const stats = programs.map(p => {

    const filled =
      p.quotas.KCET.filled +
      p.quotas.COMEDK.filled +
      p.quotas.Management.filled;

    return {
      program: p.name,
      intake: p.intake,
      filled,
      remaining: p.intake - filled
    };
  });

  const pendingDocs =
    await Applicant.countDocuments({
      "documents.status": "Pending"
    });

  const pendingFees =
    await Admission.countDocuments({
      feeStatus: "Pending"
    });

  res.json({
    stats,
    pendingDocs,
    pendingFees
  });
};