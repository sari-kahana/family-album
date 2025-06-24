//עובד לפני השינויים יום שלישי
//  import { IconButton, AppBar, Toolbar, Box, Stack, Typography, alpha } from "@mui/material"
// import { Home, CameraAlt } from "@mui/icons-material"
// import { useContext } from "react"
// import { UserContext } from "./user/UserContext"
// import { Link } from "react-router-dom"
// import Login from "./user/Login"
// import Register from "./user/Register"
// import Connected from "./user/Connected"
// import theme from "./Theme"

// const AppLayout = () => {
//   const { user } = useContext(UserContext)
//   const logoColor = theme.palette.mode === "dark" ? "white" : theme.palette.primary.dark

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         background:
//           theme.palette.mode === "dark"
//             ? "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,76,162,0.1) 100%)"
//             : "rgba(240, 240, 250, 0.85)",
//         backdropFilter: "blur(15px)",
//         WebkitBackdropFilter: "blur(15px)",
//         borderBottom: `1px solid ${theme.palette.divider}`,
//         boxShadow: theme.shadows[1],
//         zIndex: 1100,
//         transition: "background 0.3s ease, backdrop-filter 0.3s ease",
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3, md: 4 } }}>
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
//               variant="h5"
//               component="span"
//               sx={{
//                 color: logoColor,
//                 fontWeight: 700,
//                 fontFamily: '"Heebo", "Rubik", "Montserrat", sans-serif',
//                 letterSpacing: "0.5px",
//               }}
//             >
//               PeekPic
//             </Typography>
//           </Box>
//         </Link>

//         <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }}>
//           {!user.isConnected ? (
//             <>
//               <Login />
//               <Register />
//             </>
//           ) : (
//             <Connected />
//           )}

//           <Link to="/" style={{ textDecoration: "none" }}>
//             <IconButton
//               sx={{
//                 color: theme.palette.primary.dark,
//                 width: 42,
//                 height: 42,
//                 transition: "all 0.2s ease-in-out",
//                 backgroundColor: "transparent",
//                 "&:hover": {
//                   backgroundColor: alpha(theme.palette.primary.light, 0.08),
//                   transform: "scale(1.05)",
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

import { IconButton, AppBar, Toolbar, Box, Stack, Typography, alpha } from "@mui/material"
import { Home, CameraAlt, Login as LoginIcon, PersonAdd } from "@mui/icons-material"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "./user/UserContext"
import theme from "./Theme"
import Connected from "./user/Connected"

const AppLayout = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const logoColor = theme.palette.mode === "dark" ? "white" : theme.palette.primary.dark
  const navItemColor = theme.palette.grey[700]

  const handleLoginClick = () => {
    navigate("/login")
  }

  const handleRegisterClick = () => {
    navigate("/register")
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,76,162,0.1) 100%)"
            : "rgba(240, 240, 250, 0.85)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
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
              <IconButton
                onClick={handleLoginClick}
                sx={{
                  color: navItemColor,
                  borderColor: alpha(navItemColor, 0.5),
                  backgroundColor: "transparent",
                  borderRadius: "50px",
                  padding: "6px 16px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderWidth: 1.5,
                  borderStyle: "solid",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: alpha(navItemColor, 0.08),
                    borderColor: navItemColor,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <LoginIcon sx={{ color: navItemColor, mr: 1 }} />
                Sign In
              </IconButton>

              <IconButton
                onClick={handleRegisterClick}
                sx={{
                  backgroundColor: "#581C87",
                  color: "white",
                  borderRadius: "50px",
                  padding: "6px 16px",
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
                <PersonAdd sx={{ color: "white", mr: 1 }} />
                Sign Up
              </IconButton>
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
