
import { TextField, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import api from "../services/api";

export default function ProgramSetup(){
  const {register,handleSubmit}=useForm();

  const submit=data=>{
    api.post("/master/program",data);
  };

  return(
    <Paper sx={{p:3,maxWidth:500}}>
      <h2>Create Program</h2>
      <form onSubmit={handleSubmit(submit)}>
        <TextField label="Program Name" fullWidth margin="normal"
          {...register("name")}/>
        <TextField label="Intake" type="number" fullWidth margin="normal"
          {...register("intake")}/>
        <Button variant="contained" type="submit">Save</Button>
      </form>
    </Paper>
  );
}
