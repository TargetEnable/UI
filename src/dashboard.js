import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Navbar from './Navibar.js';
import './login.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { getIncidentCountsByEmail, getname, getEmployeeIncidentPriorityCounts } from './services/userService';

function Dashboard() {
  const email = localStorage.getItem('email');
  //const name = localStorage.getItem('name');
  const [name, setName] = useState('');

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '10vh',
    marginTop: '20px',
    marginLeft: '100px',
  };

  const pieChartContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px',
    marginRight: '40px',
  };

  const pieChartStyle = {
    marginRight: '100px', // Add spacing between the PieCharts
  };
  

  const [incidentCounts, setIncidentCounts] = useState({
    openCount: 0,
    closedCount: 0,
    inProgressCount: 0,
  });

  const [employeePriorityCounts, setEmployeePriorityCounts] = useState({
    High: 0, // Corrected capitalization to match your data
    Medium: 0,
    Low: 0,
  });

  const [noIncidentsReported, setNoIncidentsReported] = useState(false);

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

        // Check if the employee hasn't reported any incidents
        if (data.openCount === 0 && data.closedCount === 0 && data.inProgressCount === 0) {
          setNoIncidentsReported(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });


    getEmployeeIncidentPriorityCounts(email)
      .then((data) => {
        setEmployeePriorityCounts(data);
      })
      .catch((error) => {
        console.error('Error fetching employee incident priority counts:', error);
      });
  }, [email]);


  return (
    <div>
      <Navbar />

      <div style={containerStyle}>
        <h1>Welcome, {name}!</h1>

        
        {noIncidentsReported ? (

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '15rem 0' }}>
          <h1>No incidents reported yet...</h1>
          </div>
          
        ) : (
        <div style={pieChartContainerStyle}>
          <div style={pieChartStyle}>
            <PieChart
              series={[
                {
                  innerRadius: 80,
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
              height={300}
            />
          </div>

          <div style={pieChartStyle}>
            <PieChart
              series={[
                {
                  innerRadius: 80,
                  outerRadius: 150,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -180,
                  endAngle: 180,
                  cx: 160,
                  cy: 145,
                  data: [
                    { id: 0, value: employeePriorityCounts.High, color: '#ff4435', label: 'High' },
                    { id: 1, value: employeePriorityCounts.Medium, color: '#d22928', label: 'Medium' },
                    { id: 2, value: employeePriorityCounts.Low, color: '#c41a1a', label: 'Low' },
                  ],
                },
              ]}
              width={500}
              height={300}
            />
          </div>
          
        </div>
        )}
      </div>

      <div className="page-content">
        <div className="banner"></div>
      </div>
    </div>
  );
}

export default Dashboard;


