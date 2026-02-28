import { useState } from "react";
import api from "../services/api";
import { TextField, Button } from "@mui/material";

export default function Institution(){

 const [name,setName]=useState("");

 const save=()=>{
   api.post("/master/institution",{name});
 };

 return(
  <>
   <h2>Institution</h2>
   <TextField label="Name"
     onChange={e=>setName(e.target.value)} />
   <Button onClick={save}>Save</Button>
  </>
 );
}