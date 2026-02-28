
const mongoose=require("mongoose");
module.exports=mongoose.model("Applicant",new mongoose.Schema({

 firstName:String,
 lastName:String,
 gender:String,
 dob:Date,
 phone:String,
 email:String,

 category:{
   type:String,
   enum:["GM","SC","ST","OBC"]
 },

 entryType:String,
 quotaType:String,

 marks:Number,

 documents:{
   status:{
     type:String,
     enum:["Pending","Submitted","Verified"],
     default:"Pending"
   }
 }

}));
