import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import './navbar.css';

import { Link, useLocation } from 'react-router-dom';
import Sidepanel from './Sidepanel';

const role = localStorage.getItem('role');

function Navbar() {
  const [isSidepanelOpen, setIsSidepanelOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    // Handle logout logic here
  };

  const toggleSidepanel = () => {
    setIsSidepanelOpen(!isSidepanelOpen);
  };

  let homeLink;
  if (role === 'admin') {
    homeLink = '/admin/dashboard';
  } else if (role === 'team') {
    homeLink = '/employee/dashboard/:email';
  } else if (role === 'support') {
    homeLink = '/support/incident';
  } else {
    homeLink = '/';
  }

  const showHomeButton = location.pathname !== homeLink;

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <AppBar position="static" sx={{ backgroundColor: 'crimson', height: '60px' }}>
        <Toolbar variant="dense">
          {role === 'team' && (
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: -38, ml: -42 }} onClick={toggleSidepanel}>
              <MenuIcon />
            </IconButton>
          )}
          <img
            src="/logo.jpeg"
            srcSet="/logo.jpeg"
            alt="LOGO"
            loading="lazy"
            style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {showHomeButton && (
              <Link to={homeLink} style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }} class="icon">
                <HomeIcon /> HOME
              </Link>
            )}
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }} class="icon">
              <LogoutIcon /> LOGOUT
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      {role === 'team' && (
        <Sidepanel isOpen={isSidepanelOpen} onClose={toggleSidepanel} />
      )}
    </Box>
  );
}

export default Navbar;