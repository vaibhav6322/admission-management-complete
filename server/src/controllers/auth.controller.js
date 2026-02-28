
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.register=async(req,res)=>{
  const {name,email,password,role}=req.body;
  const hash=await bcrypt.hash(password,10);
  const user=await User.create({name,email,password:hash,role});
  res.json(user);
};

exports.login=async(req,res)=>{
  const {email,password}=req.body;
  const user=await User.findOne({email});
  if(!user) return res.status(400).json({message:"Invalid"});
  const valid=await bcrypt.compare(password,user.password);
  if(!valid) return res.status(400).json({message:"Invalid"});
  const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET);
  res.json({token,user});
};
