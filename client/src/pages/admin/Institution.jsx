import { TextField, Button } from "@mui/material";
import api from "../../services/api";
import { useState } from "react";

export default function Institution(){

 const [name,setName]=useState("");

 const save=()=>{
   api.post("/master/institution",{name});
 };

 return(
 <>
  <h2>Institution</h2>
  <TextField label="Institution Name"
   onChange={e=>setName(e.target.value)}/>
  <Button onClick={save}>Create</Button>
 </>
 );
}