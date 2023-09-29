import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Navbar from './Navibar.js';
import './login.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { getIncidentCountsByEmail } from './services/userService';

function Dashboard() {
  const email = localStorage.getItem('email');

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    //alignItems: 'center',
    justifyContent: 'center',
     minHeight: '10vh',// Ensure the container takes up the full viewport height
     marginTop: '20px',
     marginLeft: '100px',
  };

  const [incidentCounts, setIncidentCounts]= useState({
    openCount: 0,
    closedCount: 0,
    inProgressCount: 0
  });
  
  useEffect(() => {
    
    getIncidentCountsByEmail(email)
      .then((data) => {
        
        // Update the state with the fetched data
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
      <h1>Welcome to Dashboard!</h1>
      <p>Welcome, {email}!</p>
      
      <center>
      <PieChart
      series={[
        {
          data: [
            { id: 0, value: incidentCounts.openCount, label: 'Open' },
            { id: 1, value: incidentCounts.closedCount, label: 'Closed' },
            { id: 2, value: incidentCounts.inProgressCount, label: 'In-Progress' },
          ],
        },
      ]}
      width={600}
      height={400}
    
      
    /></center></div>
 
    <div className="page-content">
    <div className="banner" >
    
       </div>
       
      </div>  
    </div>
  
  
  );
}

export default Dashboard; 