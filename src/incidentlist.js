import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Navbar from './Navibar.js';
import './SupIncident.css';
import { getIncidents, getsupport, getnamegeneral } from './services/userService';
import { format } from 'date-fns';

const rowsPerPage = 10;

const IncidentList = () => {
  const [expandedIncidentId, setExpandedIncidentId] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [staffOptions, setStaffOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
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
    const params = new URLSearchParams(window.location.search);
    const selectedStatusParam = params.get('status');

    setSelectedStatus(selectedStatusParam || 'All');
    getIncidents()
      .then((data) => {
        setIncidents(data);

        data.forEach((incident) => {
          fetchReporterName(incident.email);
        });
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

  const toggleExpand = (incidentId) => {
    setExpandedIncidentId(expandedIncidentId === incidentId ? null : incidentId);
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

  const getAssignedStaff = (incident) => {
    if (incident.status === 'Open') {
      return 'Not Assigned';
    } else {
      return incident.assignedTo;
    }
  };

  const filteredIncidents = incidents.filter((incident) => selectedStatus === 'All' || incident.status === selectedStatus);

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
              <MenuItem value="assignedTo">Assigned Staff</MenuItem>
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
    <div>
      <Navbar />
      <div className="filter-container">
        <IconButton onClick={toggleFilterExpansion} style={{ position: 'absolute', left: 0, zIndex: 1 }}>
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
      <div style={{ margin: '0 auto', maxWidth: '1000px', padding: '0 16px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  Incident title
                </TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Date reported</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Priority</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Assigned staff</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedIncidents
                .filter(applyFilter)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                      <TableCell>
                        {getAssignedStaff(incident)}
                      </TableCell>
                    </TableRow>
                    {expandedIncidentId === incident.id && (
                      <TableRow className="expanded-row">
                        <TableCell colSpan={5}>
                          <div className="incident-details">
                            <Typography><b>Reporter: </b>{reporterName[incident.email] || 'Loading...'}</Typography>
                            <Typography><b>Date Created: </b>{format(new Date(incident.dateOfIncident), 'dd/MM/yyyy hh:mm:ss a')}</Typography>
                            <Typography><b>Incident Description: </b>{incident.incidentDescription}</Typography>
                            {incident.status === 'Closed' && (
                              <div className="resolution-section">
                                <Typography><b>Resolution: </b>{incident.resolutionDescription}</Typography>
                                <Typography><b>Resolution Date: </b>{format(new Date(incident.resolutionDate), 'dd/MM/yyyy hh:mm:ss a')}</Typography>
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
      <TablePagination
        component="div"
        count={sortedIncidents.filter(applyFilter).length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default IncidentList;