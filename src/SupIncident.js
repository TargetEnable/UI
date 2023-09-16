import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Navbar from './Navibar.js';
import './SupIncident.css';
import { getIncidents, updateIncidents, getsupport } from './services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialIncidentsData = [
  // Your initial incidents data...
];

const IncidentTable = () => {
  const [expandedIncidentId, setExpandedIncidentId] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [incidents, setIncidents] = useState([]);
  const [staffOptions, setStaffOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');

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
  }, [selectedStatus]);
  console.log(staffOptions);

  const toggleExpand = (incidentId) => {
    setExpandedIncidentId(expandedIncidentId === incidentId ? null : incidentId);
  };

  const handleStaffSelect = (event) => {
    setSelectedStaff(event.target.value);
  };

  const assignStaff = (incidentId) => {
    if (selectedStaff) {
      // Create an object with the updated data
      const updatedData = {
        assignedTo: selectedStaff,
        status: "In Progress",
      };

      // Call the updateIncidents function with the incident ID and updated data
      updateIncidents(incidentId, updatedData)
        .then((response) => {
          // Check if the update was successful
          if (response === 'Incident updated successfully') {
            // Update the state to reflect the new assigned staff
            const updatedIncidents = incidents.map((incident) => {
              if (incident.id === incidentId && incident.status === 'Open') {
                return { ...incident, assignedTo: selectedStaff, status: 'In Progress' };
              }
              return incident;
            });
            setIncidents(updatedIncidents);
            setSelectedStaff('');
            toast.success('Staff Assigned Successfully');
          } else {
            // Handle error if needed
            console.error('Error updating incident:', response);
          }
        })
        .catch((error) => {
          console.error('Error updating incident:', error);
          toast.error('Error updating incident. Please try again.');
        });
    }
  };

  const filteredIncidents = incidents.filter((incident) => selectedStatus === 'All' || incident.status === selectedStatus);

  const sortedIncidents = filteredIncidents.sort((a, b) => {
    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };

    const priorityComparison = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityComparison !== 0) {
      return priorityComparison;
    }

    const statusComparison = (b.status || '').localeCompare(a.status || '');
    if (statusComparison !== 0) {
      return statusComparison;
    }

    // If priorities are the same, compare by date created (ascending order)
    return new Date(a.dateOfIncident) - new Date(b.dateOfIncident);
  });

  return (
    <div>
      <div className="filter-container">
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        Reported Incidents
      </Typography>
        <FormControl>
          
          <Select
            id="status-filter"
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Incident title</TableCell>
              <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Date reported</TableCell>
              <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Priority</TableCell>
              <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Assigned staff</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedIncidents.map((incident) => (
              <React.Fragment key={incident.id}>
                <TableRow onClick={() => toggleExpand(incident.id)}>
                  <TableCell>{incident.incidentTitle}</TableCell>
                  <TableCell>{incident.status}</TableCell>
                  <TableCell>{incident.dateOfIncident}</TableCell>
                  <TableCell>
                    <span className={`priority-indicator ${incident.priority.toLowerCase()}`}>
                      {incident.priority}
                    </span>
                  </TableCell>
                  <TableCell>{incident.assignedTo || 'Not Assigned'}</TableCell>
                </TableRow>
                {expandedIncidentId === incident.id && (
                  <TableRow className="expanded-row">
                    <TableCell colSpan={5}>
                      <div className="incident-details">
                        <Typography><b>Reporter: </b>{incident.assignedTo}</Typography>
                        <Typography><b>Date Created: </b>{incident.dateOfIncident}</Typography>
                        <Typography><b>Description: </b>{incident.incidentDescription}</Typography>
                        {incident.status === 'Open' && (
                          <div className="assign-section">
                            <InputLabel className="assign-label">Assign To:</InputLabel>
                            <Select
                              value={selectedStaff}
                              onChange={handleStaffSelect}
                            >
                              <MenuItem value="" disabled>Select staff</MenuItem>
                              {staffOptions.map((staff, index) => (
                                <MenuItem key={index} value={staff}>
                                  {staff}
                                </MenuItem>
                              ))}
                            </Select>
                            <Button variant="contained" onClick={() => assignStaff(incident.id)}>Assign</Button>
                          </div>
                        )}
                        {incident.status === 'Closed' && (
                          <div className="resolution-section">
                            <Typography><b>Resolution: </b>{incident.resolutionDescription}</Typography>
                            <Typography><b>Resolution Date: </b>{incident.resolutionDate}</Typography>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const IncidentDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <IncidentTable />
      </div>
    </div>
  );
};

export default IncidentDetails;


