// import { Box, IconButton } from "@mui/material";
// import Login from "./user/Login";
// import Register from "./user/Register";
// import { Link } from "react-router-dom";
// import { navStyle } from "./Style";
// import { Home } from "@mui/icons-material";
// import SearchImages from "./files/SearchImages";

// const AppLayout = () => {

//   return (
//     <>
//       <Box style={navStyle} sx={{ display: "flex", gap: 3 }}>
//         <Login /> 
//         <Register /> 
//         <Link to="/">
//         <IconButton color="primary"><Home/></IconButton>
//         </Link>
//         <SearchImages />
//       </Box>
//     </>
//   );
// };
// export default AppLayout;

// import { IconButton, AppBar, Toolbar } from "@mui/material"
// import Login from "./user/Login"
// import Register from "./user/Register"
// import { Link } from "react-router-dom"
// import { Home } from "@mui/icons-material"
// import SearchImages from "./files/SearchImages"

// const AppLayout = () => {
//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         backgroundColor: "rgba(255, 255, 255, 0.1)",
//         backdropFilter: "blur(10px)",
//         boxShadow: "none",
//         zIndex: 1100,
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "flex-end", gap: 2 }}>
//         <Login />
//         <Register />
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <IconButton
//             sx={{
//               color: "white",
//               "&:hover": {
//                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//               },
//             }}
//           >
//             <Home />
//           </IconButton>
//         </Link>
//         <SearchImages />
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default AppLayout


// "use client"

// import { IconButton, AppBar, Toolbar, alpha, useTheme } from "@mui/material"
// import Login from "./user/Login"
// import Register from "./user/Register"
// import { Link } from "react-router-dom"
// import { Home, CameraAlt } from "@mui/icons-material"
// import SearchImages from "./files/SearchImages"

// const AppLayout = () => {
//   const theme = useTheme()

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         background:
//           "linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 50%, rgba(240, 147, 251, 0.9) 100%)",
//         backdropFilter: "blur(20px)",
//         borderBottom: `1px solid ${alpha("#ffffff", 0.2)}`,
//         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//         zIndex: 1100,
//         transition: "all 0.3s ease",
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
//         {/* Logo Section */}
//         <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
//           <IconButton
//             sx={{
//               color: "white",
//               mr: 1,
//               "&:hover": {
//                 backgroundColor: alpha("#ffffff", 0.1),
//                 transform: "scale(1.1)",
//               },
//               transition: "all 0.3s ease",
//             }}
//           >
//             <CameraAlt sx={{ fontSize: 28 }} />
//           </IconButton>
//           <span
//             style={{
//               color: "white",
//               fontSize: "1.5rem",
//               fontWeight: 800,
//               textShadow: "0 2px 10px rgba(0,0,0,0.3)",
//               fontFamily: '"Heebo", "Rubik", "Montserrat", sans-serif',
//             }}
//           >
//             PeekPic
//           </span>
//         </Link>

//         {/* Navigation Items */}
//         <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//           <SearchImages />

//           <Link to="/" style={{ textDecoration: "none" }}>
//             <IconButton
//               sx={{
//                 color: "white",
//                 backgroundColor: alpha("#ffffff", 0.1),
//                 border: `1px solid ${alpha("#ffffff", 0.2)}`,
//                 "&:hover": {
//                   backgroundColor: alpha("#ffffff", 0.2),
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 4px 15px rgba(255, 255, 255, 0.3)",
//                 },
//                 transition: "all 0.3s ease",
//               }}
//             >
//               <Home />
//             </IconButton>
//           </Link>

//           <Login />
//           <Register />
//         </div>
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default AppLayout


// "use client"

// import { IconButton, AppBar, Toolbar, alpha, useTheme, Box } from "@mui/material"
// import Login from "./user/Login"
// import Register from "./user/Register"
// import { Link } from "react-router-dom"
// import { Home, CameraAlt } from "@mui/icons-material"
// import SearchImages from "./files/SearchImages"

// const AppLayout = () => {
//   const theme = useTheme()

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         background: "rgba(255, 255, 255, 0.95)",
//         backdropFilter: "blur(20px)",
//         borderBottom: `1px solid ${alpha("#000000", 0.1)}`,
//         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//         zIndex: 1100,
//         transition: "all 0.3s ease",
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
//         {/* Logo Section */}
//         <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               padding: "8px 16px",
//               borderRadius: "50px",
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//               },
//             }}
//           >
//             <CameraAlt sx={{ fontSize: 24, color: "white" }} />
//             <span
//               style={{
//                 color: "white",
//                 fontSize: "1.4rem",
//                 fontWeight: 800,
//                 fontFamily: '"Heebo", "Rubik", "Montserrat", sans-serif',
//               }}
//             >
//               PeekPic
//             </span>
//           </Box>
//         </Link>

//         {/* Navigation Items */}

//           {/* Home Button */}
//           <Link to="/" style={{ textDecoration: "none" }}>
//             <IconButton
//               sx={{
//                 backgroundColor: alpha("#667eea", 0.1),
//                 color: "#667eea",
//                 border: `2px solid ${alpha("#667eea", 0.2)}`,
//                 width: 48,
//                 height: 48,
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#667eea",
//                   color: "white",
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
//                 },
//               }}
//             >
//               <Home sx={{ fontSize: 20 }} />
//             </IconButton>
//           </Link>

//           {/* Login Button */}
//           <Box
//             sx={{
//               "& button": {
//                 backgroundColor: "transparent",
//                 color: "#1a202c",
//                 border: `2px solid ${alpha("#1a202c", 0.2)}`,
//                 borderRadius: "50px",
//                 padding: "8px 20px",
//                 fontSize: "0.9rem",
//                 fontWeight: 600,
//                 textTransform: "none",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#1a202c",
//                   color: "white",
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 8px 25px rgba(26, 32, 44, 0.2)",
//                 },
//               },
//             }}
//           >
//             <Login />
//           </Box>

//           {/* Register Button */}
//           <Box
//             sx={{
//               "& button": {
//                 background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "50px",
//                 padding: "8px 20px",
//                 fontSize: "0.9rem",
//                 fontWeight: 600,
//                 textTransform: "none",
//                 boxShadow: "0 4px 15px rgba(240, 147, 251, 0.4)",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   background: "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)",
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 8px 25px rgba(240, 147, 251, 0.6)",
//                 },
//               },
//             }}
//           >
//             <Register />
//           </Box>
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default AppLayout


// "use client"

// import { IconButton, AppBar, Toolbar, alpha, useTheme, Box } from "@mui/material"
// import Login from "./user/Login"
// import Register from "./user/Register"
// import { Link } from "react-router-dom"
// import { Home, CameraAlt } from "@mui/icons-material"
// import { useContext } from "react"
// import { UserContext } from "./user/UserContext"
// import Connected from "./user/Connected"

// const AppLayout = () => {
//   const theme = useTheme()
//   const { user } = useContext(UserContext)

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         background: "rgba(255, 255, 255, 0.95)",
//         backdropFilter: "blur(20px)",
//         borderBottom: `1px solid ${alpha("#000000", 0.1)}`,
//         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//         zIndex: 1100,
//         transition: "all 0.3s ease",
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
//         {/* Logo Section */}
//         <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               padding: "8px 16px",
//               borderRadius: "50px",
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//               },
//             }}
//           >
//             <CameraAlt sx={{ fontSize: 24, color: "white" }} />
//             <span
//               style={{
//                 color: "white",
//                 fontSize: "1.4rem",
//                 fontWeight: 800,
//                 fontFamily: '"Heebo", "Rubik", "Montserrat", sans-serif',
//               }}
//             >
//               PeekPic
//             </span>
//           </Box>
//         </Link>

//         {/* Navigation Items */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           {/* Home Button */}
//           <Link to="/" style={{ textDecoration: "none" }}>
//             <IconButton
//               sx={{
//                 backgroundColor: alpha("#667eea", 0.1),
//                 color: "#667eea",
//                 border: `2px solid ${alpha("#667eea", 0.2)}`,
//                 width: 48,
//                 height: 48,
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#667eea",
//                   color: "white",
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
//                 },
//               }}
//             >
//               <Home sx={{ fontSize: 20 }} />
//             </IconButton>
//           </Link>

//           {/* User Authentication or Connected User */}
//           {!user.isConnected ? (
//             <>
//               {/* Login Button */}
//               <Login />
//               {/* Register Button */}
//               <Register />
//             </>
//           ) : (
//             /* Connected User Component */
//             <Connected />
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default AppLayout


// "use client"

// import { IconButton, AppBar, Toolbar, useTheme, Box } from "@mui/material"
// import Login from "./user/Login"
// import Register from "./user/Register"
// import { Link } from "react-router-dom"
// import { Home, CameraAlt } from "@mui/icons-material"
// import { useContext } from "react"
// import { UserContext } from "./user/UserContext"
// import Connected from "./user/Connected"

// const AppLayout = () => {
//   const theme = useTheme()
//   const { user } = useContext(UserContext)

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
//         backdropFilter: "blur(20px)",
//         border: "1px solid rgba(255,255,255,0.2)",
//         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//         zIndex: 1100,
//         transition: "all 0.3s ease",
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
//         {/* Logo Section */}
//         <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               padding: "8px 16px",
//               borderRadius: "50px",
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//               },
//             }}
//           >
//             <CameraAlt sx={{ fontSize: 24, color: "white" }} />
//             <span
//               style={{
//                 color: "white",
//                 fontSize: "1.4rem",
//                 fontWeight: 800,
//                 fontFamily: '"Heebo", "Rubik", "Montserrat", sans-serif',
//               }}
//             >
//               PeekPic
//             </span>
//           </Box>
//         </Link>

//         {/* Navigation Items */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           {/* Home Button */}
//           <Link to="/" style={{ textDecoration: "none" }}>
//             <IconButton
//               sx={{
//                 backgroundColor: "rgba(255,255,255,0.1)",
//                 color: "white",
//                 border: `2px solid rgba(255,255,255,0.3)`,
//                 width: 48,
//                 height: 48,
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "rgba(255,255,255,0.2)",
//                   color: "white",
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
//                 },
//               }}
//             >
//               <Home sx={{ fontSize: 20 }} />
//             </IconButton>
//           </Link>

//           {/* User Authentication or Connected User */}
//           {!user.isConnected ? (
//             <>
//               {/* Login Button */}
//               <Login />
//               {/* Register Button */}
//               <Register />
//             </>
//           ) : (
//             /* Connected User Component */
//             <Connected />
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default AppLayout


// "use client"

// import { IconButton, AppBar, Toolbar, useTheme, Box } from "@mui/material"
// import Login from "./user/Login"
// import Register from "./user/Register"
// import { Link } from "react-router-dom"
// import { Home, CameraAlt } from "@mui/icons-material"
// import { useContext } from "react"
// import { UserContext } from "./user/UserContext"
// import Connected from "./user/Connected"

// const AppLayout = () => {
//   const theme = useTheme()
//   const { user } = useContext(UserContext)

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
//         backdropFilter: "blur(20px)",
//         border: "1px solid rgba(255,255,255,0.2)",
//         boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//         zIndex: 1100,
//         transition: "all 0.3s ease",
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
//         {/* Logo Section */}
//         <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               padding: "8px 16px",
//               borderRadius: "50px",
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//               },
//             }}
//           >
//             <CameraAlt sx={{ fontSize: 24, color: "white" }} />
//             <span
//               style={{
//                 color: "white",
//                 fontSize: "1.4rem",
//                 fontWeight: 800,
//                 fontFamily: '"Heebo", "Rubik", "Montserrat", sans-serif',
//               }}
//             >
//               PeekPic
//             </span>
//           </Box>
//         </Link>

//         {/* Navigation Items */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           {/* Home Button */}

//           {/* User Authentication or Connected User */}
//           {!user.isConnected ? (
//             <>
//               {/* Login Button */}
//               <Login />
//               {/* Register Button */}
//               <Register />
//             </>
//           ) : (
//             /* Connected User Component */
//             <Connected />
//           )}
//         </Box>
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <IconButton
//             sx={{
//               background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//               color: "white",
//               border: `2px solid rgba(255,255,255,0.3)`,
//               width: 48,
//               height: 48,
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 background: "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)",
//                 transform: "translateY(-2px)",
//                 boxShadow: "0 8px 25px rgba(240, 147, 251, 0.6)",
//               },
//             }}
//           >
//             <Home sx={{ fontSize: 20 }} />
//           </IconButton>
//         </Link>

//       </Toolbar>
//     </AppBar>
//   )
// }

// export default AppLayout

// "use client"

// import { IconButton, AppBar, Toolbar, useTheme, Box, Stack, Typography } from "@mui/material"
// import { Home, CameraAlt } from "@mui/icons-material"
// import { useContext } from "react"
// import { UserContext } from "./user/UserContext"
// import { Link } from "react-router-dom"
// import Register from "./user/Register"
// import Login from "./user/Login"
// import Connected from "./user/Connected"

// const AppLayout = () => {
//   const theme = useTheme()
//   const { user } = useContext(UserContext)

//   // צבע חדש לפריטי הניווט - אפור כהה יותר אך לא שחור
//   const darkPurple = "#581C87" // דוגמה לסגול כהה
//   const navItemColor = theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.85)" : "#4A5568"
//   const logoColor = theme.palette.mode === "dark" ? "white" : darkPurple // שימוש בסגול הכהה
//   const appBarTextColor = theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.9)" : "#2D3748" // Cool Gray 800 לטקסט כללי אם צריך

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         background:
//           theme.palette.mode === "dark"
//             ? "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,76,162,0.1) 100%)"
//             : "rgba(255, 255, 255, 0.7)", // רקע לבן חצי שקוף למצב בהיר
//         backdropFilter: "blur(20px)",
//         WebkitBackdropFilter: "blur(20px)",
//         borderBottom: `1px solid ${theme.palette.divider}`, // גבול ברור יותר
//         boxShadow: theme.shadows[2], // צל סטנדרטי יותר
//         zIndex: 1100,
//         transition: "background 0.3s ease, backdrop-filter 0.3s ease",
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3, md: 4 } }}>
//         {/* Logo Section - White and prominent */}
//         <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 0.85,
//               padding: "8px 0px",
//               transition: "opacity 0.3s ease",
//               "&:hover": {
//                 opacity: 0.85,
//               },
//             }}
//           >
//             <CameraAlt sx={{ fontSize: 30, color: logoColor }} />
//             <Typography
//               variant="h5" // Slightly larger for more presence
//               component="span"
//               sx={{
//                 color: logoColor,
//                 fontWeight: 700, // Bold but not overly so
//                 fontFamily: '"Heebo", "Rubik", "Montserrat", sans-serif',
//                 letterSpacing: "0.5px",
//               }}
//             >
//               PeekPic
//             </Typography>
//           </Box>
//         </Link>

//         {/* Right Side Items - Grouped Together */}
//         <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }}>
//           {!user.isConnected ? (
//             <>
//               <Login />
//               <Register
//                 // signUpTextColor={theme.palette.primary.contrastText} // או פשוט "white"
//                 // signUpBgColor={darkPurple} // שימוש בסגול הכהה
//               />
//             </>
//           ) : (
//             <Connected  />
//           )}

//           <Link to="/" style={{ textDecoration: "none" }}>
//             <IconButton
//               sx={{
//                 color: navItemColor, // השתמש בצבע החדש
//                 width: 42,
//                 height: 42,
//                 transition: "all 0.2s ease-in-out",
//                 backgroundColor: "transparent",
//                 border: "1px solid transparent",
//                 "&:hover": {
//                   backgroundColor: theme.palette.action.hover, // שימוש בצבע hover מהערכה
//                   transform: "scale(1.1)",
//                   borderColor: theme.palette.divider,
//                 },
//               }}
//             >
//               <Home sx={{ fontSize: 22 }} />
//             </IconButton>
//           </Link>
//         </Stack>
//       </Toolbar>
//     </AppBar>
//   )
// }

// export default AppLayout


"use client"

import { IconButton, AppBar, Toolbar, useTheme, Box, Stack, Typography, alpha } from "@mui/material"
import { Home, CameraAlt } from "@mui/icons-material"
import { useContext } from "react"
import { UserContext } from "./user/UserContext"
import { Link } from "react-router-dom"
import Login from "./user/Login"
import Register from "./user/Register"
import Connected from "./user/Connected"
import theme from "./Theme"

const AppLayout = () => {
  const { user } = useContext(UserContext)

  const darkPurple = "#581C87" // Your desired dark purple
  const navItemColor = theme.palette.grey[700] // Dark grey for nav items from your theme
  const logoColor = theme.palette.mode === "dark" ? "white" : darkPurple

  return (
    <AppBar
      position="fixed"
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,76,162,0.1) 100%)"
            : "rgba(240, 240, 250, 0.85)", // Light lavender, slightly more opaque
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1], // Softer shadow
        zIndex: 1100,
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3, md: 4 } }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.85,
              padding: "8px 0px",
              transition: "opacity 0.3s ease",
              "&:hover": {
                opacity: 0.85,
              },
            }}
          >
            <CameraAlt sx={{ fontSize: 30, color: logoColor }} />
            <Typography
              variant="h5"
              component="span"
              sx={{
                color: logoColor,
                fontWeight: 700,
                fontFamily: '"Heebo", "Rubik", "Montserrat", sans-serif',
                letterSpacing: "0.5px",
              }}
            >
              PeekPic
            </Typography>
          </Box>
        </Link>

        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }}>
          {!user.isConnected ? (
            <>
              <Login />
              <Register />
            </>
          ) : (
            <Connected />
          )}

          <Link to="/" style={{ textDecoration: "none" }}>
            <IconButton
              sx={{
                color: theme.palette.primary.dark,
                width: 42,
                height: 42,
                transition: "all 0.2s ease-in-out",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.light, 0.08),
                  transform: "scale(1.05)",
                },
              }}
            >
              <Home sx={{ fontSize: 22 }} />
            </IconButton>
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default AppLayout

