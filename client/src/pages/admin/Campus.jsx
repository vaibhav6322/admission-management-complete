import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper
} from "@mui/material";
import api from "../../services/api";

export default function Campus() {

  const [institutions, setInstitutions] = useState([]);
  const [form, setForm] = useState({
    name: "",
    institution: ""
  });

  // ✅ Load Institutions
  useEffect(() => {
    api.get("/master/institution")
      .then(res => setInstitutions(res.data));
  }, []);

  const createCampus = async () => {
    await api.post("/master/campus", form);
    alert("Campus Created");
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500 }}>
      <h2>Create Campus</h2>

      {/* Institution Dropdown */}
      <TextField
        select
        label="Institution"
        fullWidth
        margin="normal"
        onChange={e =>
          setForm({
            ...form,
            institution: e.target.value
          })
        }
      >
        {institutions.map(inst => (
          <MenuItem key={inst._id} value={inst._id}>
            {inst.name}
          </MenuItem>
        ))}
      </TextField>

      {/* Campus Name */}
      <TextField
        label="Campus Name"
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
        onClick={createCampus}
      >
        Create Campus
      </Button>
    </Paper>
  );
}