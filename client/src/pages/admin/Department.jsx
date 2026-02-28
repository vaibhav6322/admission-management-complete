import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper
} from "@mui/material";
import api from "../../services/api";

export default function Department() {

  const [campusList, setCampusList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    campus: ""
  });

  //  Load Campus
  useEffect(() => {
    api.get("/master/campus")
      .then(res => setCampusList(res.data));
  }, []);

  const createDepartment = async () => {
    await api.post("/master/department", form);
    alert("Department Created");
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500 }}>
      <h2>Create Department</h2>

      {/* Campus Dropdown */}
      <TextField
        select
        label="Campus"
        fullWidth
        margin="normal"
        onChange={e =>
          setForm({
            ...form,
            campus: e.target.value
          })
        }
      >
        {campusList.map(c => (
          <MenuItem key={c._id} value={c._id}>
            {c.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Department Name */}
      <TextField
        label="Department Name"
        fullWidth
        margin="normal"
        onChange={e =>
          setForm({
            ...form,
            name: e.target.value
          })
        }
      />

      <Button
        variant="contained"
        onClick={createDepartment}
      >
        Create Department
      </Button>
    </Paper>
  );
}