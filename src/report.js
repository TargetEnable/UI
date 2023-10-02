import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import Navbar from './Navibar.js';
import './SupIncident.css';
import { getIncidents, getsupport } from './services/userService.js';

const Report = () => {
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

  // Function to convert table data to XML
  const convertToXML = () => {
    const xmlData = `
      <incidents>
        ${incidents.map((incident) => `
          <incident>
            <employeeName>${incident.employeeName}</employeeName>
            <incidentTitle>${incident.incidentTitle}</incidentTitle>
            <assignedTo>${incident.assignedTo || 'Not Assigned'}</assignedTo>
            <dateCreated>${incident.dateCreated}</dateCreated>
            <resolutionDate>${incident.resolutionDate || 'Not Resolved'}</resolutionDate>
          </incident>
        `).join('')}
      </incidents>
    `;

    // Create a Blob containing the XML data
    const blob = new Blob([xmlData], { type: 'application/xml' });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'incidents.xml';

    // Trigger a download
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="filter-container">
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            Reported Incidents
          </Typography>
          <Button variant="contained" color="primary" onClick={convertToXML}>
            Export to XML
          </Button>
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

export default Report;