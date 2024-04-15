// HomePage.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
      navigate('/signup'); 
    };
  
    const handleLoginClick=()=>{
      navigate('/login')
    }

  return (
    <Box component="section" sx={{ p: 2, mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h1" gutterBottom sx={{ color: 'purple' }}>
        Join Our Community
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ color: 'blue' }}>
        Explore Our Courses
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={handleLoginClick} >Login</Button>
        <Button variant="contained" color="secondary" onClick={handleSignupClick}>Signup</Button>
      </Stack>

    </Box>
  );
}

export default HomePage;


