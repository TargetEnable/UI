import React from 'react';
import { Link } from 'react-router-dom'; 
import Button from '@mui/material/Button';
import './SupDash.css'; // You can import your CSS styles here
import Navbar from './Navibar.js';

const IncidentCircle = ({ count, title, color }) => {
  return (
    <div className="incident-circle">
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
    { title: 'Open Incidents', count: 5, color: '#52d0f0e7' },
    { title: 'Closed Incidents', count: 10, color: '#52d0f0e7' },
    { title: 'In Progress', count: 3, color: '#52d0f0e7' }
  ];

  return (
    <div>
    <Navbar/>
        <div className='button'>
        <Button variant="contained" href="/admin/incident_assignment">Incident Assignment</Button>
        </div>
      <div className="circle-row">
        {incidents.map((incident, index) => (
          <IncidentCircle
            key={index}
            title={incident.title}
            count={incident.count}
            color={incident.color}
          />
        ))}
      </div>
    </div>
    
  );
};

export default SupDash;