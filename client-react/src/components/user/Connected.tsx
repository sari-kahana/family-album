// // import Avatar from '@mui/material/Avatar';
// // import { emptyUser, UserContext } from './UserContext';
// // import { Button, Stack, Typography } from '@mui/material';
// // import React, { useContext } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';


// // const Connected = () => {

// //     const navigate = useNavigate();

// //     function stringAvatar(name: string) {
// //         return {
// //             sx: {
// //                 bgcolor: 'primary.dark',
// //             },
// //             children: `${name.split(' ')[0][0]}`
// //         };
// //     }

// //     const { user, dispatch } = useContext(UserContext)
// //     console.log(user);

// //     const handleLogout = () => {
// //         localStorage.removeItem('token');
// //         localStorage.removeItem('userId');
// //         localStorage.removeItem('formData');
// //         dispatch({ type: 'LOGOUT', data: user }); // אם יש לך תמיכה ב-logout בקונטקסט
// //         navigate('/'); // או כל עמוד שתרצי להפנות אליו אחרי היציאה
// //       };

// //     return (<>
// //         <Button component={Link} to="albums">My Gallery</Button> 

// //         <Stack direction="column" spacing={2} sx={{ position: "fixed", top: 10, left:10}}>
// //             <Avatar {...stringAvatar(user.name)} />
// //             <Typography
// //           sx={{
// //             color: 'primary.light',
// //           }}
// //         >
// //           {user.name}
// //         </Typography>
// //             <Button variant="outlined" color="error" onClick={handleLogout}>
// //         התנתק
// //       </Button>
// //         </Stack>
// //     </>)

// // }
// // export default Connected;


// import Avatar from '@mui/material/Avatar';
// import { UserContext } from './UserContext';
// import { Button, Menu, MenuItem, Typography, IconButton, Tooltip, Stack, ListItemIcon, Divider } from '@mui/material';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Connected = () => {
//   const navigate = useNavigate();
//   const { user, dispatch } = useContext(UserContext);

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('formData');
//     dispatch({ type: 'LOGOUT', data: user });
//     navigate('/');
//   };

//   function stringAvatar(name: string) {
//     return {
//       sx: {
//         bgcolor: 'primary.dark',
//       },
//       children: `${name.split(' ')[0][0]}`,
//     };
//   }

//   return (
//     <>
//       <Button component={Link} to="/collages">עיצוב קולאז</Button>
//       <Button component={Link} to="/albums">My Gallery</Button>
//       <Stack direction="column" spacing={2} sx={{ position: "fixed", top: 10, left: 10 }}>
//         <Tooltip title="פרטי משתמש">
//           <IconButton onClick={handleClick} size="small" sx={{ p: 0 }}>
//             <Avatar {...stringAvatar(user.name)} />
//           </IconButton>
//         </Tooltip>
//                  <Menu
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//           onClick={handleClose}
//           PaperProps={{
//             elevation: 3,
//             sx: {
//               mt: 1.5,
//               minWidth: 180,
//               borderRadius: 2,
//             },
//           }}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'left',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'left',
//           }}
//         >
//           <MenuItem disabled>
//             <ListItemIcon>
//               <AccountCircleIcon fontSize="small" />
//             </ListItemIcon>
//             <Typography variant="body2">{user.name}</Typography>
//           </MenuItem>

//           <Divider />

//           <MenuItem onClick={handleLogout}>
//             <ListItemIcon>
//               <LogoutIcon fontSize="small" />
//             </ListItemIcon>
//             התנתק
//           </MenuItem>
//         </Menu>
//       </Stack>
//     </>
//   );
// };

// export default Connected;

// "use client"

// import Avatar from "@mui/material/Avatar"
// import { UserContext } from "./UserContext"
// import {
//   Button,
//   Menu,
//   MenuItem,
//   Typography,
//   IconButton,
//   Tooltip,
//   ListItemIcon,
//   Divider,
//   alpha,
//   useTheme,
//   Box,
// } from "@mui/material"
// import {
//   Logout as LogoutIcon,
//   AccountCircle as AccountCircleIcon,
//   PhotoLibrary,
//   Palette,
//   Home,
// } from "@mui/icons-material"
// import type React from "react"
// import { useContext, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import SearchImages from "../files/SearchImages"

// const Connected = () => {
//   const navigate = useNavigate()
//   const theme = useTheme()
//   const { user, dispatch } = useContext(UserContext)

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const open = Boolean(anchorEl)

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("userId")
//     localStorage.removeItem("formData")
//     dispatch({ type: "LOGOUT", data: user })
//     navigate("/")
//     handleClose()
//   }

//   function stringAvatar(name: string) {
//     return {
//       sx: {
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         color: "white",
//         fontWeight: 700,
//         fontSize: "1.2rem",
//         width: 45,
//         height: 45,
//         border: `3px solid ${alpha("#ffffff", 0.3)}`,
//         boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
//         transition: "all 0.3s ease",
//         "&:hover": {
//           transform: "scale(1.1)",
//           boxShadow: "0 8px 25px rgba(102, 126, 234, 0.5)",
//         },
//       },
//       children: `${name.split(" ")[0][0]}`,
//     }
//   }

//   return (
//     <>
//       {/* Navigation Buttons */}
//       <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 2 }}>
//         <Button
//           component={Link}
//           to="/collages"
//           startIcon={<Palette />}
//           sx={{
//             backgroundColor: alpha("#06b6d4", 0.1),
//             color: "#06b6d4",
//             border: `2px solid ${alpha("#06b6d4", 0.2)}`,
//             borderRadius: "50px",
//             padding: "6px 16px",
//             fontSize: "0.85rem",
//             fontWeight: 600,
//             textTransform: "none",
//             transition: "all 0.3s ease",
//             "&:hover": {
//               backgroundColor: "#06b6d4",
//               color: "white",
//               transform: "translateY(-2px)",
//               boxShadow: "0 8px 25px rgba(6, 182, 212, 0.3)",
//             },
//           }}
//         >
//           עיצוב קולאז
//         </Button>

//         <Button
//           component={Link}
//           to="/albums"
//           startIcon={<PhotoLibrary />}
//           sx={{
//             backgroundColor: alpha("#10b981", 0.1),
//             color: "#10b981",
//             border: `2px solid ${alpha("#10b981", 0.2)}`,
//             borderRadius: "50px",
//             padding: "6px 16px",
//             fontSize: "0.85rem",
//             fontWeight: 600,
//             textTransform: "none",
//             transition: "all 0.3s ease",
//             "&:hover": {
//               backgroundColor: "#10b981",
//               color: "white",
//               transform: "translateY(-2px)",
//               boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
//             },
//           }}
//         >
//           הגלריה שלי
//         </Button>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           {/* Search Component */}
//           <Box
//             sx={{
//               backgroundColor: alpha("#f8fafc", 0.8),
//               borderRadius: "50px",
//               padding: "4px 8px",
//               border: `1px solid ${alpha("#e2e8f0", 0.8)}`,
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 backgroundColor: alpha("#f1f5f9", 0.9),
//                 transform: "translateY(-1px)",
//                 boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//               },
//             }}
//           >
//             <SearchImages />
//           </Box>

//         </Box>

//       </Box>

//       {/* User Avatar */}
//       <Tooltip title="פרטי משתמש" arrow>
//         <IconButton onClick={handleClick} sx={{ p: 0 }}>
//           <Avatar {...stringAvatar(user.name)} />
//         </IconButton>
//       </Tooltip>

//       {/* User Menu */}
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             mt: 1.5,
//             minWidth: 220,
//             borderRadius: 3,
//             background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
//             backdropFilter: "blur(20px)",
//             border: `1px solid ${alpha("#e2e8f0", 0.8)}`,
//             boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
//             "& .MuiMenuItem-root": {
//               borderRadius: 2,
//               mx: 1,
//               my: 0.5,
//               transition: "all 0.2s ease",
//               "&:hover": {
//                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                 transform: "translateX(4px)",
//               },
//             },
//           },
//         }}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//       >
//         {/* User Info */}
//         <MenuItem disabled sx={{ opacity: "1 !important" }}>
//           <ListItemIcon>
//             <AccountCircleIcon sx={{ color: theme.palette.primary.main }} />
//           </ListItemIcon>
//           <Box>
//             <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
//               {user.name}
//             </Typography>
//             <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
//               {user.email}
//             </Typography>
//           </Box>
//         </MenuItem>

//         <Divider sx={{ my: 1, mx: 2 }} />

//         {/* Home Link */}
//         <MenuItem component={Link} to="/">
//           <ListItemIcon>
//             <Home sx={{ color: theme.palette.info.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">עמוד הבית</Typography>
//         </MenuItem>

//         {/* Gallery Link */}
//         <MenuItem component={Link} to="/albums">
//           <ListItemIcon>
//             <PhotoLibrary sx={{ color: theme.palette.success.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">הגלריה שלי</Typography>
//         </MenuItem>

//         {/* Collages Link */}
//         <MenuItem component={Link} to="/collages">
//           <ListItemIcon>
//             <Palette sx={{ color: theme.palette.info.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">עיצוב קולאז</Typography>
//         </MenuItem>

//         <Divider sx={{ my: 1, mx: 2 }} />

//         {/* Logout */}
//         <MenuItem
//           onClick={handleLogout}
//           sx={{
//             color: theme.palette.error.main,
//             "&:hover": {
//               backgroundColor: alpha(theme.palette.error.main, 0.1),
//             },
//           }}
//         >
//           <ListItemIcon>
//             <LogoutIcon sx={{ color: theme.palette.error.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">התנתק</Typography>
//         </MenuItem>
//       </Menu>
//     </>
//   )
// }

// export default Connected

// "use client"

// import Avatar from "@mui/material/Avatar"
// import { UserContext } from "./UserContext"
// import {
//   Button,
//   Menu,
//   MenuItem,
//   Typography,
//   IconButton,
//   Tooltip,
//   ListItemIcon,
//   Divider,
//   alpha,
//   useTheme,
//   Box,
// } from "@mui/material"
// import {
//   Logout as LogoutIcon,
//   AccountCircle as AccountCircleIcon,
//   PhotoLibrary,
//   Palette,
//   Home,
// } from "@mui/icons-material"
// import type React from "react"
// import { useContext, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import SearchImages from "../files/SearchImages"

// const Connected = () => {
//   const navigate = useNavigate()
//   const theme = useTheme()
//   const { user, dispatch } = useContext(UserContext)

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const open = Boolean(anchorEl)

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("userId")
//     localStorage.removeItem("formData")
//     dispatch({ type: "LOGOUT", data: user })
//     navigate("/")
//     handleClose()
//   }

//   function stringAvatar(name: string) {
//     return {
//       sx: {
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         color: "white",
//         fontWeight: 700,
//         fontSize: "1.1rem",
//         width: 42,
//         height: 42,
//         border: `2px solid ${alpha("#ffffff", 0.3)}`,
//         boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
//         transition: "all 0.3s ease",
//         "&:hover": {
//           transform: "scale(1.1)",
//           boxShadow: "0 8px 25px rgba(102, 126, 234, 0.5)",
//         },
//       },
//       children: `${name.split(" ")[0][0]}`,
//     }
//   }

//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//       {/* Search Component */}
//       <Box
//         sx={{
//           backgroundColor: alpha("#f8fafc", 0.8),
//           borderRadius: "50px",
//           padding: "4px 8px",
//           border: `1px solid ${alpha("#e2e8f0", 0.8)}`,
//           transition: "all 0.3s ease",
//           "&:hover": {
//             backgroundColor: alpha("#f1f5f9", 0.9),
//             transform: "translateY(-1px)",
//             boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//           },
//         }}
//       >
//         <SearchImages />
//       </Box>

//       {/* Navigation Buttons */}
//       <Button
//         component={Link}
//         to="/collages"
//         startIcon={<Palette />}
//         sx={{
//           backgroundColor: alpha("#06b6d4", 0.1),
//           color: "#06b6d4",
//           border: `2px solid ${alpha("#06b6d4", 0.2)}`,
//           borderRadius: "50px",
//           padding: "6px 16px",
//           fontSize: "0.85rem",
//           fontWeight: 600,
//           textTransform: "none",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             backgroundColor: "#06b6d4",
//             color: "white",
//             transform: "translateY(-2px)",
//             boxShadow: "0 8px 25px rgba(6, 182, 212, 0.3)",
//           },
//         }}
//       >
//         עיצוב קולאז
//       </Button>

//       <Button
//         component={Link}
//         to="/albums"
//         startIcon={<PhotoLibrary />}
//         sx={{
//           backgroundColor: alpha("#10b981", 0.1),
//           color: "#10b981",
//           border: `2px solid ${alpha("#10b981", 0.2)}`,
//           borderRadius: "50px",
//           padding: "6px 16px",
//           fontSize: "0.85rem",
//           fontWeight: 600,
//           textTransform: "none",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             backgroundColor: "#10b981",
//             color: "white",
//             transform: "translateY(-2px)",
//             boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
//           },
//         }}
//       >
//         הגלריה שלי
//       </Button>

//       {/* User Avatar */}
//       <Tooltip title="פרטי משתמש" arrow>
//         <IconButton onClick={handleClick} sx={{ p: 0 }}>
//           <Avatar {...stringAvatar(user.name)} />
//         </IconButton>
//       </Tooltip>

//       {/* User Menu */}
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             mt: 1.5,
//             minWidth: 220,
//             borderRadius: 3,
//             background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
//             backdropFilter: "blur(20px)",
//             border: `1px solid ${alpha("#e2e8f0", 0.8)}`,
//             boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
//             "& .MuiMenuItem-root": {
//               borderRadius: 2,
//               mx: 1,
//               my: 0.5,
//               transition: "all 0.2s ease",
//               "&:hover": {
//                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                 transform: "translateX(4px)",
//               },
//             },
//           },
//         }}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         {/* User Info */}
//         <MenuItem disabled sx={{ opacity: "1 !important" }}>
//           <ListItemIcon>
//             <AccountCircleIcon sx={{ color: theme.palette.primary.main }} />
//           </ListItemIcon>
//           <Box>
//             <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
//               {user.name}
//             </Typography>
//             <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
//               {user.email}
//             </Typography>
//           </Box>
//         </MenuItem>

//         <Divider sx={{ my: 1, mx: 2 }} />

//         {/* Home Link */}
//         <MenuItem component={Link} to="/">
//           <ListItemIcon>
//             <Home sx={{ color: theme.palette.info.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">עמוד הבית</Typography>
//         </MenuItem>

//         {/* Gallery Link */}
//         <MenuItem component={Link} to="/albums">
//           <ListItemIcon>
//             <PhotoLibrary sx={{ color: theme.palette.success.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">הגלריה שלי</Typography>
//         </MenuItem>

//         {/* Collages Link */}
//         <MenuItem component={Link} to="/collages">
//           <ListItemIcon>
//             <Palette sx={{ color: theme.palette.info.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">עיצוב קולאז</Typography>
//         </MenuItem>

//         <Divider sx={{ my: 1, mx: 2 }} />

//         {/* Logout */}
//         <MenuItem
//           onClick={handleLogout}
//           sx={{
//             color: theme.palette.error.main,
//             "&:hover": {
//               backgroundColor: alpha(theme.palette.error.main, 0.1),
//             },
//           }}
//         >
//           <ListItemIcon>
//             <LogoutIcon sx={{ color: theme.palette.error.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">התנתק</Typography>
//         </MenuItem>
//       </Menu>
//     </Box>
//   )
// }

// export default Connected


// "use client"

// import Avatar from "@mui/material/Avatar"
// import { UserContext } from "./UserContext"
// import {
//   Button,
//   Menu,
//   MenuItem,
//   Typography,
//   IconButton,
//   Tooltip,
//   ListItemIcon,
//   Divider,
//   alpha,
//   useTheme,
//   Box,
// } from "@mui/material"
// import {
//   Logout as LogoutIcon,
//   AccountCircle as AccountCircleIcon,
//   PhotoLibrary,
//   Palette,
//   Home,
// } from "@mui/icons-material"
// import type React from "react"
// import { useContext, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import SearchImages from "../files/SearchImages"

// const Connected = () => {
//   const navigate = useNavigate()
//   const theme = useTheme()
//   const { user, dispatch } = useContext(UserContext)

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const open = Boolean(anchorEl)

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("userId")
//     localStorage.removeItem("formData")
//     dispatch({ type: "LOGOUT", data: user })
//     navigate("/")
//     handleClose()
//   }

//   function stringAvatar(name: string) {
//     return {
//       sx: {
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         color: "white",
//         fontWeight: 700,
//         fontSize: "1.1rem",
//         width: 42,
//         height: 42,
//         border: `2px solid ${alpha("#ffffff", 0.3)}`,
//         boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
//         transition: "all 0.3s ease",
//         "&:hover": {
//           transform: "scale(1.1)",
//           boxShadow: "0 8px 25px rgba(102, 126, 234, 0.5)",
//         },
//       },
//       children: `${name.split(" ")[0][0]}`,
//     }
//   }

//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//       {/* Search Component */}
//       <Box
//         sx={{
//           backgroundColor: alpha("#f8fafc", 0.8),
//           borderRadius: "50px",
//           padding: "4px 8px",
//           border: `1px solid ${alpha("#e2e8f0", 0.8)}`,
//           transition: "all 0.3s ease",
//           "&:hover": {
//             backgroundColor: alpha("#f1f5f9", 0.9),
//             transform: "translateY(-1px)",
//             boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
//           },
//         }}
//       >
//         <SearchImages />
//       </Box>

//       {/* Navigation Buttons */}
//       <Button
//         component={Link}
//         to="/collages"
//         startIcon={<Palette />}
//         sx={{
//           backgroundColor: alpha("#06b6d4", 0.1),
//           color: "#06b6d4",
//           border: `2px solid ${alpha("#06b6d4", 0.2)}`,
//           borderRadius: "50px",
//           padding: "6px 16px",
//           fontSize: "0.85rem",
//           fontWeight: 600,
//           textTransform: "none",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             backgroundColor: "#06b6d4",
//             color: "white",
//             transform: "translateY(-2px)",
//             boxShadow: "0 8px 25px rgba(6, 182, 212, 0.3)",
//           },
//         }}
//       >
//         Collage Design
//       </Button>

//       <Button
//         component={Link}
//         to="/albums"
//         startIcon={<PhotoLibrary />}
//         sx={{
//           backgroundColor: alpha("#10b981", 0.1),
//           color: "#10b981",
//           border: `2px solid ${alpha("#10b981", 0.2)}`,
//           borderRadius: "50px",
//           padding: "6px 16px",
//           fontSize: "0.85rem",
//           fontWeight: 600,
//           textTransform: "none",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             backgroundColor: "#10b981",
//             color: "white",
//             transform: "translateY(-2px)",
//             boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
//           },
//         }}
//       >
//         My Gallery
//       </Button>

//       {/* User Avatar */}
//       <Tooltip title="User Profile" arrow>
//         <IconButton onClick={handleClick} sx={{ p: 0 }}>
//           <Avatar {...stringAvatar(user.name)} />
//         </IconButton>
//       </Tooltip>

//       {/* User Menu */}
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             mt: 1.5,
//             minWidth: 220,
//             borderRadius: 3,
//             background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
//             backdropFilter: "blur(20px)",
//             border: `1px solid ${alpha("#e2e8f0", 0.8)}`,
//             boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
//             "& .MuiMenuItem-root": {
//               borderRadius: 2,
//               mx: 1,
//               my: 0.5,
//               transition: "all 0.2s ease",
//               "&:hover": {
//                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                 transform: "translateX(4px)",
//               },
//             },
//           },
//         }}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         {/* User Info */}
//         <MenuItem disabled sx={{ opacity: "1 !important" }}>
//           <ListItemIcon>
//             <AccountCircleIcon sx={{ color: theme.palette.primary.main }} />
//           </ListItemIcon>
//           <Box>
//             <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
//               {user.name}
//             </Typography>
//             <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
//               {user.email}
//             </Typography>
//           </Box>
//         </MenuItem>

//         <Divider sx={{ my: 1, mx: 2 }} />

//         {/* Home Link */}
//         <MenuItem component={Link} to="/">
//           <ListItemIcon>
//             <Home sx={{ color: theme.palette.info.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">Home</Typography>
//         </MenuItem>

//         {/* Gallery Link */}
//         <MenuItem component={Link} to="/albums">
//           <ListItemIcon>
//             <PhotoLibrary sx={{ color: theme.palette.success.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">My Gallery</Typography>
//         </MenuItem>

//         {/* Collages Link */}
//         <MenuItem component={Link} to="/collages">
//           <ListItemIcon>
//             <Palette sx={{ color: theme.palette.info.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">Collage Design</Typography>
//         </MenuItem>

//         <Divider sx={{ my: 1, mx: 2 }} />

//         {/* Logout */}
//         <MenuItem
//           onClick={handleLogout}
//           sx={{
//             color: theme.palette.error.main,
//             "&:hover": {
//               backgroundColor: alpha(theme.palette.error.main, 0.1),
//             },
//           }}
//         >
//           <ListItemIcon>
//             <LogoutIcon sx={{ color: theme.palette.error.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">Sign Out</Typography>
//         </MenuItem>
//       </Menu>
//     </Box>
//   )
// }

// export default Connected


// "use client"

// import Avatar from "@mui/material/Avatar"
// import { UserContext } from "./UserContext"
// import {
//   Button,
//   Menu,
//   MenuItem,
//   Typography,
//   IconButton,
//   Tooltip,
//   ListItemIcon,
//   Divider,
//   alpha,
//   useTheme,
//   Box,
// } from "@mui/material"
// import {
//   Logout as LogoutIcon,
//   AccountCircle as AccountCircleIcon,
//   PhotoLibrary,
//   Palette,
//   Home,
// } from "@mui/icons-material"
// import type React from "react"
// import { useContext, useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import SearchImages from "../files/SearchImages"

// const Connected = () => {
//   const navigate = useNavigate()
//   const theme = useTheme()
//   const { user, dispatch } = useContext(UserContext)

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const open = Boolean(anchorEl)

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("userId")
//     localStorage.removeItem("formData")
//     dispatch({ type: "LOGOUT", data: user })
//     navigate("/")
//     handleClose()
//   }

//   function stringAvatar(name: string) {
//     return {
//       sx: {
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         color: "white",
//         fontWeight: 700,
//         fontSize: "1.1rem",
//         width: 42,
//         height: 42,
//         border: `2px solid ${alpha("#ffffff", 0.3)}`,
//         boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
//         transition: "all 0.3s ease",
//         "&:hover": {
//           transform: "scale(1.1)",
//           boxShadow: "0 8px 25px rgba(102, 126, 234, 0.5)",
//         },
//       },
//       children: `${name.split(" ")[0][0]}`,
//     }
//   }

//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//       {/* Search Component */}
//       <Box
//         sx={{
//           backgroundColor: "rgba(26, 32, 44, 0.8)",
//           borderRadius: "50px",
//           padding: "4px 8px",
//           border: `1px solid rgba(255,255,255,0.3)`,
//           transition: "all 0.3s ease",
//           "&:hover": {
//             backgroundColor: "rgba(26, 32, 44, 0.9)",
//             transform: "translateY(-1px)",
//             boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
//           },
//         }}
//       >
//         <SearchImages />
//       </Box>

//       {/* Navigation Buttons */}
//       <Button
//         component={Link}
//         to="/collages"
//         startIcon={<Palette />}
//         sx={{
//           backgroundColor: "rgba(26, 32, 44, 0.8)",
//           color: "white",
//           border: `2px solid rgba(6, 182, 212, 0.5)`,
//           borderRadius: "50px",
//           padding: "6px 16px",
//           fontSize: "0.85rem",
//           fontWeight: 600,
//           textTransform: "none",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             backgroundColor: "#06b6d4",
//             color: "white",
//             transform: "translateY(-2px)",
//             boxShadow: "0 8px 25px rgba(6, 182, 212, 0.4)",
//           },
//         }}
//       >
//         Collage Design
//       </Button>

//       <Button
//         component={Link}
//         to="/albums"
//         startIcon={<PhotoLibrary />}
//         sx={{
//           backgroundColor: "rgba(26, 32, 44, 0.8)",
//           color: "white",
//           border: `2px solid rgba(16, 185, 129, 0.5)`,
//           borderRadius: "50px",
//           padding: "6px 16px",
//           fontSize: "0.85rem",
//           fontWeight: 600,
//           textTransform: "none",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             backgroundColor: "#10b981",
//             color: "white",
//             transform: "translateY(-2px)",
//             boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
//           },
//         }}
//       >
//         My Gallery
//       </Button>

//       {/* User Avatar */}
//       <Tooltip title="User Profile" arrow>
//         <IconButton onClick={handleClick} sx={{ p: 0 }}>
//           <Avatar {...stringAvatar(user.name)} />
//         </IconButton>
//       </Tooltip>

//       {/* User Menu */}
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             mt: 1.5,
//             minWidth: 220,
//             borderRadius: 3,
//             background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
//             backdropFilter: "blur(20px)",
//             border: `1px solid ${alpha("#e2e8f0", 0.8)}`,
//             boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
//             "& .MuiMenuItem-root": {
//               borderRadius: 2,
//               mx: 1,
//               my: 0.5,
//               transition: "all 0.2s ease",
//               "&:hover": {
//                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                 transform: "translateX(4px)",
//               },
//             },
//           },
//         }}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         {/* User Info */}
//         <MenuItem disabled sx={{ opacity: "1 !important" }}>
//           <ListItemIcon>
//             <AccountCircleIcon sx={{ color: theme.palette.primary.main }} />
//           </ListItemIcon>
//           <Box>
//             <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
//               {user.name}
//             </Typography>
//             <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
//               {user.email}
//             </Typography>
//           </Box>
//         </MenuItem>

//         <Divider sx={{ my: 1, mx: 2 }} />

//         {/* Home Link */}
//         <MenuItem component={Link} to="/">
//           <ListItemIcon>
//             <Home sx={{ color: theme.palette.info.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">Home</Typography>
//         </MenuItem>

//         {/* Gallery Link */}
//         <MenuItem component={Link} to="/albums">
//           <ListItemIcon>
//             <PhotoLibrary sx={{ color: theme.palette.success.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">My Gallery</Typography>
//         </MenuItem>

//         {/* Collages Link */}
//         <MenuItem component={Link} to="/collages">
//           <ListItemIcon>
//             <Palette sx={{ color: theme.palette.info.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">Collage Design</Typography>
//         </MenuItem>

//         <Divider sx={{ my: 1, mx: 2 }} />

//         {/* Logout */}
//         <MenuItem
//           onClick={handleLogout}
//           sx={{
//             color: theme.palette.error.main,
//             "&:hover": {
//               backgroundColor: alpha(theme.palette.error.main, 0.1),
//             },
//           }}
//         >
//           <ListItemIcon>
//             <LogoutIcon sx={{ color: theme.palette.error.main }} />
//           </ListItemIcon>
//           <Typography variant="body2">Sign Out</Typography>
//         </MenuItem>
//       </Menu>
//     </Box>
//   )
// }

// export default Connected




"use client"

import AvatarMui from "@mui/material/Avatar" // Renamed to avoid conflict
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Tooltip,
  ListItemIcon,
  Divider,
  alpha,
  useTheme,
  Box,
  InputBase, // Added InputBase
  Stack, // Added Stack
} from "@mui/material"
import {
  Logout as LogoutIcon,
  PhotoLibrary,
  Palette,
  Home as HomeIcon, // Renamed to avoid conflict
  Search as SearchIcon, // Added SearchIcon
} from "@mui/icons-material"
import type React from "react"
import { useContext, useState } from "react"
import { UserContext } from "./UserContext"
import { Link, useNavigate } from "react-router-dom"
import theme from "../Theme"


const Connected = () => {
  // const navigate = useNavigate(); // Not needed for Next.js Link
  const { user, dispatch } = useContext(UserContext)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const navItemColor = theme.palette.grey[700] // Using theme color for consistency

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("formData")
    dispatch({ type: "LOGOUT", data: user })
    navigate("/")
    handleClose()
  }

  function stringAvatar(name = "User") {
    // Added default name
    const initial = name ? name.split(" ")[0][0].toUpperCase() : "U"
    return {
      sx: {
        backgroundColor: theme.palette.primary.dark, // Using secondary color from theme for avatar
        color: theme.palette.secondary.contrastText,
        fontWeight: 600,
        fontSize: "1.1rem",
        width: 40, // Consistent size
        height: 40,
        border: `2px solid ${alpha(theme.palette.secondary.dark, 0.3)}`,
        boxShadow: theme.shadows[1],
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: theme.shadows[3],
        },
      },
      children: initial,
    }
  }

  const buttonSx = {
    color: navItemColor,
    textTransform: "none",
    fontWeight: 500,
    fontSize: { xs: "0.8rem", sm: "0.875rem" },
    padding: { xs: "6px 8px", sm: "6px 12px" },
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: alpha(navItemColor, 0.08),
      color: theme.palette.primary.dark,
      boxShadow: theme.shadows[1],
    },
  }

  return (
    <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1, md: 1.5 }}>

      {/* Navigation Buttons */}
      <Button
        component={Link}
        to="/collages"
        startIcon={<Palette sx={{ color: theme.palette.primary.dark, fontSize: { xs: 18, sm: 20 } }} />}
        sx={buttonSx}
      >
        Collage Design
      </Button>

      <Button
        component={Link}
        to="/albums"
        startIcon={<PhotoLibrary sx={{ color: theme.palette.primary.dark, fontSize: { xs: 18, sm: 20 } }} />}
        sx={buttonSx}
      >
        My Gallery
      </Button>

      {/* User Avatar */}
      <Tooltip title="User Profile" arrow>
        <IconButton onClick={handleClick} sx={{ p: 0 }}>
          <AvatarMui {...stringAvatar(user.name)} />
        </IconButton>
      </Tooltip>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose} // Close menu on item click
        PaperProps={{
          elevation: 3, // Standard elevation
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2, // theme.shape.borderRadius
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              // Arrow
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disabled sx={{ opacity: "1 !important", "&.Mui-disabled": { opacity: "1 !important" } }}>
          <Stack>
            <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {user.name || "User"}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {user.email || "user@example.com"}
            </Typography>
          </Stack>
        </MenuItem>
        <Divider sx={{ my: 1, mx: 2 }} />
        <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </Stack>
  )
}

export default Connected
