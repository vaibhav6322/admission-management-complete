import { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const login = async () => {

    try {

      const res = await api.post(
        "/auth/login",
        form
      );

      /* SAVE USER */
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      /* ROLE BASED REDIRECT */
      const role = res.data.user.role;

      if (role === "Admin")
        navigate("/institution");

      else if (role === "AdmissionOfficer")
        navigate("/applicant");

      else if (role === "Management")
        navigate("/dashboard");

    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, margin: "auto", mt: 10 }}>

      <h2>Login</h2>

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        onChange={e =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={e =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <Button
        variant="contained"
        fullWidth
        onClick={login}
      >
        Login
      </Button>

    </Paper>
  );
}