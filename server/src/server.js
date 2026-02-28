
require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db");

connectDB();
const app=express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
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