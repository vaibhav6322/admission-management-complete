import { Drawer, List, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar({ role }) {

 const adminMenu = [
   ["Institution","/institution"],
   ["Campus","/campus"],
   ["Department","/department"],
   ["Program","/program"]
 ];

 const officerMenu = [
   ["Applicants","/applicant"],
   ["Verify Docs","/verify"],
   ["Allocate Seat","/allocate"],
   ["Fee Update","/fee"],
   ["Confirm Admission","/confirm"]
 ];

 const managementMenu = [
   ["Dashboard","/dashboard"]
 ];

 const menu =
   role==="Admin"
     ? adminMenu
     : role==="AdmissionOfficer"
     ? officerMenu
     : managementMenu;

 return (
  <Drawer variant="permanent" className="app-drawer">
   <List className="sidebar-list" sx={{width:230}}>
    {menu.map(m=>(
     <ListItemButton
      component={Link}
      to={m[1]}
      key={m[0]}>
      {m[0]}
     </ListItemButton>
    ))}
   </List>
  </Drawer>
 );
}
