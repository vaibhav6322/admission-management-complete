const Institution = require("../models/Institution");
const Campus = require("../models/Campus");
const Department = require("../models/Department");
const Program = require("../models/Program");
exports.createInstitution = async (req,res)=>{
 const data = await Institution.create(req.body);
 res.json(data);
};

exports.getInstitutions = async (_,res)=>{
 res.json(await Institution.find());
};
exports.createCampus = async (req,res)=>{
 res.json(await Campus.create(req.body));
};

exports.getCampus = async (req,res)=>{
 res.json(await Campus.find()
   .populate("institution"));
};
exports.createDepartment = async (req,res)=>{
 res.json(await Department.create(req.body));
};

exports.getDepartments = async (_,res)=>{
 res.json(await Department.find()
   .populate({
     path:"campus",
     populate:"institution"
   }));
};
exports.createProgram = async (req, res) => {

  try {

    const body = req.body;   

      //  QUOTA VALIDATION
    const total =
      body.quotas.KCET.total +
      body.quotas.COMEDK.total +
      body.quotas.Management.total;

    if (total !== body.intake) {
      return res.status(400).json({
        message: "Quota total must equal intake"
      });
    }

      //  CREATE PROGRAM
    const program =
      await Program.create(body);

    res.json(program);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Program creation failed"
    });
  }
};

exports.getPrograms = async (_,res)=>{
 res.json(await Program.find()
   .populate({
     path:"department",
     populate:{
       path:"campus",
       populate:"institution"
     }
   }));
};