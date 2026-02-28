
require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db");

connectDB();
const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",require("./routes/auth.routes"));
app.use("/api/dashboard",require("./routes/dashboard.routes"));
app.use("/api/master",
 require("./routes/master.routes"));
app.listen(process.env.PORT||4000,()=>console.log("Server Running"));

app.use(
  "/api/applicant",
  require("./routes/applicant.routes")
);
app.use(
  "/api/admission",
  require("./routes/admission.routes")
);

app.use(
 "/api/dashboard",
 require("./routes/dashboard.routes")
);