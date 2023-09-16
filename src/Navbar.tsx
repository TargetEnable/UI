import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow:0 }}>
      <AppBar position="static" sx={{ backgroundColor: 'crimson', height: '60px'  }}>
        <Toolbar variant="dense">
         
          <img
            src="/logo.jpeg"
            srcSet="/logo.jpeg"
            alt="LOGO"
            loading="lazy"
            style={{ maxWidth: '100%', maxHeight: '100%', height: 'auto' }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

