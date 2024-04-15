// 

import React, { useState } from 'react';
import { Box, DialogTitle, DialogContent, DialogActions, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CourseState } from '../state/Counter';

const EditCourse = () => {
    const { id} = useParams();
  // const [courseData, setCourseData] = useState({
  //   title: '',
  //   description: '',
  //   price: '',
  //   imageLink: '',
  //   published: false,
  // });

  // Use useSetRecoilState for updating state
  const setCourseData = useSetRecoilState(CourseState);
  // Use useRecoilValue for reading state
  const courseData = useRecoilValue(CourseState);
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token'); 

    try {
      const response = await fetch(`${BASE_URL}/admin/courses/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update the course');
      }

      navigate('/courses');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError(error.message);
    }
  };


  return (
    <>

    
   

    <Box sx={{ maxWidth: 400, mx: "auto", my: 4, p: 3, mt: 6, border: '1px solid grey', borderRadius: '8px' }}>
      <DialogTitle>Edit Course</DialogTitle>
      <DialogContent>
       
        <TextField autoFocus margin="dense" id="title" name="title" label="Title" type="text" fullWidth variant="outlined" value={courseData.title} onChange={handleChange} />
        <TextField margin="dense" id="description" name="description" label="Description" type="text" fullWidth variant="outlined" value={courseData.description} onChange={handleChange} />
        <TextField margin="dense" id="price" name="price" label="Price" type="text" fullWidth variant="outlined" value={courseData.price} onChange={handleChange} />
        <TextField margin="dense" id="imageLink" name="imageLink" label="Image Link" type="text" fullWidth variant="outlined" value={courseData.imageLink} onChange={handleChange} />
        <FormControlLabel control={<Switch checked={courseData.published} onChange={handleChange} name="published" />} label="Published" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={() => navigate('/courses')}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Save Course</Button>
      </DialogActions>
    </Box>

    </>
  );
};

export default EditCourse;
