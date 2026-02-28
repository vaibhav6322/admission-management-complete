import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Grid,
  Typography
} from "@mui/material";
import api from "../../services/api";

export default function Applicant() {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    category: "",
    entryType: "",
    quotaType: "",
    marks: "",
    documents: {
      status: "Pending"
    }
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const createApplicant = async () => {
    try {
      await api.post("/applicant", form);
      alert("Applicant Created Successfully");
    } catch (err) {
      alert("Error creating applicant");
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5">
        Create Applicant
      </Typography>

      <Grid container spacing={2} mt={1}>

        <Grid item xs={6}>
          <TextField
            label="First Name"
            fullWidth
            onChange={e =>
              handleChange("firstName", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Last Name"
            fullWidth
            onChange={e =>
              handleChange("lastName", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Email"
            fullWidth
            onChange={e =>
              handleChange("email", e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Phone"
            fullWidth
            onChange={e =>
              handleChange("phone", e.target.value)}
          />
        </Grid>

        {/* CATEGORY */}
        <Grid item xs={4}>
          <TextField
            select
            label="Category"
            fullWidth
            onChange={e =>
              handleChange("category", e.target.value)}
          >
            <MenuItem value="GM">GM</MenuItem>
            <MenuItem value="SC">SC</MenuItem>
            <MenuItem value="ST">ST</MenuItem>
            <MenuItem value="OBC">OBC</MenuItem>
          </TextField>
        </Grid>

        {/* ENTRY TYPE */}
        <Grid item xs={4}>
          <TextField
            select
            label="Entry Type"
            fullWidth
            onChange={e =>
              handleChange("entryType", e.target.value)}
          >
            <MenuItem value="Regular">
              Regular
            </MenuItem>
            <MenuItem value="Lateral">
              Lateral
            </MenuItem>
          </TextField>
        </Grid>

        {/* QUOTA */}
        <Grid item xs={4}>
          <TextField
            select
            label="Quota Type"
            fullWidth
            onChange={e =>
              handleChange("quotaType", e.target.value)}
          >
            <MenuItem value="KCET">KCET</MenuItem>
            <MenuItem value="COMEDK">
              COMEDK
            </MenuItem>
            <MenuItem value="Management">
              Management
            </MenuItem>
          </TextField>
        </Grid>

        {/* MARKS */}
        <Grid item xs={12}>
          <TextField
            label="Qualifying Marks"
            type="number"
            fullWidth
            onChange={e =>
              handleChange("marks", e.target.value)}
          />
        </Grid>

      </Grid>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={createApplicant}
      >
        Create Applicant
      </Button>
    </Paper>
  );
}