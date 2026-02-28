
import { Drawer, List, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Drawer variant="permanent" className="app-drawer">
        <List className="sidebar-list" sx={{ width: 220 }}>
          <ListItemButton component={Link} to="/dashboard">Dashboard</ListItemButton>
          <ListItemButton component={Link} to="/program">Programs</ListItemButton>
          <ListItemButton component={Link} to="/applicant">Applicants</ListItemButton>
          <ListItemButton component={Link} to="/allocate">Allocate Seat</ListItemButton>
          <ListItemButton component={Link} to="/confirm">Confirm</ListItemButton>
        </List>
      </Drawer>
      <div className="app-content">
        {children}
      </div>
    </div>
  );
}
