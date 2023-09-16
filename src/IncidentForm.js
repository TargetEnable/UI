import React, { useState } from 'react';
import { submitIncident } from "./services/userService";
import Navbar from './Navibar.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Typography, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid, Box } from '@mui/material';

const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000); // Adjust the range as needed
};
const IncidentForm = () => {
  const email = localStorage.getItem('email');
  const [data, setFormData] = useState({
    email: email,
    id: generateUniqueId(),
    incidentTitle: "",
    incidentDescription: "",
    location: "",
    cubicle: "",
    category: "",
    priority: "",
    status: "Open",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    submitIncident(data)
      .then((resp) => {
        console.log(resp);
        console.log("Submitted Successfully");
        toast.success("Submitted Successfully !");
        window.location.href = '/employee/dashboard/:email';
      })
      .catch((error) => {
        console.log(error);
        console.log("Error submitting incident");
        toast.error("Error submitting incident");
      });
  };
  

  return (
    <div>
      <Navbar />
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 64px)" padding="20px">
        <Container component="main" maxWidth="md">
          <Paper elevation={3} style={{ padding: 20, background: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h5" style={{ marginBottom: 20, textAlign: 'center' }}>
              Incident Request Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Incident Title"
                    name="incidentTitle"
                    value={data.incidentTitle}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows={3}
                    label="Incident Description"
                    name="incidentDescription"
                    value={data.incidentDescription}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Location"
                    name="location"
                    value={data.location}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Cubicle"
                    name="cubicle"
                    value={data.cubicle}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth required>
                    <InputLabel>Category/Type</InputLabel>
                    <Select
                      label="Category/Type"
                      name="category"
                      value={data.category}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="">
                        <em>Select category</em>
                      </MenuItem>
                      <MenuItem value="Building">Building</MenuItem>
                      <MenuItem value="Pantry">Pantry</MenuItem>
                      <MenuItem value="Sanitary">Sanitary</MenuItem>
                      <MenuItem value="Desk">Desk</MenuItem>
                      <MenuItem value="HouseKeeping">HouseKeeping</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" fullWidth required>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      label="Priority"
                      name="priority"
                      value={data.priority}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="">
                        <em>Select Priority</em>
                      </MenuItem>
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 20, width: '50%', fontSize: '14px' }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default IncidentForm;