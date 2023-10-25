import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Table, TableBody, TableCell, TableContainer, Typography, TableHead, TableRow, Paper, Select, FormControl, InputLabel, MenuItem, Button, TextareaAutosize, TextField, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Navbar from './Navibar.js';
import { format } from 'date-fns';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TablePagination from '@mui/material/TablePagination';

import { getAssignedIncident, getname, getnamegeneral } from './services/userService';

const rowsPerPage = 10;

const IncidentTable = () => {
  const [expandedIncidentId, setExpandedIncidentId] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [resolutionDescription, setResolutionDescription] = useState('');
  const [resolutionDate, setResolutionDate] = useState('');
  const [userName, setUserName] = useState('');
  const [reporterName, setReporterName] = useState({});
  const [isFilterExpanded, setFilterExpanded] = useState(false);
  const [filterBy, setFilterBy] = useState('incidentTitle');
  const [filterCondition, setFilterCondition] = useState('startsWith');
  const [filterValue, setFilterValue] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(0);

  const toggleFilterExpansion = () => {
    setFilterExpanded(!isFilterExpanded);
  };

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

  const fetchReporterName = async (email) => {
    try {
      const reporterName = await getnamegeneral(email);
      setReporterName((prevNames) => ({ ...prevNames, [email]: reporterName }));
    } catch (err) {
      console.error('Error fetching reporter name:', err);
      setReporterName((prevNames) => ({ ...prevNames, [email]: 'Unknown' }));
    }
  };

  useEffect(() => {
    // Fetch reporter names for all unique email addresses
    const uniqueEmails = [...new Set(incidents.map((incident) => incident.email))];
    uniqueEmails.forEach((email) => {
      if (!reporterName[email]) {
        fetchReporterName(email);
      }
    });
  }, [incidents, reporterName]);

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

  const applyFilter = (incident) => {
    if (filterBy && filterValue) {
      const columnValue = incident[filterBy];
      if (columnValue) {
        if (filterCondition === 'startsWith' && columnValue.startsWith(filterValue)) {
          return true;
        }
        if (filterCondition === 'endsWith' && columnValue.endsWith(filterValue)) {
          return true;
        }
        if (filterCondition === 'equals' && columnValue === filterValue) {
          return true;
        }
      }
      return false;
    }

    return true;
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const sortIncidents = (incidents) => {
    const sorted = [...incidents];
    if (sortDirection === 'asc') {
      sorted.sort((a, b) => a.incidentTitle.localeCompare(b.incidentTitle));
    } else {
      sorted.sort((a, b) => b.incidentTitle.localeCompare(a.incidentTitle));
    }
    return sorted;
  };

  const filteredIncidents = incidents.filter(
    (incident) => selectedStatus === 'All' || incident.status === selectedStatus
  );

  const sortedIncidents = sortIncidents(filteredIncidents);

  const renderFilterOptions = () => {
    if (isFilterExpanded) {
      return (
        <div className="filter-options">
          <FormControl>
            <InputLabel htmlFor="filter-by">Filter By</InputLabel>
            <Select
              id="filter-by"
              value={filterBy}
              onChange={(event) => setFilterBy(event.target.value)}
            >
              <MenuItem value="incidentTitle">Incident Title</MenuItem>
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="dateOfIncident">Date Reported</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
              {/* Add more filter options here as needed */}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="filter-condition">Filter Condition</InputLabel>
            <Select
              id="filter-condition"
              value={filterCondition}
              onChange={(event) => setFilterCondition(event.target.value)}
            >
              <MenuItem value="startsWith">Starts with</MenuItem>
              <MenuItem value="endsWith">Ends with</MenuItem>
              <MenuItem value="equals">Equals</MenuItem>
              {/* Add more filter conditions here as needed */}
            </Select>
          </FormControl>
          <TextField
            id="filter-value"
            label="Filter Value"
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
          />
        </div>
      );
    }
    return null;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      <div className="filter-container">
        <IconButton onClick={toggleFilterExpansion} style={{ position: '2.0em', left: 0, zIndex: 1 }}>
          <FilterListIcon />
        </IconButton>
        <Typography variant="h4" style={{ textAlign: 'center', marginTop: '1.5em' }}>
          Reported Incidents
        </Typography>
        <div className="filter-header">
          {renderFilterOptions()}
          {/* <span
            className="sort-arrow"
            onClick={toggleSortDirection}
          >
            {sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </span> */}
        </div>
      </div>
      {/* <FormControl>
        <Select value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value)}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Incident title</TableCell>
              <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Date reported</TableCell>
              <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Priority</TableCell>
              {selectedStatus === 'Closed' && (
                <>
                  <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Resolution</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Resolution Date</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedIncidents
              .filter(applyFilter)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Apply pagination
              .map((incident) => (
                <React.Fragment key={incident.id}>
                  <TableRow onClick={() => toggleExpand(incident.id)}>
                    <TableCell>{incident.incidentTitle}</TableCell>
                    <TableCell>{incident.status}</TableCell>
                    <TableCell>{format(new Date(incident.dateOfIncident), 'dd/MM/yyyy hh:mm:ss a')}</TableCell>
                    <TableCell>
                      <span className={`priority-indicator ${incident.priority.toLowerCase()}`}>
                        {incident.priority}
                      </span>
                    </TableCell>
                    {selectedStatus === 'Closed' && (
                      <>
                        <TableCell>{incident.resolutionDescription}</TableCell>
                        <TableCell>{format(new Date(incident.resolutionDate), 'dd/MM/yyyy hh:mm:ss a')}</TableCell>
                      </>
                    )}
                  </TableRow>
                  {expandedIncidentId === incident.id && (
                    <TableRow className="expanded-row">
                      <TableCell colSpan="6">
                        <div className="incident-details">
                          <p>
                            <b>Reporter: </b>
                            {reporterName[incident.email] || 'Loading...'}
                          </p>
                          <p>
                            <b>Date Created: </b>
                            {format(new Date(incident.dateOfIncident), 'dd/MM/yyyy hh:mm:ss a')}
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
      <TablePagination
        component="div"
        count={sortedIncidents.filter(applyFilter).length} // Total number of incidents after filtering
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
      />
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
