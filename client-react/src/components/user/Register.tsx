// import { FormEvent, useContext, useRef, useState } from "react";
// import { UserContext } from "./UserContext";
// import { Box, Button, Modal, TextField } from '@mui/material';
// import NameAvatar from "./Connected";
// import { styleForm } from "../Style";
// import axiosInstance from "../axiosInstance";

// const Register = () => {
//   const { dispatch } = useContext(UserContext)
//   const [open, setOpen] = useState(false);
//   const [connected, setConnected] = useState(false);
//   const [, setOpenSnackbar] = useState(false);

//   const userPassword = useRef<HTMLInputElement>(null);
//   const userEmail = useRef<HTMLInputElement>(null);
//   const userName = useRef<HTMLInputElement>(null);

//   const openForm = () => { setOpen(true); setConnected(false);}


//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     let response: any = null
//     try {
//       response = await axiosInstance.post(`/User`, {
//         name: userName.current?.value,
//         email: userEmail.current?.value,
//         password: userPassword.current?.value,
//       });
//       dispatch({
//         type: 'CREATE', data: {
//           id: response.data.userId,
//           email: userEmail.current?.value,
//           password: userPassword.current?.value
//         }
//       })
//       console.log('Response from server:', response.data);
//     }
//     catch (error: any) {
//       setOpenSnackbar(true);
//     }
//     if (response.data.user /*|| response.data.user.id*/) {
//       localStorage.setItem('userId', response.data.user.id); // שמירת ה-userId
//       localStorage.setItem('formData', JSON.stringify({
//         email: userEmail.current?.value || "undefined",
//         password: userPassword.current?.value || "undefined"
//       }));
//       setConnected(true);
//       setOpen(false)
//     }
//     setOpen(false)
//   }
//   return (
//     <>
//       {!connected && <Button onClick={() => openForm()}>register</Button>}
//       <Modal open={open} onClose={() => { setOpen(false) }}>
//         <Box sx={styleForm}>
//           <form onSubmit={handleSubmit}>
//             <TextField label="Email" type="email" required={true} inputRef={userEmail} />
//             <TextField label="Password" type="password" required={true} inputRef={userPassword} />
//             <TextField label="name" type="text" required={true} inputRef={userName} />

//             <Button variant="outlined" color='primary' type="submit">send</Button>
//           </form>
//         </Box>
//       </Modal>
//       {connected && <NameAvatar/>}
//     </>
//   );
// };
// export default Register;

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
// import { PersonAdd, Email, Lock, Person, Close, Visibility, VisibilityOff } from "@mui/icons-material"
// import Connected from "./Connected"
// import axiosInstance from "../axiosInstance"

// const Register = () => {
//   const { dispatch } = useContext(UserContext)
//   const theme = useTheme()
//   const [open, setOpen] = useState(false)
//   const [connected, setConnected] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [, setOpenSnackbar] = useState(false)

//   const userPassword = useRef<HTMLInputElement>(null)
//   const userEmail = useRef<HTMLInputElement>(null)
//   const userName = useRef<HTMLInputElement>(null)

//   const openForm = () => {
//     setOpen(true)
//     setConnected(false)
//   }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     let response: any = null
//     try {
//       response = await axiosInstance.post(`/User`, {
//         name: userName.current?.value,
//         email: userEmail.current?.value,
//         password: userPassword.current?.value,
//       })
//       dispatch({
//         type: "CREATE",
//         data: {
//           id: response.data.userId,
//           email: userEmail.current?.value,
//           password: userPassword.current?.value,
//         },
//       })
//       console.log("Response from server:", response.data)
//     } catch (error: any) {
//       setOpenSnackbar(true)
//     } finally {
//       setLoading(false)
//     }

//     if (response.data.user) {
//       localStorage.setItem("userId", response.data.user.id)
//       localStorage.setItem(
//         "formData",
//         JSON.stringify({
//           email: userEmail.current?.value || "undefined",
//           password: userPassword.current?.value || "undefined",
//         }),
//       )
//       setConnected(true)
//       setOpen(false)
//     }
//     setOpen(false)
//   }

//   return (
//     <>
//       {!connected && (
//         <Button
//           onClick={openForm}
//           startIcon={<PersonAdd />}
//           sx={{
//             background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//             color: "white",
//             border: "none",
//             borderRadius: "50px",
//             padding: "8px 20px",
//             fontSize: "0.9rem",
//             fontWeight: 600,
//             textTransform: "none",
//             boxShadow: "0 4px 15px rgba(240, 147, 251, 0.4)",
//             transition: "all 0.3s ease",
//             "&:hover": {
//               background: "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)",
//               transform: "translateY(-2px)",
//               boxShadow: "0 8px 25px rgba(240, 147, 251, 0.6)",
//             },
//           }}
//         >
//           הרשמה
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
//                   background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 הרשמה למערכת
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
//                   label="שם מלא"
//                   type="text"
//                   required
//                   inputRef={userName}
//                   fullWidth
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Person sx={{ color: theme.palette.secondary.main }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 3,
//                       backgroundColor: alpha("#ffffff", 0.8),
//                       "&:hover fieldset": {
//                         borderColor: theme.palette.secondary.main,
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: theme.palette.secondary.main,
//                         borderWidth: 2,
//                       },
//                     },
//                   }}
//                 />

//                 <TextField
//                   label="כתובת אימייל"
//                   type="email"
//                   required
//                   inputRef={userEmail}
//                   fullWidth
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Email sx={{ color: theme.palette.secondary.main }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 3,
//                       backgroundColor: alpha("#ffffff", 0.8),
//                       "&:hover fieldset": {
//                         borderColor: theme.palette.secondary.main,
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: theme.palette.secondary.main,
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
//                         <Lock sx={{ color: theme.palette.secondary.main }} />
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
//                         borderColor: theme.palette.secondary.main,
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: theme.palette.secondary.main,
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
//                     background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//                     borderRadius: 3,
//                     py: 1.5,
//                     fontSize: "1.1rem",
//                     fontWeight: 700,
//                     textTransform: "none",
//                     boxShadow: "0 8px 25px rgba(240, 147, 251, 0.4)",
//                     "&:hover": {
//                       background: "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)",
//                       transform: "translateY(-2px)",
//                       boxShadow: "0 12px 35px rgba(240, 147, 251, 0.6)",
//                     },
//                     "&:disabled": {
//                       background: alpha("#9ca3af", 0.5),
//                     },
//                   }}
//                 >
//                   {loading ? "נרשם..." : "הירשם"}
//                 </Button>
//               </Box>
//             </form>
//           </Box>
//         </Fade>
//       </Modal>

//       {connected && <Connected />}
//     </>
//   )
// }

// export default Register

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
import { PersonAdd, Email, Lock, Person, Close, Visibility, VisibilityOff } from "@mui/icons-material"
import Connected from "./Connected"
import axiosInstance from "../axiosInstance"

const Register = () => {
  const { dispatch } = useContext(UserContext)
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [connected, setConnected] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [, setOpenSnackbar] = useState(false)

  const userPassword = useRef<HTMLInputElement>(null)
  const userEmail = useRef<HTMLInputElement>(null)
  const userName = useRef<HTMLInputElement>(null)

  const openForm = () => {
    setOpen(true)
    setConnected(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    let response: any = null
    try {
      response = await axiosInstance.post(`/User`, {
        name: userName.current?.value,
        email: userEmail.current?.value,
        password: userPassword.current?.value,
      })
      dispatch({
        type: "CREATE",
        data: {
          id: response.data.userId,
          email: userEmail.current?.value,
          password: userPassword.current?.value,
        },
      })
      console.log("Response from server:", response.data)
    } catch (error: any) {
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }

    if (response.data.user) {
      localStorage.setItem("userId", response.data.user.id)
      localStorage.setItem(
        "formData",
        JSON.stringify({
          email: userEmail.current?.value || "undefined",
          password: userPassword.current?.value || "undefined",
        }),
      )
      setConnected(true)
      setOpen(false)
    }
    setOpen(false)
  }

  return (
    <>
      {!connected && (
        // <Button
        //   onClick={openForm}
        //   startIcon={<PersonAdd />}
        //   sx={{
        //     backgroundColor: "transparent",
        //     color: "#1a202c",
        //     border: `2px solid ${alpha("#1a202c", 0.2)}`,
        //     borderRadius: "50px",
        //     padding: "8px 20px",
        //     fontSize: "0.9rem",
        //     fontWeight: 600,
        //     textTransform: "none",
        //     transition: "all 0.3s ease",
        //     "&:hover": {
        //       backgroundColor: "#1a202c",
        //       color: "white",
        //       transform: "translateY(-2px)",
        //       boxShadow: "0 8px 25px rgba(26, 32, 44, 0.2)",
        //     },
        //   }}
        // >
        //   Sign Up
        // </Button>


        <Button
        onClick={openForm}
        startIcon={<PersonAdd sx={{ color: "white" }} />}
        sx={{
          backgroundColor: "#581C87",
          color: "white",
          borderRadius: "50px", // As per screenshot
          padding: "6px 16px", // Adjusted padding
          fontSize: "0.875rem",
          fontWeight: 600,
          textTransform: "none",
          border: "none",
          boxShadow: `0 4px 12px ${alpha("#581C87", 0.4)}`,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: alpha("#581C87", 0.85),
            transform: "translateY(-1px)",
            boxShadow: `0 6px 16px ${alpha("#581C87", 0.5)}`,
          },
        }}
      >
        Sign Up
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
                Sign Up
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
                  label="Full Name"
                  type="text"
                  required
                  inputRef={userName}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: theme.palette.secondary.main }} />
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
                  label="Email Address"
                  type="email"
                  required
                  inputRef={userEmail}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: theme.palette.secondary.main }} />
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
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>

      {connected && <Connected />}
    </>
  )
}

export default Register

