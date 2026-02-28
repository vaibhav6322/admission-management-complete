
import { Button, Paper } from "@mui/material";
import api from "../services/api";

export default function AdmissionConfirmation(){
  const confirm=()=>{
    api.post("/admission/confirm",{ admissionId:"" });
  };

  return(
    <Paper sx={{p:3}}>
      <h2>Confirm Admission</h2>
      <Button variant="contained" onClick={confirm}>
        Confirm Admission
      </Button>
    </Paper>
  );
}
