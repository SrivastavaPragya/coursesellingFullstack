// import React, { useState, useEffect } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
// import { BASE_URL } from '../config'; // Make sure this is correctly pointing to your API URL
// import { useNavigate } from 'react-router-dom';

// const Course = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate=useNavigate()



//   const handleAddCourse=()=>{
//     navigate('/addCourse')
//   }

//   useEffect(() => {
//     const fetchCourses = async () => {
//       const token = localStorage.getItem('token');
      
//       try {
//         const response = await fetch(`${BASE_URL}/admin/courses`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log(data.courses)
//         setCourses(data.courses);
//       } catch (error) {
//         console.error('There was a problem with the fetch operation:', error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleDeleteCourse = async (courseId) => {

//     const token = localStorage.getItem('token');

//     try {
//       const response = await fetch(`${BASE_URL}/admin/courses/${courseId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete the course');
//       }

//       // On successful delete, remove the course from the state to update UI
//       const updatedCourses = courses.filter(course => course._id !== courseId);
//       setCourses(updatedCourses);
//     } catch (error) {
//       console.error('There was a problem with the delete operation:', error);
//     }
//   };


//   return (
//     <Grid container spacing={4} justifyContent="center">
//       {courses.map((course) => ( // Using course._id as the key for mapping
//         <Grid item xs={12} sm={6} md={4} key={course._id}>
//           <Card sx={{ maxWidth: 345, mt: 4, ml: 3 }}>
//             <CardActionArea>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={course.imageLink || "/static/images/cards/default-image.jpg"}
//                 alt={course.title}
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {course.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {course.description}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//             <CardActions>
//               <Button variant="contained" color="secondary" onClick={()=>{navigate(`${course._id}`)} }>Edit Course</Button>
//               <Button variant="contained" color="secondary" onClick={() => handleDeleteCourse(course._id)}>Delete Course</Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       ))}
//        <Button variant="contained" color="secondary" sx={{mt:6}} onClick={handleAddCourse}>Add course</Button>
//     </Grid>
//   );
// };

// export default Course;





// 

import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { CourseState } from '../state/Counter';
import { BASE_URL } from '../config';

const Course = () => {
  const navigate = useNavigate();

  // Separate hooks for setting and reading Recoil state
  const setCourseData = useSetRecoilState(CourseState);
  const courseData = useRecoilValue(CourseState);

  const handleAddCourse = () => {
    navigate('/addCourse');
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await fetch(`${BASE_URL}/admin/courses`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
       
        // Assuming data.courses is the array of course objects you received
        console.log(data.courses)
        if (Array.isArray(data.courses)) { 
          setCourseData(data.courses);
        } else {
          console.error('Expected an array of courses, received:', data.courses);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchCourses();
  }, [setCourseData]);

  const handleDeleteCourse = async (courseId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${BASE_URL}/admin/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the course');
      }

      // On successful delete, update the courses array to reflect this change
      setCourseData(courseData.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
  };

  return (
    <Grid container spacing={4} justifyContent="center">
      { courseData.length>0 && courseData.map((course) => (
        <Grid item xs={12} sm={6} md={4} key={course._id}>
          <Card sx={{ maxWidth: 345, mt: 4, ml: 3 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={course.imageLink || "/static/images/cards/default-image.jpg"}
                alt={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button variant="contained" color="secondary" onClick={() => navigate(`/editCourse/${course._id}`)}>Edit Course</Button>
              <Button variant="contained" color="secondary" onClick={() => handleDeleteCourse(course._id)}>Delete Course</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
       <Button variant="contained" color="secondary" sx={{ mt: 6 }} onClick={handleAddCourse}>Add Course</Button>
    </Grid>
  );
};

export default Course;

