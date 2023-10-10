import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Navbar from './Navibar.js';
import './login.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { getIncidentCountsByEmail, getname } from './services/userService';

function Dashboard() {
  const email = localStorage.getItem('email');
  const [name, setName] = useState('');

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '10vh',
    marginTop: '20px',
    marginLeft: '100px',
  };

  const [incidentCounts, setIncidentCounts] = useState({
    openCount: 0,
    closedCount: 0,
    inProgressCount: 0,
  });

  useEffect(() => {
    // Fetch the employee's name
    getname(email)
      .then((data) => {
        setName(data); // Set the employee's name in the state
      })
      .catch((error) => {
        console.error('Error fetching employee name:', error);
      });

    // Fetch incident counts
    getIncidentCountsByEmail(email)
      .then((data) => {
        setIncidentCounts(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [email]);

  return (
    <div>
      <Navbar />

      <div style={containerStyle}>
        <center>
          <h1>Welcome to Dashboard!</h1>
          <p>Welcome, {name}!</p> {/* Display the employee's name here */}
     
          <div className="pie-chart">
            <PieChart
              series={[
                {
                  innerRadius: 60,
                  outerRadius: 150,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -180,
                  endAngle: 180,
                  cx: 160,
                  cy: 145,
                  data: [
                    { id: 0, value: incidentCounts.openCount, color: '#ff4435', label: 'Open' },
                    { id: 1, value: incidentCounts.closedCount, color: '#d22928', label: 'Closed' },
                    { id: 2, value: incidentCounts.inProgressCount, color: '#c41a1a', label: 'Inprogress' },
                  ],
                },
              ]}
              width={500}
              height={350}
            />
          </div>
        </center>
      </div>

      <div className="page-content">
        <div className="banner"></div>
      </div>
    </div>
  );
}

export default Dashboard;
