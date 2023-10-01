import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Navbar from './Navibar.js';
import './SupIncident.css';
import { getIncidents, getsupport } from './services/userService';

const Report = () => { // Change function name to 'Report' with an uppercase letter
  const [incidents, setIncidents] = useState([]);
  const [staffOptions, setStaffOptions] = useState([]);
  
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    getIncidents()
      .then((data) => {
        // Update the state with the fetched data
        setIncidents(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    getsupport()
      .then((data) => {
        // Update the state with the fetched data
        setStaffOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="filter-container">
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            Reported Incidents
          </Typography>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Employee Name</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Incident Title</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Assigned staff</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Date created</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Resolved Date</TableCell> {/* Change Date reported to Resolved Date */}
              </TableRow>
            </TableHead>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell>{incident.employeeName}</TableCell>
                  <TableCell>{incident.incidentTitle}</TableCell>
                  <TableCell>{incident.assignedTo || 'Not Assigned'}</TableCell>
                  <TableCell>{incident.dateCreated}</TableCell> {/* Use Date created */}
                  <TableCell>{incident.resolutionDate || 'Not Resolved'}</TableCell> {/* Add Resolution Date */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Report; // Export as 'Report' with an uppercase letter
