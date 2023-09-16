import React from 'react';
import { Link } from 'react-router-dom'; 
import './SupDash.css'; 
import Navbar from './Navibar.js';

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
  const incidents = [
    { title: 'Open Incidents', count: 5, color: '#52d0f0e7', status: 'Open' },
    { title: 'Closed Incidents', count: 10, color: '#52d0f0e7', status: 'Closed' },
    { title: 'In Progress', count: 3, color: '#52d0f0e7', status: 'In Progress' }
  ];

  const handleStatusClick = (status) => {
    // Navigate to the Incident Assignment page with the selected status
    window.location.href = `/admin/incident_assignment?status=${status}`;
  };

  return (
    <div>
      <Navbar />
      <div className='button'>
        {/* Use Link component to navigate to the Incident Assignment page with the filter */}
        <Link to={`/admin/incident_assignment?status=In Progress`} style={{ textDecoration: 'none' }}>
        
        </Link>
      </div>
      <div className="circle-row">
        {incidents.map((incident, index) => (
          <IncidentCircle
            key={index}
            title={incident.title}
            count={incident.count}
            color={incident.color}
            handleStatusClick={() => handleStatusClick(incident.status)}
          />
        ))}
      </div>
    </div>
  );
};

export default SupDash;