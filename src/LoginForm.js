import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from './services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Container,
  Typography,
  Paper,
  Grid,
} from '@mui/material';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    empType: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(loginData);
      const userEmail = loginData.email;
      const selectedEmpType = loginData.empType;

      if (selectedEmpType === 'admin') {
        navigate(`/admin/dashboard`);
      } else if (selectedEmpType === 'team') {
        navigate(`/employee/dashboard/${userEmail}`);
      } else if (selectedEmpType === 'support') {
        navigate(`/support/incident`);
      } else {
        toast.error('Please select an employee type.');
      }

      toast.success(response);
      setIsLoggedIn(true);
      localStorage.setItem('email', loginData.email);
      localStorage.setItem('role', loginData.empType);
    } catch (error) {
      console.error(error);
      toast.error('Invalid Credentials');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center" padding="50px">
        <Container component="main" maxWidth="xs">
          <Paper elevation={3} style={{ padding: 20, background: 'rgba(255, 255, 255, 0.7)' }}>
            <Typography variant="h5" style={{ marginBottom: 20, textAlign: 'center' }}><b>
              SIGN IN
              </b> </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                type="text"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />

              <TextField
                label="Password"
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />

              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel htmlFor="empType">Employee Type</InputLabel>
                <Select
                  id="empType"
                  name="empType"
                  value={loginData.empType}
                  onChange={handleInputChange}
                  label="Employee Type"
                  required
                >
                  <MenuItem value="">
                    <em>Select an employee type</em>
                  </MenuItem>
                  <MenuItem value="support">Support Staff</MenuItem>
                  <MenuItem value="team">Team Member</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>

              <Box mt={2} display="flex" justifyContent="center">
                <Button type="submit" variant="contained" color="primary" style={{ width: '100%' }}>
                  SIGN IN
                </Button>
              </Box>

              <Box mt={2} style={{ borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                <Typography variant="body2" style={{ marginTop: 10, textAlign: 'center' }}>
                  Don't have an account?&nbsp;&nbsp;
                  <Link to="/register" style={{ marginRight: 1, color: 'black' }}><b>
                    Register
                    </b></Link>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default LoginForm;
