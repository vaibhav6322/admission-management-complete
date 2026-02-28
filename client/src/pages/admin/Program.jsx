import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Grid,
  Typography
} from "@mui/material";
import api from "../../services/api";

export default function Program() {

  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    code: "",
    department: "",
    academicYear: "",
    courseType: "",
    entryType: "",
    admissionMode: "",
    intake: 0,
    quotas: {
      KCET: { total: 0 },
      COMEDK: { total: 0 },
      Management: { total: 0 }
    }
  });

  // Load Departments
  useEffect(() => {
    api.get("/master/department")
      .then(res => setDepartments(res.data));
  }, []);

  // HANDLE INPUT
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleQuotaChange = (quota, value) => {
    setForm({
      ...form,
      quotas: {
        ...form.quotas,
        [quota]: { total: Number(value) }
      }
    });
  };

  // CREATE PROGRAM
  const createProgram = async () => {

    const totalQuota =
      form.quotas.KCET.total +
      form.quotas.COMEDK.total +
      form.quotas.Management.total;

    if (totalQuota !== Number(form.intake)) {
      alert("Quota total must equal intake");
      return;
    }

    await api.post("/master/program", form);

    alert("Program Created Successfully");
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800 }}>
      <Typography variant="h5">
        Create Program / Branch
      </Typography>

      <Grid container spacing={2} mt={1}>

        {/* Program Name */}
        <Grid item xs={6}>
          <TextField
            label="Program Name"
            fullWidth
            onChange={e =>
              handleChange("name", e.target.value)}
          />
        </Grid>

        {/* Code */}
        <Grid item xs={6}>
          <TextField
            label="Program Code"
            fullWidth
            onChange={e =>
              handleChange("code", e.target.value)}
          />
        </Grid>

        {/* Department */}
        <Grid item xs={12}>
          <TextField
            select
            label="Department"
            fullWidth
            onChange={e =>
              handleChange("department", e.target.value)}
          >
            {departments.map(dep => (
              <MenuItem
                key={dep._id}
                value={dep._id}>
                {dep.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Academic Year */}
        <Grid item xs={6}>
          <TextField
            label="Academic Year"
            placeholder="2026"
            fullWidth
            onChange={e =>
              handleChange(
                "academicYear",
                e.target.value
              )}
          />
        </Grid>

        {/* Course Type */}
        <Grid item xs={6}>
          <TextField
            select
            label="Course Type"
            fullWidth
            onChange={e =>
              handleChange(
                "courseType",
                e.target.value
              )}
          >
            <MenuItem value="UG">UG</MenuItem>
            <MenuItem value="PG">PG</MenuItem>
          </TextField>
        </Grid>

        {/* Entry Type */}
        <Grid item xs={6}>
          <TextField
            select
            label="Entry Type"
            fullWidth
            onChange={e =>
              handleChange(
                "entryType",
                e.target.value
              )}
          >
            <MenuItem value="Regular">
              Regular
            </MenuItem>
            <MenuItem value="Lateral">
              Lateral
            </MenuItem>
          </TextField>
        </Grid>

        {/* Admission Mode */}
        <Grid item xs={6}>
          <TextField
            select
            label="Admission Mode"
            fullWidth
            onChange={e =>
              handleChange(
                "admissionMode",
                e.target.value
              )}
          >
            <MenuItem value="Government">
              Government
            </MenuItem>
            <MenuItem value="Management">
              Management
            </MenuItem>
          </TextField>
        </Grid>

        {/* Intake */}
        <Grid item xs={12}>
          <TextField
            type="number"
            label="Total Intake"
            fullWidth
            onChange={e =>
              handleChange(
                "intake",
                Number(e.target.value)
              )}
          />
        </Grid>

        {/* QUOTA MATRIX */}
        <Grid item xs={4}>
          <TextField
            label="KCET Seats"
            type="number"
            fullWidth
            onChange={e =>
              handleQuotaChange(
                "KCET",
                e.target.value
              )}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="COMEDK Seats"
            type="number"
            fullWidth
            onChange={e =>
              handleQuotaChange(
                "COMEDK",
                e.target.value
              )}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Management Seats"
            type="number"
            fullWidth
            onChange={e =>
              handleQuotaChange(
                "Management",
                e.target.value
              )}
          />
        </Grid>

      </Grid>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={createProgram}
      >
        Create Program
      </Button>
    </Paper>
  );
}