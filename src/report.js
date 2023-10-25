import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Select, MenuItem } from '@mui/material';
import Navbar from './Navibar.js';
import { getIncidents, getsupport } from './services/userService.js';
import { format, subHours, subWeeks, subMonths } from 'date-fns';

const Report = () => {
  const [incidents, setIncidents] = useState([]);
  const [displayedIncidents, setDisplayedIncidents] = useState([]);
  const [staffOptions, setStaffOptions] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    getIncidents()
      .then((data) => {
        setIncidents(data);
        setDisplayedIncidents(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    getsupport()
      .then((data) => {
        setStaffOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filterIncidents = (selectedFilter) => {
    setFilter(selectedFilter);

    switch (selectedFilter) {
      case '1hour':
        setDisplayedIncidents(incidents.filter((incident) =>
          subHours(new Date(), 1) <= new Date(incident.dateOfIncident)
        ));
        break;
      case '24hours':
        setDisplayedIncidents(incidents.filter((incident) =>
          subHours(new Date(), 24) <= new Date(incident.dateOfIncident)
        ));
        break;
      case 'week':
        setDisplayedIncidents(incidents.filter((incident) =>
          subWeeks(new Date(), 1) <= new Date(incident.dateOfIncident)
        ));
        break;
      case 'month':
        setDisplayedIncidents(incidents.filter((incident) =>
          subMonths(new Date(), 1) <= new Date(incident.dateOfIncident)
        ));
        break;
      case 'all':
        setDisplayedIncidents(incidents);
        break;
      default:
        setDisplayedIncidents(incidents);
    }
  };

  const convertToCSV = () => {
    // Create a CSV header row
    const csvHeader = 'Employee Email,Incident Title,Assigned staff,Date created,Resolved Date\n';

    // Create a CSV data row for each incident
    const csvData = displayedIncidents.map((incident) => (
      `${incident.email},${incident.incidentTitle},${incident.assignedTo || 'Not Assigned'},${format(new Date(incident.dateOfIncident), 'dd/MM/yyyy hh:mm:ss a')},${incident.resolutionDate
        ? format(new Date(incident.resolutionDate), 'dd/MM/yyyy hh:mm:ss a')
        : 'Not Resolved'}`
    )).join('\n');

    // Combine the header and data
    const csvContent = `${csvHeader}${csvData}`;

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'incidents.csv';

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
          <Select
            value={filter}
            onChange={(e) => filterIncidents(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="1hour">Last 1 Hour</MenuItem>
            <MenuItem value="24hours">Last 24 Hours</MenuItem>
            <MenuItem value="week">Last Week</MenuItem>
            <MenuItem value="month">Last Month</MenuItem>
          </Select>
        </div>
        <div className="export-button-container">
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ float: 'right', width: '100px' }}
            onClick={convertToCSV}
          >
            Export
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Employee Email</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Incident Title</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Assigned staff</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Date created</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Resolved Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell>{incident.email}</TableCell>
                  <TableCell>{incident.incidentTitle}</TableCell>
                  <TableCell>{incident.assignedTo || 'Not Assigned'}</TableCell>
                  <TableCell>{format(new Date(incident.dateOfIncident), 'dd/MM/yyyy hh:mm:ss a')}</TableCell>
                  <TableCell>
                    {incident.resolutionDate
                      ? format(new Date(incident.resolutionDate), 'dd/MM/yyyy hh:mm:ss a')
                      : 'Not Resolved'}
                  </TableCell>
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