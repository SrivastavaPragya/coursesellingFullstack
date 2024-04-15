import React, { useState } from 'react';
import { Box, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      if (response.ok) {
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', credentials.username);
        navigate('/courses'); 
      } else {
        setError('Invalid username or password. Please try again or sign up.');
      }
    } catch (error) {
      setError('Login failed. Please try again later.');
    }
  };

  const handleCancelClick = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", my: 4, p: 3, mt:6, border: '1px solid grey', borderRadius: '8px' }}>
      <DialogTitle>Login</DialogTitle>
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
          value={credentials.username}
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
          value={credentials.password}
          onChange={handleChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handleCancelClick}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleLogin}>Login</Button>
      </DialogActions>
    </Box>
  );
};

export default Login;
