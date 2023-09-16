import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Link } from 'react-router-dom';
import { register } from './services/userService';
import { toast } from 'react-toastify';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Container, Typography, CssBaseline, Paper } from '@mui/material';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    empId: '',
    empType: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let parsedValue = value;

    if (name === 'empId') {
      // Check if the value is a valid number
      if (!isNaN(value) && value !== '') {
        parsedValue = parseInt(value);
      } else {
        parsedValue = ''; // Clear the value if it's not a valid number
      }
    }

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your form submission logic here
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return; // Prevent further execution
    }

    const hashedPassword = bcrypt.hashSync(formData.password, 10);
    try {
      const response = await register({ ...formData, password: hashedPassword });
      console.log(hashedPassword);
      console.log(response);
       // This will log the response data from the backend

      // Handle success
      toast.success(response);
      window.location.href = '/';

    } catch (error) {
      console.error(error); // Log the error for debugging

      // Handle error
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred during registration');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" style={{ marginBottom: 20 }}>
          Registration Form
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            type="number"
            id="empId"
            name="empId"
            label="Employee ID"
            value={formData.empId}
            onChange={handleInputChange}
          />
          <FormControl variant="outlined" fullWidth margin="dense" required>
            <InputLabel htmlFor="empType">Employee Type</InputLabel>
            <Select
              labelId="empType-label"
              id="empType"
              name="empType"
              value={formData.empType}
              onChange={handleInputChange}
              label="Employee Type"
            >
              <MenuItem value="">
                <em>Select an employee type</em>
              </MenuItem>
              <MenuItem value="support">Support Staff</MenuItem>
              <MenuItem value="team">Team Member</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            type="password"
            id="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            Register
          </Button>
        </form>
        <Link to="/" style={{ marginTop: 20, color: 'black' }}>Already have an account? <b>Login here</b></Link>
      </Paper>
    </Container>
  );
};

export default RegistrationForm