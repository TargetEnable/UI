import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getIncidentList } from './services/userService';
import { DataGrid } from '@mui/x-data-grid';
import {
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import Navbar from './Navibar.js';

function IncidentList() {
  const location = useLocation();
  const [incidentData, setIncidentData] = useState([]);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

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

  const handleSort = (column) => {
    const sortedData = [...incidentData].sort((a, b) => {
      const valueA = a[column].toUpperCase();
      const valueB = b[column].toUpperCase();
      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
    setIncidentData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const columns = [
    { field: 'incidentTitle', headerName: 'Incident Title', width: 200 },
    { field: 'location', headerName: 'Location', width: 80 },
    { field: 'cubicle', headerName: 'Cubicle', width: 80 },
    { field: 'dateOfIncident', headerName: 'Date Created', width: 280 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'priority', headerName: 'Priority', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'assignedTo', headerName: 'Assigned staff', width: 200 },
    { field: 'resolutionDescription', headerName: 'Resolution', width: 200 }, // Added resolution field
    { field: 'resolutionDate', headerName: 'Resolution Date', width: 280 }, // Added resolutionDate field
  ];

  return (
    <div>
      <Navbar />
      <Typography variant="h4" style={{ textAlign: 'center', marginTop: '60px' }}>
        Incident List
      </Typography>
      {/* <div>
        {/* <Select
          label="Filter by Status"
          value={filterStatus}
          onChange={handleFilterChange}
          style={{ marginLeft: '72px' }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
        </Select> 
      </div> */}
     {error ? (
        <Typography color="error">Error: {error.message}</Typography>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ width: '100%', maxWidth: '1200px' }}>
            <DataGrid
              rows={incidentData}
              columns={columns}
              pageSize={5}
              sortModel={[
                {
                  field: 'incidentTitle',
                  sort: sortOrder,
                },
              ]}
              onSortModelChange={(params) => {
                // Check if params.sortModel is defined and not empty
                if (params.sortModel && params.sortModel.length > 0) {
                  const sortModel = params.sortModel[0];
                  handleSort(sortModel.field);
                }
              }}
              autoHeight
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default IncidentList;