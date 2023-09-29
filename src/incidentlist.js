import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getIncidentList } from './services/userService';
import Navbar from './Navibar.js';
import { format } from 'date-fns';


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';


function IncidentList() {
  const location = useLocation();
  const [incidentData, setIncidentData] = useState([]);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedIncidentId, setExpandedIncidentId] = useState(null);
  

  useEffect(() => {
    const fetchIncidentData = async () => {
      try {
        const email = localStorage.getItem('email');
        if (email) {
          const data = await getIncidentList(email);
          setIncidentData(data);
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchIncidentData();
  }, [location.state]);

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const toggleExpand = (incidentId) => {
    setExpandedIncidentId(expandedIncidentId === incidentId ? null : incidentId);
  };

  const assignSupportStaff = async (incidentId) => {
    // Logic to display the assigned support staff for "In Progress" and "Closed" incidents
    toggleExpand(incidentId); // Toggle the expansion to show the details
  };

  const filteredIncidentData = incidentData.filter((incident) => {
    if (filterStatus === 'All') {
      return true;
    }
    return incident.status === filterStatus;
  });

  return (
    <div>
      <Navbar />
      

      <Typography variant="h4" style={{ textAlign: 'center' , marginTop: '60px' }}>
        Incident List
      </Typography>
      <div >
      <Select
  label="Filter by Status"
  value={filterStatus}
  onChange={handleFilterChange}
  style={{ marginLeft: '72px' }} // Add margin to move the dropdown away from the margin
>
  <MenuItem value="All">All</MenuItem>
  <MenuItem value="Open">Open</MenuItem>
  <MenuItem value="Closed">Closed</MenuItem>
  <MenuItem value="In Progress">In Progress</MenuItem>
</Select>
      </div>
      {error ? (
        <Typography color="error">Error: {error.message}</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: '90%', margin: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Incident Title</TableCell>
                <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Cubicle</TableCell>
                <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Priority</TableCell>
                <TableCell sx={{ fontSize: '1.1rem',fontWeight: 'bold' }}>Assigned staff</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIncidentData.map((incident) => (
                <React.Fragment key={incident.id}>
                   <TableRow onClick={() => toggleExpand(incident.id)}>
                  <TableCell>{incident.incidentTitle}</TableCell>
                  <TableCell>{incident.location}</TableCell>
                  <TableCell>{incident.cubicle}</TableCell>
                  <TableCell>{incident.category}</TableCell>
                  <TableCell><span className={`priority-indicator ${incident.priority.toLowerCase()}`}>
                        {incident.priority}
                      </span></TableCell>
                  <TableCell>{incident.assignedTo || 'Not Assigned'}</TableCell>

                </TableRow>
                {expandedIncidentId === incident.id && (
                  <TableRow className="expanded-row">
                    <TableCell colSpan={6}>
                      <div className="incident-details">
                        <Typography><b>Date Created : </b>{format(new Date(incident.dateOfIncident), 'dd/MM/yyyy hh:mm:ss a')}</Typography>
                        <Typography><b>Incident Description : </b>{incident.incidentDescription}</Typography>
                        {incident.status === 'Open' && (
                          <div className="assign-section">
                            {/* Display details for Open incidents */}
                          </div>
                        )}
                        {incident.status === 'In Progress' && (
                          <div className="assign-section">
                          </div>
                        )}
                        {incident.status === 'Closed' && (
                          <div className="resolution-section">
                            <Typography><b>Resolution Date : </b>{format(new Date(incident.resolutionDate), 'dd/MM/yyyy hh:mm:ss a')}</Typography>
                            <Typography><b>Resolution Description : </b>{incident.resolutionDescription}</Typography>
                            {/* Display details for Closed incidents */}
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
      )}
    </div>
  );
}

export default IncidentList;


