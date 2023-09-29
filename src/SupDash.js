import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SupDash.css'; // You can import your CSS styles here
import Navbar from './Navibar.js';
import { getCount } from './services/userService';

const IncidentCircle = ({ count, title, color, handleStatusClick }) => {
  return (
    <div className="incident-circle" onClick={handleStatusClick}>
      <div className="white-square">
        <div className="incident-count" style={{ backgroundColor: color }}>
          {count}
        </div>
      </div>
      <div className="white-title-square">
        <div className="incident-title">{title}</div>
      </div>
    </div>
  );
};

const SupDash = () => {
  const [incidentCounts, setIncidentCounts] = useState({});

  const handleStatusClick = (status) => {
    // Check if the provided status is one of the available options
  const validStatusOptions = ['All', 'Open', 'In Progress', 'Closed'];
  const selectedStatus = validStatusOptions.includes(status) ? status : 'All';

  // Navigate to the Incident Assignment page with the selected status
  window.location.href = `/admin/incident_assignment?status=${selectedStatus}`;
  };

  useEffect(() => {

    getCount()
      .then((data) => {
        // Update the state with the fetched data
        setIncidentCounts(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    
  }, []);
  
  return (
    <div>
      <Navbar />
      <div className="button">
        {/* Use Link component to navigate to the Incident Assignment page with the filter */}
        <Link to={`/admin/incident_assignment?status=In Progress`} style={{ textDecoration: 'none' }}>
          {/* Add any content inside the Link component if needed */}
        </Link>
      </div>
      <div className="circle-row">
        <IncidentCircle
          title="Open Incidents"
          count={incidentCounts.openCount || 0} // Initialize with 0, but update when available
          color="#52d0f0e7"
          handleStatusClick={() => handleStatusClick('Open')}
        />
        <IncidentCircle
          title="Closed Incidents"
          count={incidentCounts.closedCount || 0} // Initialize with 0, but update when available
          color="#52d0f0e7"
          handleStatusClick={() => handleStatusClick('Closed')}
        />
        <IncidentCircle
          title="In Progress"
          count={incidentCounts.inProgressCount || 0} // Initialize with 0, but update when available
          color="#52d0f0e7"
          handleStatusClick={() => handleStatusClick('In Progress')}
        />
      </div>
    </div>
  );
};

export default SupDash;