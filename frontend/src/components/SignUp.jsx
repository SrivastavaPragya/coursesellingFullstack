import React, { useState } from 'react';
import { Box, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', // Changed from name to username
    password: ''
  });
  const [error, setError] = useState(''); // For error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value // Here name corresponds to the name attribute of the TextField
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username, // Make sure to send username instead of name
          password: formData.password
        })
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/login'); // Redirect to the login page if signup was successful
      } else {
        throw new Error(data.message || 'Failed to sign up'); 
      }
    } catch (error) {
      setError(error.message);
      alert(error.message); // Show an alert with the error message
    }
  };

  const handleCancelClick = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", my: 4, p: 3, mt: 6, border: '1px solid grey', borderRadius: '8px' }}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          name="username" 
          label="Username" 
          type="text"
          fullWidth
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handleCancelClick}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>Sign Up</Button>
      </DialogActions>
    </Box>
  );
};

export default SignUp;
