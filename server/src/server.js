require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://admission-management-complete-frontend.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/master", require("./routes/master.routes"));
app.use("/api/applicant", require("./routes/applicant.routes"));
app.use("/api/admission", require("./routes/admission.routes"));

app.listen(process.env.PORT || 4000, () =>
  console.log("Server Running on port", process.env.PORT || 4000)
);