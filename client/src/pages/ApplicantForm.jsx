
import { TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import api from "../services/api";

export default function ApplicantForm(){
  const [name,setName]=useState("");

  const save=()=>{
    api.post("/applicant",{firstName:name});
  };

  return(
    <Paper sx={{p:3,maxWidth:500}}>
      <h2>Applicant</h2>
      <TextField fullWidth label="Student Name"
        onChange={e=>setName(e.target.value)}/>
      <Button variant="contained" sx={{mt:2}} onClick={save}>
        Create Applicant
      </Button>
    </Paper>
  );
}
