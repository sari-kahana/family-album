// import Avatar from '@mui/material/Avatar';
// import { emptyUser, UserContext } from './UserContext';
// import { Button, Stack, Typography } from '@mui/material';
// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';


// const Connected = () => {

//     const navigate = useNavigate();
   
//     function stringAvatar(name: string) {
//         return {
//             sx: {
//                 bgcolor: 'primary.dark',
//             },
//             children: `${name.split(' ')[0][0]}`
//         };
//     }

//     const { user, dispatch } = useContext(UserContext)
//     console.log(user);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('formData');
//         dispatch({ type: 'LOGOUT', data: user }); // אם יש לך תמיכה ב-logout בקונטקסט
//         navigate('/'); // או כל עמוד שתרצי להפנות אליו אחרי היציאה
//       };

//     return (<>
//         <Button component={Link} to="albums">My Gallery</Button> 

//         <Stack direction="column" spacing={2} sx={{ position: "fixed", top: 10, left:10}}>
//             <Avatar {...stringAvatar(user.name)} />
//             <Typography
//           sx={{
//             color: 'primary.light',
//           }}
//         >
//           {user.name}
//         </Typography>
//             <Button variant="outlined" color="error" onClick={handleLogout}>
//         התנתק
//       </Button>
//         </Stack>
//     </>)

// }
// export default Connected;
  

import Avatar from '@mui/material/Avatar';
import { UserContext } from './UserContext';
import { Button, Menu, MenuItem, Typography, IconButton, Tooltip, Stack, ListItemIcon, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Connected = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('formData');
    dispatch({ type: 'LOGOUT', data: user });
    navigate('/');
  };

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: 'primary.dark',
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  return (
    <>
      <Button component={Link} to="/collages">עיצוב קולאז</Button>
      <Button component={Link} to="/albums">My Gallery</Button>
      <Stack direction="column" spacing={2} sx={{ position: "fixed", top: 10, left: 10 }}>
        <Tooltip title="פרטי משתמש">
          <IconButton onClick={handleClick} size="small" sx={{ p: 0 }}>
            <Avatar {...stringAvatar(user.name)} />
          </IconButton>
        </Tooltip>
                 <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 180,
              borderRadius: 2,
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem disabled>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">{user.name}</Typography>
          </MenuItem>
  
          <Divider />
  
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            התנתק
          </MenuItem>
        </Menu>
      </Stack>
    </>
  );
};

export default Connected;
