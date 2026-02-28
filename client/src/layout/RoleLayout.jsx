import Sidebar from "./Sidebar";

export default function RoleLayout({children}){

 const role =
   JSON.parse(localStorage.getItem("user"))?.role;

 return(
  <div className="role-layout">
   <Sidebar role={role}/>
   <div className="app-content">
    {children}
   </div>
  </div>
 );
}
