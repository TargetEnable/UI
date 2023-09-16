import React from 'react';
import './dashboard.css';
import Navbar from './Navibar.js';
import './login.css';

function Dashboard() {
  const email = localStorage.getItem('email');

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Ensure the container takes up the full viewport height
  };
  

  console.log(email);//parameters from login form
  return (
    <div>
       <Navbar />
                    
                     
    <div style={containerStyle}>
      <h1>Welcome to Dashboard!</h1>
      <p>Welcome, {email}!</p>
      </div>
      
    <div className="page-content">
    <div className="banner" >
    
        </div>
       
      </div>  
    </div>
  
  
  );
}

export default Dashboard;