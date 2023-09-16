import React from 'react';
import './App.css'; // You can create this CSS file for styling
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthComponent } from './authComponent/AuthComponent';

function App() {
  return (
   <Router>
    <AuthComponent/>
  </Router>
  );
}

export default App;
