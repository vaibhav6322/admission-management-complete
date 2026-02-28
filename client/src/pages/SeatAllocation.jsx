
import { Button, Paper } from "@mui/material";
import api from "../services/api";

export default function SeatAllocation(){
  const allocate=()=>{
    api.post("/admission/allocate",{
      applicantId:"",
      programId:"",
      quota:"KCET"
    });
  };

  return(
    <Paper sx={{p:3}}>
      <h2>Allocate Seat</h2>
      <Button variant="contained" onClick={allocate}>
        Allocate
      </Button>
    </Paper>
  );
}
