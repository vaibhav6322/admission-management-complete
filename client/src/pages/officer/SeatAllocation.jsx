import { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Alert
} from "@mui/material";
import api from "../../services/api";

export default function SeatAllocation() {

  const [applicants,setApplicants]=useState([]);
  const [programs,setPrograms]=useState([]);

  const [selectedProgram,setSelectedProgram]=useState(null);

  const [form,setForm]=useState({
    applicantId:"",
    programId:"",
    quota:""
  });

  const [remaining,setRemaining]=useState(null);

    //  LOAD DATA
  useEffect(()=>{
    api.get("/applicant")
      .then(res=>setApplicants(res.data));

    api.get("/master/program")
      .then(res=>setPrograms(res.data));
  },[]);

    //  PROGRAM CHANGE
  const handleProgramChange=(id)=>{

    const program =
      programs.find(p=>p._id===id);

    setSelectedProgram(program);

    setForm({...form,programId:id});
  };

    //  QUOTA CHANGE
  const handleQuotaChange=(quota)=>{

    setForm({...form,quota});

    if(!selectedProgram) return;

    const q =
      selectedProgram.quotas[quota];

    setRemaining(
      q.total - q.filled
    );
  };

    //  ALLOCATE SEAT
  const allocateSeat = async()=>{

    if(remaining<=0){
      alert("Quota Full");
      return;
    }

    try{

      await api.post(
        "/admission/allocate",
        form
      );

      alert("Seat Allocated");

    }catch(err){
      alert(
        err.response?.data?.message
      );
    }
  };

  return(
    <Paper sx={{p:4}}>

      <Typography variant="h5">
        Seat Allocation
      </Typography>

      <Grid container spacing={2} mt={2}>

        {/* Applicant */}
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Applicant"
            onChange={e=>
              setForm({
                ...form,
                applicantId:e.target.value
              })
            }
          >
            {applicants.map(a=>(
              <MenuItem
               key={a._id}
               value={a._id}>
               {a.firstName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Program */}
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Program"
            onChange={e=>
              handleProgramChange(
                e.target.value
              )
            }
          >
            {programs.map(p=>(
              <MenuItem
                key={p._id}
                value={p._id}>
                {p.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Quota */}
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Quota"
            onChange={e=>
              handleQuotaChange(
                e.target.value
              )
            }
          >
            <MenuItem value="KCET">
              KCET
            </MenuItem>

            <MenuItem value="COMEDK">
              COMEDK
            </MenuItem>

            <MenuItem value="Management">
              Management
            </MenuItem>

          </TextField>
        </Grid>

      </Grid>

      {/* Remaining Seats */}
      {remaining!==null && (

        <Alert
          severity={
            remaining>0
            ?"success"
            :"error"
          }
          sx={{mt:3}}
        >
          Remaining Seats :
          {remaining}
        </Alert>
      )}

      <Button
        variant="contained"
        sx={{mt:3}}
        onClick={allocateSeat}
      >
        Allocate Seat
      </Button>

    </Paper>
  );
}