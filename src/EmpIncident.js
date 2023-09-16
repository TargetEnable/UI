import React, { useState, useEffect } from 'react';
import { getAssignedIncident, getname } from './services/userService';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Table, TableBody, TableCell, TableContainer, Typography,TableHead, TableRow, Paper, Select, FormControl, InputLabel, MenuItem, Button, TextareaAutosize, TextField } from '@mui/material';
import Navbar from './Navibar.js';
import './EmpIncident.css';

const IncidentTable = () => {
  const [expandedIncidentId, setExpandedIncidentId] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [resolutionDescription, setResolutionDescription] = useState('');
  const [resolutionDate, setResolutionDate] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const email = localStorage.getItem('email');

    async function fetchData() {
      try {
        const name = await getname(email);
        setUserName(name);

        const data = await getAssignedIncident(name);
        setIncidents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [selectedStatus]);

  const toggleExpand = (incidentId) => {
    setExpandedIncidentId((prevExpandedIncidentId) =>
      prevExpandedIncidentId === incidentId ? null : incidentId
    );
  };

  const handleResolutionChange = (event) => {
    setResolutionDescription(event.target.value);
  };

  const handleResolutionDateChange = (event) => {
    setResolutionDate(event.target.value);
  };

  const updateIncident = (incidentId, updatedIncidentData) => {
    Axios.patch(`http://localhost:8008/incidents/support/${incidentId}`, updatedIncidentData)
      .then((response) => {
        // Handle the successful response (e.g., show a success message)
        console.log('Incident updated successfully:', response.data);
        toast.success('Incident updated successfully.');
      })
      .catch((error) => {
        // Handle errors (e.g., display an error message)
        console.error('Error updating incident:', error);
        toast.error('Error updating incident. Please try again.');
      });
  };

  const completeIncident = (incidentId) => {
    if (resolutionDescription.trim() === '' || resolutionDate.trim() === '') {
      toast.error('Please enter both resolution and resolution date before completing the incident.');
      return;
    }
    const updatedIncidentData = {
      status: 'Closed',
      resolutionDescription: resolutionDescription,
      resolutionDate: resolutionDate,
    };

    // Call the updateIncident function to send the PATCH request
    updateIncident(incidentId, updatedIncidentData);

    const updatedIncidents = incidents.map((incident) => {
      if (incident.id === incidentId && incident.status === 'In Progress') {
        return {
          ...incident,
          status: 'Closed',
          resolutionDescription: resolutionDescription,
          resolutionDate: resolutionDate,
        };
      }
      return incident;
    });
    setIncidents(updatedIncidents);
    setResolutionDescription('');
    setResolutionDate('');
    toast.success('Incident completed successfully.');
  };

  const filteredIncidents = incidents.filter(
    (incident) => selectedStatus === 'All' || incident.status === selectedStatus
  );

  const sortedIncidents = filteredIncidents.sort((a, b) => {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };

    const priorityComparison = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityComparison !== 0) {
      return priorityComparison;
    }

    const statusComparison = b.status.localeCompare(a.status);
    if (statusComparison !== 0) {
      return statusComparison;
    }

    return new Date(a.dateOfIncident) - new Date(b.dateOfIncident);
  });

  return (
    <Container>
      <Typography variant="h4" style={{ textAlign: 'center', marginTop: '1.5em' }}>
        Reported Incidents
      </Typography>
      <FormControl>
        <Select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Incident title</TableCell>
              <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Date reported</TableCell>
              <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Priority</TableCell>
              {selectedStatus === 'Closed' && (
                <>
                  <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Resolution</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Resolution Date</TableCell>
                </>
              )}
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
                  {selectedStatus === 'Closed' && (
                    <>
                      <TableCell>{incident.resolutionDescription}</TableCell>
                      <TableCell>{incident.resolutionDate}</TableCell>
                    </>
                  )}
                </TableRow>
                {expandedIncidentId === incident.id && (
                  <TableRow className="expanded-row">
                    <TableCell colSpan="6">
                      <div className="incident-details">
                        <p>
                          <b>Reporter: </b>
                          {incident.assignedTo}
                        </p>
                        <p>
                          <b>Date Created: </b>
                          {incident.dateOfIncident}
                        </p>
                        <p>
                          <b>Description: </b>
                          {incident.incidentDescription}
                        </p>
                        {incident.status === 'In Progress' && (
                          <div className="complete-section">
                            <InputLabel>Resolution:</InputLabel>
                            <TextareaAutosize
                              rowsMin={3}
                              value={resolutionDescription}
                              onChange={handleResolutionChange}
                              placeholder="Enter resolution"
                            />
                            <InputLabel>Resolution Date:</InputLabel>
                            <TextField
                              type="date"
                              value={resolutionDate}
                              onChange={handleResolutionDateChange}
                            />
                            <Button onClick={() => completeIncident(incident.id)}>Complete</Button>
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
    </Container>
  );
};

const Incident = () => {
  return (
    <div className='navbar'>
      <Navbar />
      <Container>
        <IncidentTable />
      </Container>
    </div>
  );
};

export default Incident;
