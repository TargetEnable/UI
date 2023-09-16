import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Report, List as ListIcon } from '@mui/icons-material'; // Import icons
import './Sidepanel.css'; // Import a CSS file for custom styles

function Sidepanel(props) {
  return (
    <Drawer anchor="left" open={props.isOpen} onClose={props.onClose}>
      <div id="mySidepanel" className={`sidepanel ${props.isOpen ? 'open' : ''}`}>
        <a href="javascript:void(0)" className="closebtn" onClick={props.onClose}>
          &times;
        </a>
        <List>
          <ListItemButton
            component={Link}
            to="/employee/dashboard/:email"
            className="sidepanel-item"
            sx={{ '&:hover': { backgroundColor: '#DC143C' } }}
            style={{ marginBottom: '50px' }}
          >
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: '#000' }} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/employee/incident_form"
            className="sidepanel-item"
            sx={{ '&:hover': { backgroundColor: '#DC143C' } }}
            style={{ marginBottom: '50px' }}
          >
            <ListItemIcon>
              <Report />
            </ListItemIcon>
            <ListItemText primary="Report an Incident" sx={{ color: '#000' }} />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/employee/incident_list/:email"
            className="sidepanel-item"
            sx={{ '&:hover': { backgroundColor: '#DC143C' } }}
            style={{ marginBottom: '50px' }}
          >
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Incident List" sx={{ color: '#000' }} />
          </ListItemButton>
        </List>
      </div>
    </Drawer>
  );
}

export default Sidepanel;

