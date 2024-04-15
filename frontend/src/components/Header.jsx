// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import { useNavigate } from 'react-router-dom';


// function Header() {

//   const navigate = useNavigate();

//   const handleSignupClick = () => {
//     navigate('/signup'); 
//   };

//   const handleLoginClick=()=>{
//     navigate('/login')
//   }

  
//   return (
//     <AppBar position="static"  >
//       <Toolbar>
//         <Typography sx={{ flexGrow: 1 }}>
//           Course Lelo
//         </Typography>
//         <Stack direction="row" spacing={2} > 
//           <Button variant="contained" color="secondary" onClick={handleLoginClick}>Login</Button>
//           <Button variant="contained" color="secondary" onClick={handleSignupClick}>Signup</Button>
//         </Stack>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Header;





import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username'); // Assuming you save username on login

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('username'); // Clear username
    navigate('/login'); // Redirect to login
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 ,fontSize: '1.25rem' }}>
          Course Lelo
        </Typography>
        <Stack direction="row" spacing={2}>
          {token ? (
            <>
            <Typography sx={{ mt: 6, fontSize: '1.25rem' }}>{username}</Typography>

              <Button variant="contained" color="secondary" onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <Button variant="contained" color="secondary" onClick={() => navigate('/login')}>Login</Button>
              <Button variant="contained" color="secondary" onClick={() => navigate('/signup')}>Signup</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

