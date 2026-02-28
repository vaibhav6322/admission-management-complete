
const mongoose=require("mongoose");
module.exports=mongoose.model("Admission",new mongoose.Schema({

 applicant:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Applicant"
 },

 program:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Program"
 },

 quota:String,

 allotmentNumber:String,

 status:{
   type:String,
   enum:[
     "Seat Locked",
     "Confirmed"
   ],
   default:"Seat Locked"
 },

 feeStatus:{
   type:String,
   enum:["Pending","Paid"],
   default:"Pending"
 }
}));
