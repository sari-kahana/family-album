// import { FormEvent, useContext, useRef, useState } from "react";
// import {  UserContext } from "./UserContext";
// import { Box, Button, Modal, TextField } from '@mui/material';
// import Connected from "./Connected";
// import { styleForm } from "../Style";
// import axiosInstance from "../axiosInstance";
// // import Router from "../Router";
// // import { Navigate, useNavigate } from "react-router-dom";

// const Login = () => {
//   const { user, dispatch } = useContext(UserContext)
//   const [open, setOpen] = useState(false);
//   // const [connected, setConnected] = useState(false);
//   const [, setOpenSnackbar] = useState(false);
//   // const navigate = useNavigate();

//   const userPassword = useRef<HTMLInputElement>(null);
//   const userEmail = useRef<HTMLInputElement>(null);
//   const openForm = () => { setOpen(true); }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     let response: any = null
//     try {
//       response = await axiosInstance.post(`User/login`, {
//         Email: userEmail.current?.value,
//         Password: userPassword.current?.value,
//       });
//       console.log('Response from server:', response.data);
//       dispatch({ type: 'UPDATE', data: response.data.user })
//     }
//     catch (error: any) {
//       setOpenSnackbar(true);
//     }

//     if (response.data.token) {
//       localStorage.setItem('token', response.data.token);
//     }
//     if (response.data.user || response.data.user.id) {
//       localStorage.setItem('userId', response.data.user.id); // שמירת ה-userId
//       localStorage.setItem('formData', JSON.stringify({
//         email: userEmail.current?.value || "undefined",
//         password: userPassword.current?.value || "undefined"
//       }));
//       dispatch({ type: 'LOGIN', data: response.data.user })
//       setOpen(false)
//     }
//   }



//   return (
//     <>
//       {!user.isConnected && (<Button onClick={() => openForm()}>login</Button>)}
//       <Modal open={open} onClose={() => { setOpen(false) }}>
//         <Box sx={styleForm}>
//           <form onSubmit={handleSubmit}>
//             <TextField label="Email" type="email" required={true} inputRef={userEmail} />
//             <TextField label="Password" type="password" required={true} inputRef={userPassword} />
//             <Button variant="outlined" color='primary' type="submit">send</Button>
//           </form>
//         </Box>
//       </Modal>
//       {user.isConnected && <Connected />}

//     </>
//   );

// }
// export default Login

// "use client"

// import { type FormEvent, useContext, useRef, useState } from "react"
// import { UserContext } from "./UserContext"
// import {
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Typography,
//   IconButton,
//   alpha,
//   useTheme,
//   InputAdornment,
//   Fade,
//   Backdrop,
// } from "@mui/material"
// import { Login as LoginIcon, Email, Lock, Close, Visibility, VisibilityOff } from "@mui/icons-material"
// import Connected from "./Connected"
// import axiosInstance from "../axiosInstance"

// const Login = () => {
//   const { user, dispatch } = useContext(UserContext)
//   const theme = useTheme()
//   const [open, setOpen] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [, setOpenSnackbar] = useState(false)

//   const userPassword = useRef<HTMLInputElement>(null)
//   const userEmail = useRef<HTMLInputElement>(null)

//   const openForm = () => {
//     setOpen(true)
//   }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     let response: any = null
//     try {
//       response = await axiosInstance.post(`User/login`, {
//         Email: userEmail.current?.value,
//         Password: userPassword.current?.value,
//       })
//       console.log("Response from server:", response.data)
//       dispatch({ type: "UPDATE", data: response.data.user })
//     } catch (error: any) {
//       setOpenSnackbar(true)
//     } finally {
//       setLoading(false)
//     }

//     if (response.data.token) {
//       localStorage.setItem("token", response.data.token)
//     }
//     if (response.data.user || response.data.user.id) {
//       localStorage.setItem("userId", response.data.user.id)
//       localStorage.setItem(
//         "formData",
//         JSON.stringify({
//           email: userEmail.current?.value || "undefined",
//           password: userPassword.current?.value || "undefined",
//         }),
//       )
//       dispatch({ type: "LOGIN", data: response.data.user })
//       setOpen(false)
//     }
//   }

//   return (
//     <>
//       {!user.isConnected && (
//         <Button
//           onClick={openForm}
//           startIcon={<LoginIcon />}
//           sx={{
//             backgroundColor: "transparent",
//             color: "#1a202c",
//             border: `2px solid ${alpha("#1a202c", 0.2)}`,
//             borderRadius: "50px",
//             padding: "8px 20px",
//             fontSize: "0.9rem",
//             fontWeight: 600,
//             textTransform: "none",
//             transition: "all 0.3s ease",
//             "&:hover": {
//               backgroundColor: "#1a202c",
//               color: "white",
//               transform: "translateY(-2px)",
//               boxShadow: "0 8px 25px rgba(26, 32, 44, 0.2)",
//             },
//           }}
//         >
//           כניסה למערכת
//         </Button>
//       )}

//       <Modal
//         open={open}
//         onClose={() => setOpen(false)}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//           sx: {
//             backgroundColor: "rgba(0, 0, 0, 0.7)",
//             backdropFilter: "blur(10px)",
//           },
//         }}
//       >
//         <Fade in={open}>
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: { xs: "90%", sm: 450 },
//               background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
//               backdropFilter: "blur(20px)",
//               borderRadius: 4,
//               boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
//               border: `1px solid ${alpha("#ffffff", 0.3)}`,
//               p: 4,
//               outline: "none",
//             }}
//           >
//             {/* Header */}
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//               <Typography
//                 variant="h4"
//                 sx={{
//                   fontWeight: 800,
//                   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 כניסה למערכת
//               </Typography>
//               <IconButton
//                 onClick={() => setOpen(false)}
//                 sx={{
//                   color: theme.palette.text.secondary,
//                   "&:hover": {
//                     backgroundColor: alpha("#ef4444", 0.1),
//                     color: "#ef4444",
//                   },
//                 }}
//               >
//                 <Close />
//               </IconButton>
//             </Box>

//             {/* Form */}
//             <form onSubmit={handleSubmit}>
//               <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//                 <TextField
//                   label="כתובת אימייל"
//                   type="email"
//                   required
//                   inputRef={userEmail}
//                   fullWidth
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Email sx={{ color: theme.palette.primary.main }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 3,
//                       backgroundColor: alpha("#ffffff", 0.8),
//                       "&:hover fieldset": {
//                         borderColor: theme.palette.primary.main,
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: theme.palette.primary.main,
//                         borderWidth: 2,
//                       },
//                     },
//                   }}
//                 />

//                 <TextField
//                   label="סיסמה"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   inputRef={userPassword}
//                   fullWidth
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Lock sx={{ color: theme.palette.primary.main }} />
//                       </InputAdornment>
//                     ),
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => setShowPassword(!showPassword)}
//                           edge="end"
//                           sx={{ color: theme.palette.text.secondary }}
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 3,
//                       backgroundColor: alpha("#ffffff", 0.8),
//                       "&:hover fieldset": {
//                         borderColor: theme.palette.primary.main,
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: theme.palette.primary.main,
//                         borderWidth: 2,
//                       },
//                     },
//                   }}
//                 />

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   disabled={loading}
//                   sx={{
//                     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     borderRadius: 3,
//                     py: 1.5,
//                     fontSize: "1.1rem",
//                     fontWeight: 700,
//                     textTransform: "none",
//                     boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//                     "&:hover": {
//                       background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
//                       transform: "translateY(-2px)",
//                       boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)",
//                     },
//                     "&:disabled": {
//                       background: alpha("#9ca3af", 0.5),
//                     },
//                   }}
//                 >
//                   {loading ? "מתחבר..." : "התחבר"}
//                 </Button>
//               </Box>
//             </form>
//           </Box>
//         </Fade>
//       </Modal>

//       {user.isConnected && <Connected />}
//     </>
//   )
// }

// export default Login


"use client"

import { type FormEvent, useContext, useRef, useState } from "react"
import { UserContext } from "./UserContext"
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  alpha,
  useTheme,
  InputAdornment,
  Fade,
  Backdrop,
} from "@mui/material"
import { Login as LoginIcon, Email, Lock, Close, Visibility, VisibilityOff } from "@mui/icons-material"
import Connected from "./Connected"
import axiosInstance from "../axiosInstance"

const Login = () => {
  const { user, dispatch } = useContext(UserContext)
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [, setOpenSnackbar] = useState(false)

  const userPassword = useRef<HTMLInputElement>(null)
  const userEmail = useRef<HTMLInputElement>(null)

   const navItemColor = theme.palette.grey[700]

  const openForm = () => {
    setOpen(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    let response: any = null
    try {
      response = await axiosInstance.post(`User/login`, {
        Email: userEmail.current?.value,
        Password: userPassword.current?.value,
      })
      console.log("Response from server:", response.data)
      dispatch({ type: "UPDATE", data: response.data.user })
    } catch (error: any) {
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }

    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }
    if (response.data.user || response.data.user.id) {
      localStorage.setItem("userId", response.data.user.id)
      localStorage.setItem(
        "formData",
        JSON.stringify({
          email: userEmail.current?.value || "undefined",
          password: userPassword.current?.value || "undefined",
        }),
      )
      dispatch({ type: "LOGIN", data: response.data.user })
      setOpen(false)
    }
  }

  return (
    <>
     {!user.isConnected && (
        <Button
          onClick={openForm}
          startIcon={<LoginIcon sx={{ color: navItemColor }} />}
          sx={{
            color: navItemColor,
            borderColor: alpha(navItemColor, 0.5),
            backgroundColor: 'transparent',
            borderRadius: "50px", // As per screenshot
            padding: "6px 16px", // Adjusted padding
            fontSize: "0.9rem",
            fontWeight: 600,
            textTransform: "none",
            borderWidth: 1.5,
            borderStyle: 'solid',
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: alpha(navItemColor, 0.08),
              borderColor: navItemColor,
              transform: "translateY(-1px)",
            },
          }}
        >
          Sign In
        </Button>
     )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 450 },
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
              backdropFilter: "blur(20px)",
              borderRadius: 4,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
              border: `1px solid ${alpha("#ffffff", 0.3)}`,
              p: 4,
              outline: "none",
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Sign In
              </Typography>
              <IconButton
                onClick={() => setOpen(false)}
                sx={{
                 color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: alpha("#ef4444", 0.1),
                    color: "#ef4444",
                  },
                }}
              >
                <Close />
              </IconButton>
            </Box>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  label="Email Address"
                  type="email"
                  required
                  inputRef={userEmail}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{color: theme.palette.secondary.main }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: alpha("#ffffff", 0.8),
                      "&:hover fieldset": {
                        borderColor: theme.palette.secondary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.secondary.main,
                        borderWidth: 2,
                      },
                    },
                  }}
                />

                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  inputRef={userPassword}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: theme.palette.secondary.main }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: alpha("#ffffff", 0.8),
                      "&:hover fieldset": {
                        borderColor: theme.palette.secondary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.secondary.main,
                        borderWidth: 2,
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    borderRadius: 3,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "0 8px 25px rgba(240, 147, 251, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 35px rgba(240, 147, 251, 0.6)",
                    },
                    "&:disabled": {
                      background: alpha("#9ca3af", 0.5),
                    },
                  }}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>

      {user.isConnected && <Connected />}
    </>
  )
}

export default Login




